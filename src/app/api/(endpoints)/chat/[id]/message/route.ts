import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/api/helpers/generateGPTResponse.helper";
import { prisma } from "@/libs/Prisma.lib";
import { withAuth } from "@/app/api/helpers/auth.helper";
import { User } from "@prisma/client";
import { createSystemPrompt } from "@/app/api/helpers/prompt/createSystemPrompt.helper";

/** OpenAI 応答が重いリクエストでも Vercel 関数が先に打ち切られないよう上限を明示（vercel.json と揃える） */
export const maxDuration = 60;

export type PostChatMessageRequest = {
  userData: User;
  userMessage: string;
  chatHistory: { role: "user" | "assistant" | "system"; content: string }[];
};

export const POST = withAuth(
  async (
    req: Request,
    _userId: string,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam, 10);

    const { userData, userMessage, chatHistory } =
      (await req.json()) as PostChatMessageRequest;

    const userId = userData.id;

    const roomItem = await prisma.chatRoom.findUnique({
      where: { id: id },
    });

    if (!roomItem || roomItem.userId !== userId) {
      return NextResponse.json(
        { error: "Room not found or unauthorized" },
        { status: 404 }
      );
    }

    // システムプロンプトを作成
    const systemPrompt = {
      role: "system" as const,
      content: createSystemPrompt({
        userData,
        responseFormat: "markdown",
      }),
    };

    const messages = [
      systemPrompt,
      ...chatHistory,
      { role: "user" as const, content: userMessage },
    ];

    const gptResponse = await generateGPTResponse(undefined, messages);

    if (gptResponse === null) {
      return NextResponse.json(
        { error: "Failed to generate GPT response" },
        { status: 500 }
      );
    }

    await prisma.chatMessage.create({
      data: {
        content: userMessage,
        role: "user",
        roomId: id,
        userId: userId,
      },
    });

    await prisma.chatMessage.create({
      data: {
        content: gptResponse,
        role: "assistant",
        roomId: id,
        userId: userId,
      },
    });

    await prisma.chatRoom.update({
      where: { id: id },
      data: {
        updatedDate: new Date(),
      },
    });

    return NextResponse.json({});
  }
);
