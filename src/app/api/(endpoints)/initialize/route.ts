import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const GET = withAuth(async (req: Request, userId: string) => {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const chatData = await prisma.chatRoom.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedDate: "desc",
    },
  });

  const clipboardData = await prisma.clipboard.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  const favoriteData = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      order: "asc",
    },
  });

  return NextResponse.json({
    userData,
    chatData,
    clipboardData,
    favoriteData,
  });
});
