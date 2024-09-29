# AI Chat Subscription

**Important Note: This project is a demo version. Its features and logic may be incomplete and it is intended for learning and reference purposes only.**

AI Chat Subscription is an intelligent chat subscription system built with Next.js, Prisma, and PostgreSQL. The project provides user authentication, chat functionality, and subscription plan management.

## Features

- User authentication and authorization (using NextAuth.js)
- Intelligent chat functionality integrated with OpenAI API
- User subscription plan management (Free and Premium plans)
- Credit system with automatic reset mechanism
- Responsive UI design

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication solution
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [OpenAI API](https://openai.com/blog/openai-api) - AI chat functionality

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL database
- GitHub OAuth application (for authentication)
- OpenAI API key

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/ai-chat-subscription.git
   cd ai-chat-subscription
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Set up environment variables:
   Copy the `.env.example` file and rename it to `.env`, then fill in all necessary environment variables.
4. Set up the database:

   ```
   npx prisma migrate dev
   ```
5. Run the development server:

   ```
   npm run dev
   ```

You can now access the application at `http://localhost:3000`.

## Project Structure

- `/app` - Next.js 13+ app router
- `/components` - React components
- `/lib` - Utility functions and configuration files
- `/prisma` - Prisma schema and migration files

## Deployment

This project can be deployed to any platform that supports Next.js, such as Vercel or Netlify. Ensure all necessary environment variables are set in the deployment environment.

## Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

````

This English version of the README maintains all the essential information while making it accessible to a broader, international audience. It clearly states at the top that this is a demo project intended for learning purposes, which helps set appropriate expectations for other developers who might come across this project.
````
