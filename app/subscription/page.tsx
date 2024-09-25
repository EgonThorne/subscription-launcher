import PlanSummary from "@/components/subscription/plan-summary";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export default async function SubscriptionPage() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>请先登录</div>;
  }

  const userPlan = await prisma.userPlan.findUnique({
    where: { userId: session.user.id },
  });

  if (!userPlan) {
    return <div>未找到用户计划信息</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <PlanSummary
        planType={userPlan.planType}
        credits={userPlan.credits}
        nextResetDate={userPlan.nextResetDate}
      />
    </div>
  );
}
