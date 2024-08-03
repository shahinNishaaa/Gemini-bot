require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');

const geminiApiKeys = process.env.GEMINI_API_KEYS.split(',');


async function runGeminiPro (prompt,index) {
  
  const genAI = new GoogleGenerativeAI(geminiApiKeys[index]);
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function runGeminiVision(prompt,path,mimeType,index) {
  const genAI = new GoogleGenerativeAI(geminiApiKeys[index]);
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const imageParts = [
    fileToGenerativePart(path, mimeType),
  ];
  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

module.exports = { runGeminiPro, runGeminiVision, geminiApiKeys}