import OpenAI from "openai";
import { gptConfig } from "@/config/gpt.config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGPTResponse = async (
  prompt: string,
  model = gptConfig.MODEL.DEFAULT,
  maxToken = gptConfig.MAX_TOKENS.DEFAULT
) => {
  const response = await openai.chat.completions.create({
    model: model,
    messages: [{ role: "system", content: prompt }],
    max_tokens: maxToken,
  });

  return response.choices[0].message.content;
};
