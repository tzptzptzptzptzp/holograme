import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../auth/route";
import { prisma } from "../../../libs/Prisma.lib";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const data = await prisma.clipboard.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
