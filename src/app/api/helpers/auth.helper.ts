import { NextResponse } from "next/server";
import { auth } from "@/auth";

export type AuthResult =
  | { success: true; userId: string }
  | { success: false; response: NextResponse };

export async function authenticateRequest(): Promise<AuthResult> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }
    return { success: true, userId: session.user.id };
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }
}

export function withAuth<T extends any[]>(
  handler: (req: Request, userId: string, ...args: T) => Promise<NextResponse>
) {
  return async (req: Request, ...args: T): Promise<NextResponse> => {
    try {
      const authResult = await authenticateRequest();

      if (!authResult.success) {
        return authResult.response;
      }

      return await handler(req, authResult.userId, ...args);
    } catch (error) {
      console.error("API Error:", error);
      return NextResponse.json(
        { error: (error as Error).message },
        { status: 500 }
      );
    }
  };
}
