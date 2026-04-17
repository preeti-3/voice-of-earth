import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from 'fs';
import * as path from 'path';

const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const apiKeyLine = envLocal.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
const apiKey = apiKeyLine ? apiKeyLine.split('=')[1].trim() : '';

const genAI = new GoogleGenerativeAI(apiKey);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function test() {
  const prompt = "You are a Tree located in London. Speak directly to a human in an emotional and reflective tone. Keep it under 120 words.";
  const result = await geminiModel.generateContent(prompt);
  console.log("RESPONSE:", await result.response.text());
}
test();
