import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../apiHelpers/getUserIdFromToken.helper";
import { prisma } from "../../../libs/Prisma.lib";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

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
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
