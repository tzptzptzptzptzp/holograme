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

    const item = await prisma.chatRoom.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const { name, description, defaultMessage } = await req.json();

    const data = await prisma.chatRoom.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        defaultMessage: defaultMessage,
        updatedDate: new Date(),
      },
      select: {
        id: true,
        name: true,
        description: true,
        defaultMessage: true,
        updatedDate: true,
      },
    });

    return NextResponse.json(data);
  }
);

export const GET = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

    const data = await prisma.chatRoom.findUnique({
      where: { id: id, userId: userId },
      include: {
        messages: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json(
        { error: "Chat room not found" },
        { status: 404 }
      );
    }

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

    const item = await prisma.chatRoom.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.chatRoom.delete({
      where: { id: id },
      select: {
        id: true,
      },
    });

    return NextResponse.json(data);
  }
);
