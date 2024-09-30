import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, StreamData } from "ai";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

async function update() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    await prisma.userPlan.update({
      where: { userId: userId },
      data: { credits: { decrement: 1 } },
    });
  }
}

const openai = createOpenAI({
  compatibility: "compatible",
  baseURL: "https://openkey.cloud/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  await update();

  const data = new StreamData();
  data.append({ test: "value" });

  const result = await streamText({
    model: openai("gpt-4o-mini-2024-07-18"),
    messages: convertToCoreMessages(messages),
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
