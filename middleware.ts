import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const token = req.cookies.get("sessionToken")?.value || "";
  const role = req.cookies.get("role")?.value || "";

  if (path.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    const res = NextResponse.next();
    res.cookies.set("sessionToken", token, { path: "/", maxAge: 1800 });
    if (role) res.cookies.set("role", role, { path: "/", maxAge: 1800 });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};