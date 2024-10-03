import { Stripe } from "stripe";
import { prisma } from "./db";
import { PlanType } from "@prisma/client";

export const findCheckoutSession = async (sessionId: string) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
      typescript: true,
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};

//执行用户支付完成后事件
export async function fulfillCheckout(
  checkoutSession: Stripe.Checkout.Session
) {
  try {
    if (checkoutSession.payment_status === "paid") {
      const userId = checkoutSession.client_reference_id;

      console.log("userId", userId);

      if (!userId) {
        throw new Error("用户ID不存在");
      }

      await prisma.userPlan.update({
        where: { userId: userId },
        data: {
          planType: PlanType.PREMIUM,
          credits: 1200,
          subDate: new Date(),
          nextResetDate: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          serviceStatus: true,
        },
      });
    } else {
      console.log(`用户 的支付未完成，状态: ${checkoutSession.payment_status}`);
    }
  } catch (e) {
    console.error("处理支付时出错:", e);
  }
}

// export async function handleSubscriptionDeleted(
//   subscription: Stripe.Subscription
// ) {
//   console.log(`Handling deleted subscription ${subscription.id}`);
//   // 实现订阅删除的逻辑
//   // 例如：撤销用户的访问权限，更新用户状态等
// }

// export async function handleInvoicePaid(invoice: Stripe.Invoice) {
//   console.log(`Handling paid invoice ${invoice.id}`);
//   // 实现发票支付成功的逻辑
//   // 例如：更新用户的支付状态，延长订阅期限等
// }

// export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
//   console.log(`Handling failed invoice payment ${invoice.id}`);
//   // 实现发票支付失败的逻辑
//   // 例如：通知用户，尝试其他支付方式，或暂停服务等
// }
