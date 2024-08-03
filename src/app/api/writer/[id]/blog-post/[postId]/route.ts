import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../../../../apiHelpers/getUserIdFromToken.helper";
import { prisma } from "../../../../../../libs/Prisma.lib";

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const postId = parseInt(params.postId, 10);
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const item = await prisma.blogPost.findUnique({
      where: { id: postId, userId: userId },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.blogPost.delete({
      where: { id: postId, userId: userId },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
