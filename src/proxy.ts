import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const secure = process.env.NODE_ENV === "production";
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    cookieName: secure
      ? "__Secure-authjs.session-token"
      : "authjs.session-token",
  });

  const { pathname } = request.nextUrl;
  const isAuthenticated = !!token;

  if (!isAuthenticated && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl.origin));
  }

  const response = NextResponse.next();

  if (pathname === "/") {
    response.cookies.set("url", request.nextUrl.toString());
  }
  if (pathname === "/auth") {
    response.cookies.delete("url");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico|manifest.json|.*\\.jpg|.*\\.jpeg|.*\\.png|.*\\.gif|.*\\.webp|.*\\.svg).*)",
  ],
};
