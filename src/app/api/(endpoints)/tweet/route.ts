import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/api/helpers/generateGPTResponse.helper";
import { gptConfig } from "@/app/api/configs/gpt.config";
import { createSystemPrompt } from "../../helpers/prompt/createSystemPrompt.helper";
import { GetRandomObject } from "@/utils/GetRandomObject.util";
import { topicList } from "../../configs/prompt/topic.config";
import { User } from "@prisma/client";

export type PostTweetRequest = {
  userData: User;
};

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { userData } = (await req.json()) as PostTweetRequest;

    const selectedTopic = GetRandomObject(topicList);

    if (!selectedTopic) {
      return NextResponse.json(
        { error: "No topics available" },
        { status: 500 }
      );
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
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
