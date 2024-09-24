import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

//仅保护/app/chatbot及其子路由
export default auth((req) => {
  const isAuthenticated = !!req.auth;
  const isAccessingChatbot = req.nextUrl.pathname.startsWith("/app/chatbot");

  if (isAccessingChatbot && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/app/chatbot/:path*"],
};
