const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

// The new client automatically looks for process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function checkAccess() {
  try {
    console.log("--- Checking Model Access ---");
    
    // 1. Test a specific model (Gemini 2.0 Flash)
    const testModel = 'gemini-2.0-flash';
    console.log(`Testing content generation with: ${testModel}...`);
    
    const response = await ai.models.generateContent({
      model: testModel,
      contents: 'Say "Connection Successful!"',
    });

    console.log("✅ Success! Response:", response.text);
    console.log("-----------------------------\n");

    // 2. List all available models for your key
    console.log("--- Fetching All Available Models ---");
    const modelList = await ai.models.list();
    
    modelList.forEach(m => {
        // Only show models that support content generation
        if (m.supported_generation_methods.includes("generateContent")) {
            console.log(`Available Model: ${m.name.replace('models/', '')}`);
        }
    });

  } catch (error) {
    console.error("❌ Error:");
    // The new SDK often puts details in error.message or error.status
    console.error(error.message || error);
    
    if (error.message.includes("404")) {
        console.log("\nTIP: A 404 usually means the model name is slightly different or the SDK is outdated.");
    }
  }
}

checkAccess();