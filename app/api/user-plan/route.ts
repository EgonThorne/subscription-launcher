import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { UserPlan } from "@prisma/client";
import { auth } from "@/lib/auth";

type UserPlanResponse = Pick<
  UserPlan,
  "credits" | "planType" | "nextResetDate"
>;

export async function GET(): Promise<NextResponse<UserPlanResponse | null>> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(null);
  }

  const userPlan = await prisma.userPlan.findUnique({
    where: { userId },
    select: {
      credits: true,
      planType: true,
      nextResetDate: true,
    },
  });

  return NextResponse.json(userPlan);
}
