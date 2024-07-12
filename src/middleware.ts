import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const token = req.cookies.get("supabase-auth-token")?.value;

  // if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/auth", req.url));
  // }

  // const { data: session } = await supabase.auth.getSession();

  // if (token && req.nextUrl.pathname.startsWith("/auth")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // if (!session && req.nextUrl.pathname !== "/auth") {
  //   return NextResponse.redirect(new URL("/auth", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|icons|favicon.ico|manifest.json|background.jpg).*)",
  ],
};
