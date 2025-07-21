import { NextResponse } from "next/server";
import { prisma } from "@/libs/Prisma.lib";
import { withAuth } from "@/app/api/helpers/auth.helper";

export async function POST(req: Request) {
  try {
    const { id, email } = await req.json();

    const data = await prisma.user.create({
      data: {
        id,
        username: "",
        nickname: "",
        email,
        location: "",
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

export const PUT = withAuth(async (req: Request, userId: string) => {
  const { username, nickname, location } = await req.json();

  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
      nickname,
      location,
    },
  });

  return NextResponse.json(data);
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return NextResponse.json(data);
});
