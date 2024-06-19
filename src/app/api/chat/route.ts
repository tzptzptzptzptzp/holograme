import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../apiHelpers/getUserIdFromToken.helper";
import { prisma } from "../../../libs/Prisma.lib";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);
    const { name } = await req.json();

    const data = await prisma.chatRoom.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const data = await prisma.chatRoom.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedDate: "desc",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
