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
    const { title, url, emojiId, emojiNative, emojiUnified } = await req.json();

    const items = await prisma.favorite.findMany({
      where: {
        userId,
      },
    });

    const data = await prisma.favorite.create({
      data: {
        userId,
        title,
        url,
        order: items.length + 1,
        emojiId,
        emojiNative,
        emojiUnified,
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

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = await getUserIdFromToken(token);
    const { favorites }: { favorites: { id: number; order: number }[] } =
      await req.json();

    const updates = favorites.map((favorite) =>
      prisma.favorite.update({
        where: { id: favorite.id, userId },
        data: { order: favorite.order },
      })
    );

    const results = await prisma.$transaction(updates);

    return NextResponse.json(results);
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
