import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/Prisma.lib";
import { withAuth } from "../../helpers/auth.helper";

export const POST = withAuth(async (req: Request, userId: string) => {
  const {
    name,
    expertise,
    targetAudience,
    sitePurpose,
    siteGenre,
    toneAndStyle,
  } = await req.json();

  const data = await prisma.writer.create({
    data: {
      userId,
      name,
      expertise,
      targetAudience,
      sitePurpose,
      siteGenre,
      toneAndStyle,
    },
  });

  return NextResponse.json(data);
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const data = await prisma.writer.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedDate: "desc",
    },
  });

  return NextResponse.json(data);
});
