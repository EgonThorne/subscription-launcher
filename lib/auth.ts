import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { PlanType } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async signIn({ user }) {
      if (!user || !user.id) {
        console.error("User or user ID is undefined");
        return false; // 阻止登录
      }

      try {
        const UserPlan = await prisma.userPlan.findUnique({
          where: { userId: user.id },
        });

        if (!UserPlan) {
          await prisma.userPlan.create({
            data: {
              userId: user.id,
              planType: PlanType.FREE,
              credits: 200,
              subDate: new Date(),
              nextResetDate: new Date(
                new Date().setMonth(new Date().getMonth() + 1)
              ),
              serviceStatus: true,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        // 根据错误类型决定是否允许登录
        return false; // 或者 return true，取决于您的错误处理策略
      }
    },
  },
});

// callbacks: {
//   async jwt({ token, user }) {
//     if (user) {
//       // token.id = user.id;
//       console.log("Initial JWT:", JSON.stringify(token, null, 2));
//     }
//     return token;
//   },

//   session({ session, token }) {
//     if (token) {
//       // session.user.id = token.id;
//     }

//     return session;
//   },

//   //登录时检查用户是否存在
//   async signIn({ user }) {
//     // 确保 user.id 是 string 类型
//     if (!user.id) {
//       throw new Error("User ID is undefined");
//     }

//     // 检查用户是否已经有 UserPlan
//     const existingUserPlan = await prisma.userPlan.findUnique({
//       where: { userId: user.id },
//     });

//     // 如果没有 UserPlan，则创建一个默认的 UserPlan
//     if (!existingUserPlan) {
//       await prisma.userPlan.create({
//         data: {
//           userId: user.id,
//           planType: PlanType.FREE,
//           credits: 200,
//           //下次重置日期
//           nextResetDate: new Date(
//             new Date().setMonth(new Date().getMonth() + 1)
//           ), // 下个月的同一天
//           //是否服务活跃
//           isServiceActive: true,
//           //最后使用日期
//           lastUsageDate: new Date(),
//         },
//       });
//     } else {
//       // 检查是否需要重置积分
//       const now = new Date();
//       if (now >= existingUserPlan.nextResetDate) {
//         await prisma.userPlan.update({
//           where: { userId: user.id },
//           data: {
//             credits: 200,
//             nextResetDate: new Date(now.setMonth(now.getMonth() + 1)), // 下个月的同一天
//             isServiceActive: true,
//             lastResetDate: now,
//           },
//         });
//       } else if (existingUserPlan.credits === 0) {
//         // 如果积分为0，则不再提供服务
//         await prisma.userPlan.update({
//           where: { userId: user.id },
//           data: {
//             isServiceActive: false,
//           },
//         });
//       }
//     }

//     return true;
//   },
// },
