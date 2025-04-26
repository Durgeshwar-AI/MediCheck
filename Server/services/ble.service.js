import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

const formatBp = (bp) => {
  if (!bp || bp === "N/A") return "N/A";
  if (typeof bp === "object" && bp.systolic && bp.diastolic) {
    return `${bp.systolic}/${bp.diastolic} mmHg`;
  }
  if (typeof bp === "string" && /^\d+\/\d+$/.test(bp)) {
    return `${bp} mmHg`;
  }
  if (typeof bp === "string") {
    return bp;
  }
  return "Invalid Format";
};

const formatSleep = (sleep) => {
  if (!sleep || sleep === "N/A") return "N/A";
  if (typeof sleep === "object" && sleep.hours !== undefined) {
    let sleepString = `${sleep.hours} hours`;
    if (sleep.quality) {
      sleepString += ` (Quality: ${sleep.quality})`;
    }
    return sleepString;
  }
  if (typeof sleep === "string") {
    return sleep;
  }
  return "Invalid Format";
};

const createHealthReport = async (healthData) => {
  if (!groq) {
    throw new Error("AI service is not configured.");
  }

  const { heartRate, oxygen, bp, steps, sleep, symptoms, additionalData } =
    healthData;

  const formattedBp = formatBp(bp);
  const formattedSleep = formatSleep(sleep);
  const hrValue =
    heartRate !== "N/A" && heartRate != null ? `${heartRate} bpm` : "N/A";
  const spo2Value = oxygen !== "N/A" && oxygen != null ? `${oxygen}%` : "N/A";
  const stepsValue =
    steps !== "N/A" && steps != null ? `${steps} steps` : "N/A";

  const prompt = `
    Analyze the following daily health data and generate a concise health report (strictly under 150 words).

    Input Data:
    - Heart Rate: ${hrValue}
    - Blood Oxygen (SpO2): ${spo2Value}
    - Blood Pressure: ${formattedBp}
    - Steps Taken: ${stepsValue}
    - Sleep Duration: ${formattedSleep}
    - Current Symptoms Experienced: ${symptoms || "None reported"}
    - Additional Information/Context: ${additionalData || "None provided"}

    Report Requirements:
    1. Briefly analyze the provided metrics. Compare against typical healthy ranges if applicable and data is available (e.g., typical resting heart rate is 60-100 bpm, SpO2 is 95-100%, BP is around 120/80 mmHg, sleep is 7-9 hours). Acknowledge any "N/A" data.
    2. Summarize potential health implications, considering both the metrics and any reported symptoms.
    3. Offer brief, actionable suggestions or points of observation only if warranted by the data (e.g., hydration, rest, consult doctor if metrics are concerning).
    4. Maintain clarity and conciseness, staying under the 150-word limit.
    5. Do not give medical advice, frame suggestions generally (e.g., "consider consulting a healthcare professional" instead of "you need to see a doctor immediately").
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates concise, observational health summaries based on user-provided data. You do not provide medical diagnoses or replace professional medical advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.6,
      max_tokens: 250,
    });

    const reportContent =
      chatCompletion.choices[0]?.message?.content ||
      "Could not generate report due to an unexpected AI response.";

    return reportContent.trim();
  } catch (error) {
    throw new Error("Failed to generate health report via AI service.");
  }
};

const checkHealth = async (healthData) => {
  if (!groq) {
    throw new Error("AI service is not configured.");
  }

  const { heartRate, oxygen, bp, steps, sleep } = healthData;

  const formattedBp = formatBp(bp);
  const formattedSleep = formatSleep(sleep);
  const hrValue =
    heartRate !== "N/A" && heartRate != null ? `${heartRate} bpm` : "N/A";
  const spo2Value = oxygen !== "N/A" && oxygen != null ? `${oxygen}%` : "N/A";
  const stepsValue = steps !== "N/A" && steps != null ? steps : "N/A";
  const sleepValue = formattedSleep;

  if (
    hrValue === "N/A" &&
    spo2Value === "N/A" &&
    formattedBp === "N/A" &&
    sleepValue === "N/A"
  ) {
    return "CANNOT ASSESS\nInsufficient data provided.";
  }

  const prompt = `
    Analyze the following health metrics strictly based on common physiological ranges.
    - Heart Rate: ${hrValue} (Typical resting: 60-100 bpm)
    - Blood Oxygen (SpO2): ${spo2Value} (Typical: 95-100%)
    - Blood Pressure: ${formattedBp} (Typical: around 120/80 mmHg)
    - Steps Taken: ${stepsValue} (Contextual, more is generally better)
    - Sleep Duration: ${sleepValue} (Typical: 7-9 hours)

    Instructions:
    1. Compare the provided values against the typical ranges.
    2. Determine the overall status based *only* on these metrics. Consider SpO2 < 92%, very high/low HR, or significantly abnormal BP as potential emergency indicators. Multiple borderline values might indicate a problem. Normal or near-normal values indicate OK.
    3. Respond in **exactly two lines**:
       - **Line 1:** Output *only* one of these classifications: "OK", "PROBLEM", or "EMERGENCY-CASE".
       - **Line 2:** If the status is "PROBLEM" or "EMERGENCY-CASE", provide a *single, brief* sentence identifying the primary metric(s) of concern (e.g., "Low blood oxygen detected."). If the status is "OK", Line 2 should just be "All metrics appear within typical ranges.". Do not add any other text.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an AI health metric analyzer. Provide a status classification (OK, PROBLEM, EMERGENCY-CASE) and a brief justification based strictly on comparing input data to typical physiological ranges. Follow the two-line output format precisely.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.2,
      max_tokens: 50,
    });

    let reportContent = chatCompletion.choices[0]?.message?.content;

    if (!reportContent) {
      return "ERROR\nAI service returned an empty response.";
    }

    const lines = reportContent.trim().split("\n");
    if (
      lines.length < 1 ||
      !["OK", "PROBLEM", "EMERGENCY-CASE"].includes(lines[0].trim())
    ) {
      return `FORMAT ERROR\n${reportContent.trim()}`;
    }

    return reportContent.trim();
  } catch (error) {
    throw new Error("Failed to check health status via AI service.");
  }
};

