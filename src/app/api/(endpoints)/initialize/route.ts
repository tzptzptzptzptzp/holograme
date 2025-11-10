import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const GET = withAuth(async (req: Request, userId: string) => {
  const [userData, chatData, clipboardData, favoriteData] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
    prisma.chatRoom.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedDate: "desc",
      },
    }),
    prisma.clipboard.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    }),
    prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        order: "asc",
      },
    }),
  ]);

  return NextResponse.json({
    userData,
    chatData,
    clipboardData,
    favoriteData,
  });
});
