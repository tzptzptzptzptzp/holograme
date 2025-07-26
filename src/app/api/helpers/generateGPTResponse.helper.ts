import OpenAI from "openai";
import { gptConfig } from "@/app/api/configs/gpt.config";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateGPTResponse = async (
  model = gptConfig.MODEL.DEFAULT,
  messages: ChatCompletionMessageParam[] = [],
  maxToken = gptConfig.MAX_TOKENS.DEFAULT
) => {
  const response = await openai.chat.completions.create({
    model,
    messages,
    max_completion_tokens: maxToken,
  });

  return response.choices[0].message.content;
};
