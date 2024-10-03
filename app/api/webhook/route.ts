import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import {
  findCheckoutSession,
  fulfillCheckout,
  // handleSubscriptionDeleted,
  // handleInvoicePaid,
  // handleInvoicePaymentFailed,
} from "@/lib/stripe";

// 初始化 Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

// Stripe webhook 密钥
const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err: unknown) {
    console.error(
      `Webhook signature verification failed. ${(err as Error).message}`
    );
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    );
  }

  // 处理Stripe事件
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        const session = await findCheckoutSession(stripeObject.id);
        if (session) {
          await fulfillCheckout(session);
        }

        // const customer = session?.customer;
        // const priceId = session?.line_items?.data[0].price?.id;
        // const userId = stripeObject.client_reference_id;

        // console.log("customer", customer);
        // console.log("priceId", priceId);
        // console.log("userId", userId);

        // console.log("会话数据", session);
        //访问客户的详细付款信息，并立即在下方调用数据进行事件执行。
        // const checkoutSession = await findCheckoutSession(event.data.object.id);
        // if (checkoutSession) {
        //   await fulfillCheckout(checkoutSession);
        // }
        break;
      }

      // 用户未完成交易，不执行任何操作
      // case "checkout.session.expired":
      //   break;

      // 客户可能已更改计划（更高或更低的计划、即将取消等...）
      // 您无需在此处执行任何操作，因为 Stripe 会在“customer.subscription.deleted”事件中通知我们订阅何时永久取消（在结算周期结束时）
      // 您可以更新用户数据以显示“即将取消”徽章
      // case "customer.subscription.updated":
      //   break;

      // 客户订阅已停止
      // ❌ 撤销对产品的访问权限
      // case "customer.subscription.deleted":
      //   const subscription = event.data.object;
      //   await handleSubscriptionDeleted(subscription);
      //   break;

      // 客户刚刚支付了发票（例如，订阅的定期付款）
      // ✅ 授予产品访问权限
      // case "invoice.paid":
      //   const invoicePaid = event.data.object;
      //   await handleInvoicePaid(invoicePaid);
      //   break;

      // 付款失败（例如，客户没有有效的付款方式）
      // ❌ 撤销对产品的访问权限
      // ⏳ 或等待客户付款（更友好）：
      // - Stripe 将自动向客户发送电子邮件（智能重试）
      // - 当所有重试都已完成且订阅已过期时，我们将收到“customer.subscription.deleted”
      // case "invoice.payment_failed":
      //   const invoice = event.data.object;
      //   await handleInvoicePaymentFailed(invoice);
      //   break;

      // 未处理的事件类型
      default:
      // console.log(`Unhandled event type ${event.type}.`);
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error processing webhook";
    console.error(`Error processing webhook: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
