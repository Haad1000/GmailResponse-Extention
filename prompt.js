require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function EmailResponseGen(context) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    const prompt = "Help me write a response to an email, here is the context: " + context;
  
    const result = await model.generateContent(prompt);
    console.log(result.response);
    console.log(result.response.text());
    return result.response.text();
  }