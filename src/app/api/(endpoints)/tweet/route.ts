import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/api/helpers/generateGPTResponse.helper";
import { gptConfig } from "@/app/api/configs/gpt.config";
import { createSystemPrompt } from "../../helpers/prompt/createSystemPrompt.helper";
import { GetRandomObject } from "@/utils/GetRandomObject.util";
import { topicList } from "../../configs/prompt/topic.config";
import { User } from "@prisma/client";
import { withAuth } from "@/app/api/helpers/auth.helper";

export type PostTweetRequest = {
  userData: User;
};

export const POST = withAuth(async (req: Request, userId: string) => {
  const { userData } = (await req.json()) as PostTweetRequest;

  const selectedTopic = GetRandomObject(topicList);

  if (!selectedTopic) {
    return NextResponse.json({ error: "No topics available" }, { status: 500 });
  }

  // システムプロンプトを作成
  let systemPromptContent: string;
  try {
    systemPromptContent = createSystemPrompt({ userData });
  } catch (error) {
    console.error("Failed to create system prompt:", error);
    return NextResponse.json(
      { error: "Failed to create system prompt" },
      { status: 500 }
    );
  }

  const systemPrompt = {
    role: "system" as const,
    content: systemPromptContent,
  };

  const gptResponse = await generateGPTResponse(
    gptConfig.MODEL.LITE,
    [systemPrompt, { role: "user", content: JSON.stringify(selectedTopic) }],
    gptConfig.MAX_TOKENS.DEFAULT
  );

  if (gptResponse === null) {
    return NextResponse.json(
      { error: "Failed to generate GPT response" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    tweet: gptResponse,
  });
});
