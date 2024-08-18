import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/apiHelpers/generateGPTResponse.helper";
import { getUserIdFromToken } from "@/app/apiHelpers/getUserIdFromToken.helper";
import { gptConfig } from "@/config/gpt.config";
import { prisma } from "@/libs/Prisma.lib";

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
    const { title, prompt } = await req.json();

    const gptResponse = await generateGPTResponse(
      prompt,
      undefined,
      gptConfig.MAX_TOKENS.WRITING
    );

    if (gptResponse === null) {
      return NextResponse.json(
        { error: "Failed to generate GPT response" },
        { status: 500 }
      );
    }
    const data = await prisma.blogPost.create({
      data: {
        userId,
        writerId: id,
        title,
        prompt,
        content: gptResponse,
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

export async function GET(
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

    const data = await prisma.blogPost.findMany({
      where: { userId, writerId: id },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
