import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// 确保环境变量存在
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

// 初始化Stripe客户端
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  //   apiVersion: "2023-10-16", // 指定Stripe API版本
});

export async function POST(request: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // 提供要销售的产品的确切Price ID
          price: "price_1Q50xwBWeYCnCgclmgF1YZei",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${request.nextUrl.origin}/?success=true`,
      cancel_url: `${request.nextUrl.origin}/?canceled=true`,
      automatic_tax: { enabled: true },
    });

    // 重定向到Stripe Checkout页面
    return NextResponse.redirect(session.url as string, 303);
  } catch (error) {
    // 错误处理
    if (error instanceof Stripe.errors.StripeError) {
      // Stripe特定错误
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    } else {
      // 其他错误
      console.error("An unexpected error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
