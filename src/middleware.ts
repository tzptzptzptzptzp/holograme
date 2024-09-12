import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./libs/supabase/middleware.lib";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  let response = NextResponse.next();

  let updatedResponse = await updateSession(request);

  response = new NextResponse(updatedResponse.body, {
    status: updatedResponse.status,
    headers: updatedResponse.headers,
  });

  if (url.pathname === "/") {
    response.cookies.set("url", url.toString());
  }
  if (url.pathname === "/auth") {
    response.cookies.delete("url");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next|api/auth|api/user|static|icons|favicon.ico|manifest.json|background.jpg).*)",
  ],
};
