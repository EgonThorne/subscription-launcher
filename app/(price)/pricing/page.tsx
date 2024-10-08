"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useUserPlan } from "@/lib/hooks/useUserPlan";

export default function Pricing() {
  const { data: session } = useSession();
  const { userPlan } = useUserPlan();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="max-w-screen h-[90vh] flex justify-center items-center">
      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>FREE</h2>
        <p>Free forever</p>
        {session?.user ? (
          userPlan?.planType === "FREE" ? (
            <Button variant="outline" disabled>
              Current Plan
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Included
            </Button>
          )
        ) : (
          <Link href="/login?redirect=/pricing">
            <Button variant="outline">Choose Free</Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>PRO</h2>
        <p>For small teams</p>

        {session?.user ? (
          userPlan?.planType === "PREMIUM" ? (
            <Button variant="outline" disabled>
              Current Plan
            </Button>
          ) : (
            <form action="/api/stripe/checkout-session" method="POST">
              <section>
                <Button variant="outline" type="submit" role="link">
                  Upgrade to Pro
                </Button>
              </section>
            </form>
          )
        ) : (
          <Link href="/login?redirect=/pricing">
            <Button variant="outline">Choose Pro</Button>
          </Link>
        )}
      </div>

      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>ENTERPRISE</h2>
        <p></p>
        <Button variant="outline">ENTERPRISE</Button>
      </div>
    </div>
  );
}
