import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../../apiHelpers/getUserIdFromToken.helper";
import { prisma } from "../../../../libs/Prisma.lib";

export async function PUT(
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

    const item = await prisma.memo.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const { title, content } = await req.json();

    const data = await prisma.memo.update({
      where: { id: id },
      data: {
        userId: userId,
        content: content,
        title: title,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
