"use client";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <button onClick={() => signIn("github", { redirectTo: "/chatbot" })}>
      Sign In
    </button>
  );
}