const checkSymptoms = async (healthData) => {
  if (!groq) {
    throw new Error("AI service is not configured.");
  }

  const { symptoms, additionalData } = healthData;

  const prompt = `
    Based on the user's self-reported symptoms and contextual information, generate a concise observational health summary with helpful general tips.

    Input Data:
    - Reported Symptoms: ${symptoms || "None reported"}
    - Additional Context or Health Data: ${additionalData || "None provided"}

    Task Guidelines:
    1. Analyze the reported symptoms and context to infer possible general causes or lifestyle-related correlations (e.g., fatigue from lack of sleep, sore throat from seasonal allergies).
    2. If symptoms are suggestive of common issues (e.g., mild dehydration, cold, stress), provide brief, non-diagnostic suggestions that could support well-being.
    3. Avoid medical diagnosis or direct treatment advice. Instead, use general phrases like “consider staying hydrated”, “take rest”, or “consider consulting a healthcare professional if symptoms persist or worsen.”
    4. Use plain language and keep the report strictly under 150 words.
    5. Only include suggestions that are directly relevant to the symptoms or data provided.
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes user-reported symptoms and offers general wellness tips. You do not provide medical diagnoses or specific treatment advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.6,
      max_tokens: 250,
    });

    const reportContent =
      chatCompletion.choices[0]?.message?.content ||
      "Could not generate report due to an unexpected AI response.";

    return reportContent.trim();
  } catch (error) {
    throw new Error("Failed to generate health report via AI service.");
  }
};


export default createHealthReport;
export { checkHealth, checkSymptoms };
