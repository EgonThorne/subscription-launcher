import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Hello world</h1>
        <Link href="/login">Go Login Page</Link>
        {/* 之后将这个登录链接的按钮放到Header中 */}
      </div>
    </>
  );
}
