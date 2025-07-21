import { NextResponse } from "next/server";
import { prisma } from "../../../../../libs/Prisma.lib";
import { withAuth } from "../../../helpers/auth.helper";

export const PUT = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

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
  }
);

export const DELETE = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

    const item = await prisma.memo.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.memo.delete({
      where: { id: id },
    });

    return NextResponse.json(data);
  }
);
