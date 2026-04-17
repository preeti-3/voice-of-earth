import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", 
});

export async function generateNatureResponse(
  element: string,
  city: string,
  message?: string,
  tone: "Hopeful Future" | "Dystopian Future" = "Hopeful Future"
) {
  const prompt = `
You are a ${element} located in ${city}. 
Speak directly to a human in an emotional and reflective tone.

Tone context: ${tone}. Be poetic, human-like, slightly melancholic but ${tone === "Hopeful Future" ? "hopeful" : "warning/dystopian"}.

Include:
- What has changed over time
- How humans have impacted you
- A subtle emotional appeal (not aggressive)
${message ? `- The human said to you: "${message}". Briefly acknowledge or respond to this in your thoughts.` : ""}

Constraints:
- Keep the response under 120 words.
- Do not use markdown like bolding or asterisks. Speak in plain text paragraphs.
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    // Throw the actual error so we know if it is a permissions/key issue
    throw new Error(error?.message || "Failed to generate response from nature.");
  }
}
