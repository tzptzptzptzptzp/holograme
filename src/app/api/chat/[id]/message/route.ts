import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/apiHelpers/generateGPTResponse.helper";
import { getUserIdFromToken } from "@/app/apiHelpers/getUserIdFromToken.helper";
import { prisma } from "@/libs/Prisma.lib";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const { content } = await req.json();

    const roomItem = await prisma.chatRoom.findUnique({
      where: { id: id },
    });

    if (!roomItem || roomItem.userId !== userId) {
      return NextResponse.json(
        { error: "Room not found or unauthorized" },
        { status: 404 }
      );
    }

    const gptResponse = await generateGPTResponse(content);

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
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
