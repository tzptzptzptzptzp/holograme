import OpenAI from "openai";
import { gptConfig } from "@/config/gpt.config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGPTResponse = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: gptConfig.MODEL,
    messages: [{ role: "system", content: prompt }],
    max_tokens: gptConfig.MAX_TOKENS,
  });

  return response.choices[0].message.content;
};
