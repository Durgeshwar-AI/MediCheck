import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groqApiKey = process.env.GROQ_API_KEY;
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

const createHealthReport = async (healthData) => {
  if (!groq) {
    throw new Error("Groq API key not configured on the server.");
  }

  const { heartRate, oxygen, bp, steps, sleep, symptoms, additionalData  } = healthData;

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
    Generate a concise health report based on the following daily data:
    - Heart Rate: ${heartRate} bpm
    - Blood Oxygen (SpO2): ${oxygen}%
    - Blood Pressure: ${bpString}
    - Steps Taken: ${steps}
    - Sleep Duration: ${sleepString}
    - Symptoms: ${symptoms}
    - Additional Information: ${additionalData}

    Analyze these metrics and provide a brief summary of potential health implications or suggestions. Focus on clarity and actionable insights if possible. Keep the report under 150 words.
    `;

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

const checkHealth = async (healthData)=>{
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
    
        const reportContent =
          chatCompletion.choices[0]?.message?.content ||
          "OK";
    
        return reportContent.trim();
      } catch (error) {
        console.error("Error calling Groq API:", error);
        // Re-throw a more generic error for the controller to handle
        throw new Error("Failed to communicate with Groq API.");
      }
}

export default createHealthReport;
export {checkHealth}
