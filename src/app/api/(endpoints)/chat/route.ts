import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const POST = withAuth(async (req: Request, userId: string) => {
  const { name, description, defaultMessage } = await req.json();

  const data = await prisma.chatRoom.create({
    data: {
      name: name,
      description: description,
      defaultMessage: defaultMessage,
      userId: userId,
    },
  });

  return NextResponse.json(data);
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const data = await prisma.chatRoom.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedDate: "desc",
    },
  });

  return NextResponse.json(data);
});
