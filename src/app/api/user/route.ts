import { NextResponse } from "next/server";
import { prisma } from "@/libs/Prisma.lib";

export async function POST(req: Request) {
  try {
    const { id, email } = await req.json();

    const data = await prisma.user.create({
      data: {
        id,
        nickname: "",
        email,
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
