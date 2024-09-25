import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { PlanType } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },

    async signIn({ user }) {
      // 确保 user.id 是 string 类型
      if (!user.id) {
        throw new Error("User ID is undefined");
      }

      // 检查用户是否已经有 UserPlan
      const existingUserPlan = await prisma.userPlan.findUnique({
        where: { userId: user.id },
      });

      // 如果没有 UserPlan，则创建一个默认的 UserPlan
      if (!existingUserPlan) {
        await prisma.userPlan.create({
          data: {
            userId: user.id,
            planType: PlanType.FREE,
            credits: 200,
            //下次重置日期
            nextResetDate: new Date(
              new Date().setMonth(new Date().getMonth() + 1)
            ), // 下个月的同一天
            //是否服务活跃
            isServiceActive: true,
            //最后使用日期
            lastUsageDate: new Date(),
          },
        });
      } else {
        // 检查是否需要重置积分
        const now = new Date();
        if (now >= existingUserPlan.nextResetDate) {
          await prisma.userPlan.update({
            where: { userId: user.id },
            data: {
              credits: 200,
              nextResetDate: new Date(now.setMonth(now.getMonth() + 1)), // 下个月的同一天
              isServiceActive: true,
              lastResetDate: now,
            },
          });
        } else if (existingUserPlan.credits === 0) {
          // 如果积分为0，则不再提供服务
          await prisma.userPlan.update({
            where: { userId: user.id },
            data: {
              isServiceActive: false,
            },
          });
        }
      }

      return true;
    },
  },
});
