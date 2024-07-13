import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../../apiHelpers/getUserIdFromToken.helper";
import { prisma } from "../../../../libs/Prisma.lib";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);
    const { title, content } = await req.json();

    const data = await prisma.chatStandardPhrase.create({
      data: {
        title,
        content,
        userId,
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
