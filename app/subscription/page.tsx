import PlanSummary from "@/components/subscription/plan-summary";

import { auth } from "@/lib/auth";

export default async function SubscriptionPage() {
  const session = await auth();
  console.log(session);

  if (!session?.user) {
    throw new Error("无法获取用户信息");
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
