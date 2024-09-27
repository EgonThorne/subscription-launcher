import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlanType } from "@prisma/client";

interface PlanSummaryProps {
  planType: PlanType;
  credits: number;
  nextResetDate: Date;
}

const PlanSummary: React.FC<PlanSummaryProps> = ({
  planType,
  credits,
  nextResetDate,
}) => {
  const totalCredits = 200; // 假设免费计划总是有200积分
  const pricePerMonth = planType === PlanType.FREE ? 0 : 10; // 假设高级计划每月10元

  const resetDate = new Date(nextResetDate);

  const formattedDate = resetDate.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">计划摘要</h2>
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
          {planType === PlanType.FREE ? "免费计划" : "高级计划"}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-medium">还剩{credits}积分 </span>
          <span className="text-sm text-gray-500">{totalCredits}</span>
        </div>
        <Progress value={(credits / totalCredits) * 100} className="h-2" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">每月价格</p>
          <p className="font-medium">${pricePerMonth}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">包含积分</p>
          <p className="font-medium">{totalCredits}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">更新日期</p>
          <p className="font-medium">{formattedDate}</p>
        </div>
      </div>

      <Button className="w-full">升级</Button>
    </div>
  );
};

export default PlanSummary;
