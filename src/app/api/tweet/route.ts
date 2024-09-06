import { NextResponse } from "next/server";
import { generateGPTResponse } from "@/app/apiHelpers/generateGPTResponse.helper";
import { gptConfig } from "@/config/gpt.config";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await req.json();

    const gptResponse = await generateGPTResponse(prompt, gptConfig.MODEL.LITE);

    if (gptResponse === null) {
      return NextResponse.json(
        { error: "Failed to generate GPT response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ answer: gptResponse });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
