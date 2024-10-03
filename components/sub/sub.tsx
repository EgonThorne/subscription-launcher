"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlanType } from "@prisma/client";
import { useUserPlan } from "@/lib/hooks/useUserPlan";

const SubPlan: React.FC = () => {
  const { userPlan, isLoading, isError } = useUserPlan();

  if (isLoading) return <div>加载中...</div>;
  if (isError) return <div>加载出错</div>;
  if (!userPlan) return <div>未找到用户计划</div>;

  const { planType, credits, nextResetDate } = userPlan;
  const totalCredits = planType === PlanType.FREE ? 200 : 1200; // 假设免费计划总是有200积分
  const pricePerMonth = planType === PlanType.FREE ? 0 : 10; // 假设高级计划每月10元

  const resetDate = new Date(nextResetDate);

  const formattedDate = resetDate.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="flex space-x-5">
      <div className="bg-white border w-[40vw] h-[35vh] rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Program Summary</h2>
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {planType === PlanType.FREE ? "Free Plan" : "Premium Plan"}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium">
              Remaining {credits} credits
            </span>
            {/* <span className="text-sm text-gray-500">{totalCredits}</span> */}
          </div>
          <Progress value={(credits / totalCredits) * 100} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Price per month</p>
            <p className="font-medium">${pricePerMonth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Included credits</p>
            <p className="font-medium">{totalCredits}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Update date</p>
            <p className="font-medium">{formattedDate}</p>
          </div>
        </div>

        <Button className="w-full">Upgrade</Button>
      </div>
      <div className="bg-white border w-[40vw] h-[80vh] rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold">Premium</h2>
      </div>
    </div>
  );
};

export { SubPlan };
