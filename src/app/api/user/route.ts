import { NextResponse } from "next/server";
import { getUserIdFromToken } from "@/app/apiHelpers/getUserIdFromToken.helper";
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

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);

    const { nickname } = await req.json();

    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nickname,
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

    const data = await prisma.user.findUnique({
      where: {
        id: userId,
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
