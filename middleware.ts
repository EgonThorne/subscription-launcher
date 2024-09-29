import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const protectedRoutes = ["/chatbot", "/subscription"];

  if (protectedRoutes.includes(path)) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    });
    // 打印 token
    // console.log("Token:", JSON.stringify(token, null, 2));

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
