import { NextResponse } from "next/server";
import { getUserIdFromToken } from "../../../../apiHelpers/getUserIdFromToken.helper";
import { prisma } from "../../../../../libs/Prisma.lib";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);
    const { title, prompt, content } = await req.json();

    const data = await prisma.blogPost.create({
      data: {
        userId,
        writerId: id,
        title,
        prompt,
        content,
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
