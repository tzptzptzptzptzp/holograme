import { NextResponse } from "next/server";
import OpenAI from "openai";
import { withAuth } from "@/app/api/helpers/auth.helper";

export type OpenAiModel = {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

type Response = {
  body: {
    data: OpenAiModel[];
  };
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GET = withAuth(async (req: Request, userId: string) => {
  const res = (await openai.models.list()) as unknown as Promise<Response>;

  const models = (await res).body.data;

  const sortedModels = models.sort((a, b) => b.created - a.created);

  return NextResponse.json(sortedModels);
});
