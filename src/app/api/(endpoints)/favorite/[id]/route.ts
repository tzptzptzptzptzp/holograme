import { NextResponse } from "next/server";
import { prisma } from "@/libs/Prisma.lib";
import { withAuth } from "@/app/api/helpers/auth.helper";

export const PUT = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

    const { title, url, emojiId, emojiNative, emojiUnified } = await req.json();

    const item = await prisma.favorite.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.favorite.update({
      where: { id: id },
      data: {
        ...item,
        title,
        url,
        emojiId,
        emojiNative,
        emojiUnified,
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

    const item = await prisma.favorite.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.favorite.delete({
      where: { id: id },
      select: {
        id: true,
      },
    });

    return NextResponse.json(data);
  }
);
