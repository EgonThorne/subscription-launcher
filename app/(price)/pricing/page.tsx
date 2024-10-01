"use client";

import React, { useEffect } from "react";
// import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
// import { auth } from "@/lib/auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Pricing() {
  // const session = auth();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
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
      {/* <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
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
      </div> */}

      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>PRO</h2>
        <p>For small teams</p>

        <form action="/api/stripe/checkout-session" method="POST">
          <section>
            <Button variant="outline" type="submit" role="link">
              Upgrade to Pro
            </Button>
          </section>
        </form>
      </div>

      <div className="flex flex-col justify-between items-center border py-3 w-1/5 h-1/2">
        <h2>ENTERPRISE</h2>
        <p></p>
        <Button variant="outline">ENTERPRISE</Button>
      </div>
    </div>
  );
}
