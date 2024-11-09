// const {GoogleGenerativeAI} = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const model = genAI.getGenerativeModel({ model: "MODEL_NAME"})

require('dotenv').config()

const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Write a story about a magic backpack.";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function textGenTextOnlyPrompt() {
  // [START text_gen_text_only_prompt]
  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "How many trnasformations does Goku have?";

  const result = await model.generateContent(prompt);
  console.log(result.response);
  console.log(result.response.text());
  // [END text_gen_text_only_prompt]
}

textGenTextOnlyPrompt()