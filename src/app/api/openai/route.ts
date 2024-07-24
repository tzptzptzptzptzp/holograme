import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getUserIdFromToken } from "@/app/apiHelpers/getUserIdFromToken.helper";

type Response = {
  body: {
    data: {
      id: string;
      object: string;
      created: number;
      owned_by: string;
    }[];
  };
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = await getUserIdFromToken(token);
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const res = (await openai.models.list()) as unknown as Promise<Response>;

    const models = (await res).body.data;

    const sortedModels = models.sort((a, b) => b.created - a.created);

    return NextResponse.json(sortedModels);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
