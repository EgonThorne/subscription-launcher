import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, StreamData } from "ai";

const openai = createOpenAI({
  compatibility: "compatible",
  baseURL: "https://openkey.cloud/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

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
