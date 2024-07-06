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
    const { url, order } = await req.json();

    const doubleOrderItem = await prisma.favorite.findFirst({
      where: {
        userId,
        order,
      },
    });

    if (doubleOrderItem) {
      return NextResponse.json(
        { error: "Order already exists" },
        { status: 400 }
      );
    }

    const data = await prisma.favorite.create({
      data: {
        url,
        order,
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

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const data = await prisma.favorite.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        order: "asc",
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
