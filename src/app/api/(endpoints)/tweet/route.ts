import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/api/helpers/generateGPTResponse.helper";
import { gptConfig } from "@/app/api/configs/gpt.config";
import { createSystemPrompt } from "../../helpers/prompt/createSystemPrompt.helper";
import { GetRandomObject } from "@/utils/GetRandomObject.util";
import { topicList } from "../../configs/prompt/topic.config";
import { withAuth } from "@/app/api/helpers/auth.helper";
import { prisma } from "@/libs/Prisma.lib";

export type PostTweetRequest = {};

export const POST = withAuth(async (req: Request, userId: string) => {
  // ユーザー情報を取得
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const selectedTopic = GetRandomObject(topicList);

  if (!selectedTopic) {
    return NextResponse.json({ error: "No topics available" }, { status: 500 });
  }

  // システムプロンプトを作成
  const systemPrompt = {
    role: "system" as const,
    content: createSystemPrompt({
      userData,
      responseFormat: "string",
    }),
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
