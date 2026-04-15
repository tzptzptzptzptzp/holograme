import { NextResponse } from "next/server";
import { prisma } from "../../../../../libs/Prisma.lib";
import { withAuth } from "../../../helpers/auth.helper";

export const PUT = withAuth(
  async (
    req: Request,
    userId: string,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam, 10);

    const item = await prisma.writer.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const {
      name,
      expertise,
      targetAudience,
      sitePurpose,
      siteGenre,
      toneAndStyle,
    } = await req.json();

    const data = await prisma.writer.update({
      where: { id: id },
      data: {
        userId,
        name,
        expertise,
        targetAudience,
        sitePurpose,
        siteGenre,
        toneAndStyle,
      },
    });

    return NextResponse.json(data);
  }
);

export const DELETE = withAuth(
  async (
    req: Request,
    userId: string,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam, 10);

    const item = await prisma.writer.findUnique({
      where: { id: id, userId: userId },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const data = await prisma.writer.delete({
      where: { id: id, userId: userId },
    });

    return NextResponse.json(data);
  }
);
