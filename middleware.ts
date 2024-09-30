import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/chatbot", "/sub"];

  if (protectedRoutes.includes(path)) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // const allCookies = request.cookies.getAll();
  // console.log("All Cookies:", JSON.stringify(allCookies, null, 2));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
