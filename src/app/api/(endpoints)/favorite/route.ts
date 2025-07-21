import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const POST = withAuth(async (req: Request, userId: string) => {
  const { title, url, emojiId, emojiNative, emojiUnified } = await req.json();

  const item = await prisma.favorite.findFirst({
    where: {
      userId,
    },
    orderBy: {
      order: "desc",
    },
  });

  const data = await prisma.favorite.create({
    data: {
      userId,
      title,
      url,
      order: item ? item.order + 1 : 1,
      emojiId,
      emojiNative,
      emojiUnified,
    },
  });

  return NextResponse.json(data);
});

export const PUT = withAuth(async (req: Request, userId: string) => {
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
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const data = await prisma.favorite.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      order: "asc",
    },
  });

  return NextResponse.json(data);
});
