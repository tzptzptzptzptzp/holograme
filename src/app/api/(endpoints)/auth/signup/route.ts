import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/libs/Prisma.lib";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "このメールアドレスは既に使用されています" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();

    const user = await prisma.user.create({
      data: {
        id,
        email,
        password: hashed,
        username: "",
        nickname: "",
        location: "",
      },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
