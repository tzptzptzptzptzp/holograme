import { NextResponse } from "next/server";
import supabase from "../../../../libs/SupabaseClient.lib";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const token = data.session?.access_token;

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}