import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const POST = withAuth(async (req: Request, userId: string) => {
  const { title, content } = await req.json();

  const data = await prisma.memo.create({
    data: {
      userId: userId,
      content: content,
      title: title,
    },
  });

  return NextResponse.json(data);
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const data = await prisma.memo.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedDate: "desc",
    },
  });

  return NextResponse.json(data);
});
