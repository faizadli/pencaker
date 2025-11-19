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

    const companyApproved = req.cookies.get("companyApproved")?.value === "true";
    const allowedCandidate = new Set(["/dashboard", "/dashboard/profile"]);

    if (role === "candidate" && !allowedCandidate.has(path)) {
      url.pathname = "/dashboard/profile";
      return NextResponse.redirect(url);
    }
    if (role === "company") {
      // Hanya izinkan dashboard & profile selalu; lowongan hanya jika approved; perusahaan selalu ditolak
      const allowedCompany = new Set(["/dashboard", "/dashboard/profile", companyApproved ? "/dashboard/lowongan" : ""]);
      if (!allowedCompany.has(path)) {
        url.pathname = "/dashboard/profile";
        return NextResponse.redirect(url);
      }
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