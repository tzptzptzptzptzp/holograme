import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../../../../helpers/getUserIdFromToken.helper";
import { prisma } from "../../../../../../../libs/Prisma.lib";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string; postId: string }> }
) {
  const { postId: postIdParam } = await context.params;
  const postId = parseInt(postIdParam, 10);
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
