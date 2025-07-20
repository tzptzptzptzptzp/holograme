import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/apiHelpers/generateGPTResponse.helper";
import { getUserIdFromToken } from "@/app/apiHelpers/getUserIdFromToken.helper";
import { prisma } from "@/libs/Prisma.lib";

export async function DELETE(
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

    const item = await prisma.chatRoom.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.chatMessage.deleteMany({
      where: { roomId: id },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
