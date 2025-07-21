import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const POST = withAuth(async (req: Request, userId: string) => {
  const { content } = await req.json();

  const data = await prisma.clipboard.create({
    data: {
      content: content,
      userId: userId,
    },
  });

  return NextResponse.json(data);
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const data = await prisma.clipboard.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(data);
});

export const DELETE = withAuth(async (req: Request, userId: string) => {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const data = await prisma.clipboard.delete({
    where: { id: id, userId: userId },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!data || data.userId !== userId) {
    return NextResponse.json(
      { error: "Item not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
});
