import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

const createHealthReport = async (healthData) => {
  if (!groq) {
    throw new Error("Groq API key not configured on the server.");
  }

  const { heartRate, oxygen, bp, steps, sleep, symptoms, additionalData } =
    healthData;

  let prompt = "";

  if (
    heartRate != "N/A" ||
    oxygen != "N/A" ||
    bp != "N/A" ||
    steps != "N/A" ||
    sleep != "N/A"
  ) {
    prompt = `
    Analyze the following daily health data and generate a concise health report (under 150 words).
    Input Data:
    - Current Symptoms Experienced: ${symptoms}
    - Additional Information/Context: ${additionalData}
    
    Report Requirements:
    - Briefly analyze the provided metrics against typical healthy ranges (where applicable).
    - Summarize potential health implications based on the data and any reported symptoms.
    - Offer brief, actionable suggestions or points of observation if relevant.
    - Maintain clarity and conciseness, staying under the 150-word limit.
    
    Handling Missing Data:
    - If any data points are missing or marked as 'N/A', acknowledge this in the report.
    - If crucial data (specifically Heart Rate, SpO2, Blood Pressure, or Current Symptoms) is missing, state that a full assessment is limited. Politely ask the user if they can provide the missing metric(s) in the additional data field [mention specific missing crucial metric(s), e.g., Blood Pressure, SpO2] for a more complete picture.
    - If only non-crucial data (Steps, Sleep, Additional Info) is missing, simply note its absence without requesting it.
    `;
  } else {
    prompt = `
    Analyze the following daily health data and generate a concise health report (under 150 words).
    Input Data:
    - Heart Rate: ${heartRate} bpm
    - Blood Oxygen (SpO2): ${oxygen}
    - Blood Pressure: ${bp}
    - Steps Taken: ${steps}
    - Sleep Duration: ${sleep}
    - Current Symptoms Experienced: ${symptoms}
    - Additional Information/Context: ${additionalData}
    
    Report Requirements:
    - Briefly analyze the provided metrics against typical healthy ranges (where applicable).
    - Summarize potential health implications based on the data and any reported symptoms.
    - Offer brief, actionable suggestions or points of observation if relevant.
    - Maintain clarity and conciseness, staying under the 150-word limit.
    
    Handling Missing Data:
    - If any data points are missing or marked as 'N/A', acknowledge this in the report.
    - If crucial data (specifically Heart Rate, SpO2, Blood Pressure, or Current Symptoms) is missing, state that a full assessment is limited. Politely ask the user if they can provide the missing metric(s) in the additional data field [mention specific missing crucial metric(s), e.g., Blood Pressure, SpO2] for a more complete picture.
    - If only non-crucial data (Steps, Sleep, Additional Info) is missing, simply note its absence without requesting it.
    `;
  }
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates health reports based on user-provided data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 200,
    });

    const reportContent =
      chatCompletion.choices[0]?.message?.content ||
      "Could not generate report.";

    return reportContent.trim();
  } catch (error) {
    console.error("Error calling Groq API:", error);
    // Re-throw a more generic error for the controller to handle
    throw new Error("Failed to communicate with Groq API.");
  }
};

const checkHealth = async (healthData) => {
  if (!groq) {
    throw new Error("Groq API key not configured on the server.");
  }

  const { heartRate, oxygen, bp, steps, sleep } = healthData;

  let bpString = "";
  if (typeof bp === "object" && bp.systolic && bp.diastolic) {
    bpString = `${bp.systolic}/${bp.diastolic} mmHg`;
  } else if (typeof bp === "string" && /^\d+\/\d+$/.test(bp)) {
    bpString = `${bp} mmHg`;
  } else if (typeof bp === "string") {
    bpString = bp;
  } else {
    throw new Error(
      'Invalid format for bp data. Expecting {systolic, diastolic} or "systolic/diastolic".'
    );
  }

  let sleepString = "";
  if (typeof sleep === "object" && sleep.hours) {
    sleepString = `${sleep.hours} hours`;
    if (sleep.quality) {
      sleepString += ` (Quality: ${sleep.quality})`;
    }
  } else if (typeof sleep === "string") {
    sleepString = sleep;
  } else {
    throw new Error(
      "Invalid format for sleep data. Expecting {hours, quality?} or string description."
    );
  }

  const prompt = `
        Check the health of a person from the given data:
        - Heart Rate: ${heartRate} bpm
        - Blood Oxygen (SpO2): ${oxygen}%
        - Blood Pressure: ${bpString}
        - Steps Taken: ${steps}
        - Sleep Duration: ${sleepString}
    
        Analyze these metrics and Return only either OK, PROBLEM or EMERGENCY-CASE depending on the data. And a single line statement on where the problem is in the next para. In the first para only give a string of "OK", "PROBLEM" or "EMERGENCY-CASE"
        `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that can check the health of a person based on user-provided data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 200,
    });

    const reportContent = chatCompletion.choices[0]?.message?.content || "OK";

    return reportContent.trim();
  } catch (error) {
    console.error("Error calling Groq API:", error);
    // Re-throw a more generic error for the controller to handle
    throw new Error("Failed to communicate with Groq API.");
  }
};

export default createHealthReport;
export { checkHealth };
