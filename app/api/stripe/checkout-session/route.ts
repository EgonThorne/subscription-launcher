import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";

// 确保环境变量存在
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

// 初始化Stripe客户端
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1Q50xwBWeYCnCgclmgF1YZei",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.nextUrl.origin}/sub?success=true`,
      cancel_url: `${request.nextUrl.origin}/pricing?canceled=true`,
      automatic_tax: { enabled: true },
      client_reference_id: userId,
    });

    return NextResponse.redirect(checkoutSession.url as string, 303);
  } catch (error) {
    // 错误处理
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    } else {
      console.error("An unexpected error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
