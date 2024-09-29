import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import authConfig from "@/auth.config";
import { PlanType } from "@prisma/client";

import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      userId: string;
      planType: PlanType;
      credits: number;
      lastResetDate: Date | null;
      nextResetDate: Date;
      subscriptionDate: Date | null;
      isServiceActive: boolean;
      lastUsageDate: Date | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    userId: string;
    planType: PlanType;
    credits: number;
    lastResetDate: Date | null;
    nextResetDate: Date;
    subscriptionDate: Date | null;
    isServiceActive: boolean;
    lastUsageDate: Date | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userPlan = await prisma.userPlan.findUnique({
          where: { userId: user.id },
        });
        if (userPlan) {
          token.id = userPlan.id;
          token.userId = userPlan.userId;
          token.planType = userPlan.planType;
          token.credits = userPlan.credits;
          token.lastResetDate = userPlan.lastResetDate;
          token.nextResetDate = userPlan.nextResetDate;
          token.subscriptionDate = userPlan.subscriptionDate;
          token.isServiceActive = userPlan.isServiceActive;
          token.lastUsageDate = userPlan.lastUsageDate;
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.userId = token.userId;
      session.user.planType = token.planType;
      session.user.credits = token.credits;
      session.user.lastResetDate = token.lastResetDate;
      session.user.nextResetDate = token.nextResetDate;
      session.user.subscriptionDate = token.subscriptionDate;
      session.user.isServiceActive = token.isServiceActive;
      session.user.lastUsageDate = token.lastUsageDate;

      return session;
    },

    //登录时检查用户是否存在
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
