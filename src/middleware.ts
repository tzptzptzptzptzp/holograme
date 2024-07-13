import { NextRequest } from "next/server";
import { updateSession } from "./libs/supabase/middleware.lib";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next|api/auth|static|icons|favicon.ico|manifest.json|background.jpg).*)",
  ],
};
