import { NextResponse } from "next/server";
import { getUserIdFromToken } from "./getUserIdFromToken.helper";

export type AuthResult =
  | {
      success: true;
      userId: string;
    }
  | {
      success: false;
      response: NextResponse;
    };

/**
 * リクエストからトークンを取得し、認証を行う
 * @param req リクエストオブジェクト
 * @returns 認証結果。成功時はuserIdを含み、失敗時はNextResponseを含む
 */
export async function authenticateRequest(req: Request): Promise<AuthResult> {
  try {
    // Authorizationヘッダーからトークンを取得
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return {
        success: false,
        response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      };
    }

    // トークンからユーザーIDを取得
    const userId = await getUserIdFromToken(token);

    return {
      success: true,
      userId,
    };
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }
}

/**
 * 認証が必要なAPIハンドラーを包む高階関数
 * @param handler 認証後に実行するハンドラー関数
 * @returns ラップされたハンドラー関数
 */
export function withAuth<T extends any[]>(
  handler: (req: Request, userId: string, ...args: T) => Promise<NextResponse>
) {
  return async (req: Request, ...args: T): Promise<NextResponse> => {
    try {
      const authResult = await authenticateRequest(req);

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
