import fs from 'fs';
import path from 'path';

const envLocal = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf8');
const apiKeyLine = envLocal.split('\n').find(line => line.startsWith('GEMINI_API_KEY='));
const apiKey = apiKeyLine ? apiKeyLine.split('=')[1].trim() : '';

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("AVAILABLE MODELS:");
    if (data.models) {
        data.models.forEach((m) => {
            if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                console.log(`- ${m.name}`);
            }
        });
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
