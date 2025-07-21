import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/api/helpers/generateGPTResponse.helper";
import { prisma } from "@/libs/Prisma.lib";
import { withAuth } from "@/app/api/helpers/auth.helper";

export const POST = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

    const { content, prompt } = await req.json();

    const roomItem = await prisma.chatRoom.findUnique({
      where: { id: id },
    });

    if (!roomItem || roomItem.userId !== userId) {
      return NextResponse.json(
        { error: "Room not found or unauthorized" },
        { status: 404 }
      );
    }

    const gptResponse = await generateGPTResponse(prompt);

    if (gptResponse === null) {
      return NextResponse.json(
        { error: "Failed to generate GPT response" },
        { status: 500 }
      );
    }

    const userMessage = await prisma.chatMessage.create({
      data: {
        content,
        role: "user",
        roomId: id,
        userId: userId,
      },
    });

    const gptMessage = await prisma.chatMessage.create({
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

    return NextResponse.json({ userMessage, gptMessage });
  }
);
