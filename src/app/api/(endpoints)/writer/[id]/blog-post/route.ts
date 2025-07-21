import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/api/helpers/generateGPTResponse.helper";
import { gptConfig } from "@/app/api/configs/gpt.config";
import { prisma } from "@/libs/Prisma.lib";
import { withAuth } from "@/app/api/helpers/auth.helper";

export const POST = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

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
  }
);

export const GET = withAuth(
  async (
    req: Request,
    userId: string,
    { params }: { params: { id: string } }
  ) => {
    const id = parseInt(params.id, 10);

    const data = await prisma.blogPost.findMany({
      where: { userId, writerId: id },
      orderBy: {
        createdDate: "desc",
      },
    });

    return NextResponse.json(data);
  }
);
