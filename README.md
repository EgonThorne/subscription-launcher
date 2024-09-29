# AI Chat Subscription

AI Chat Subscription 是一个基于 Next.js、Prisma 和 PostgreSQL 构建的智能聊天订阅系统。该项目提供了用户认证、聊天功能和订阅计划管理等功能。

## 功能特点

- 用户认证和授权（使用 NextAuth.js）
- 与 OpenAI API 集成的智能聊天功能
- 用户订阅计划管理（免费和高级计划）
- 积分系统和自动重置机制
- 响应式 UI 设计

## 技术栈

- [Next.js](https://nextjs.org/) - React 框架
- [Prisma](https://www.prisma.io/) - 数据库 ORM
- [PostgreSQL](https://www.postgresql.org/) - 数据库
- [NextAuth.js](https://next-auth.js.org/) - 认证解决方案
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [OpenAI API](https://openai.com/blog/openai-api) - AI 聊天功能

## 开始使用

### 前提条件

- Node.js (v14+)
- PostgreSQL 数据库
- GitHub OAuth 应用（用于认证）
- OpenAI API 密钥

### 安装

1. 克隆仓库：

   ```
   git clone https://github.com/your-username/ai-chat-subscription.git
   cd ai-chat-subscription
   ```
2. 安装依赖：

   ```
   npm install
   ```
3. 设置环境变量：
   复制 `.env.example` 文件并重命名为 `.env`，然后填写所有必要的环境变量。
4. 设置数据库：

   ```
   npx prisma migrate dev
   ```
5. 运行开发服务器：

   ```
   npm run dev
   ```

现在，您可以在 `http://localhost:3000` 访问应用程序。

## 项目结构

- `/app` - Next.js 13+ 应用路由
- `/components` - React 组件
- `/lib` - 工具函数和配置文件
- `/prisma` - Prisma schema 和迁移文件

## 部署

本项目可以部署到任何支持 Next.js 的平台，如 Vercel 或 Netlify。确保在部署环境中设置所有必要的环境变量。

## 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何开始。

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE.md](LICENSE.md) 文件了解详情。
