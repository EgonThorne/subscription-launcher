import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function PricingPage() {
  const session = await auth();

  return (
    <div className="max-w-screen h-[90vh] flex justify-center items-center">
      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>FREE</h2>
        <p>Free forever</p>
        {session?.user ? (
          <Button variant="outline" disabled>
            Current Plan
          </Button>
        ) : (
          <Link href="/login?redirect=/pricing">
            <Button variant="outline">Choose Free</Button>
          </Link>
        )}
      </div>

      {/* 付费计划 */}
      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>PRO</h2>
        <p>For small teams</p>
        <Button variant="outline">Upgrade to Pro</Button>
      </div>

      {/* 备选方案 */}
      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>ENTERPRISE</h2>
        <p></p>
        <Button variant="outline">ENTERPRISE</Button>
      </div>
    </div>
  );
}
