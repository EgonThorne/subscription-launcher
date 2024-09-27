import PlanSummary from "@/components/subscription/plan-summary";

import { auth } from "@/lib/auth";

export default async function SubscriptionPage() {
  const session = await auth();
  // console.log(session);
  //积分扣除切入点

  if (!session || !session.user) {
    return <div>请先登录</div>;
  }

  // 添加这些控制台日志
  // console.log("nextResetDate type:", typeof session.user.nextResetDate);
  // console.log("nextResetDate value:", session.user.nextResetDate);

  return (
    <div className="container mx-auto p-4">
      <PlanSummary
        planType={session.user.planType}
        credits={session.user.credits}
        nextResetDate={session.user.nextResetDate}
      />
    </div>
  );
}
