import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  DEFAULT_MODEL,
  PATHFINDER_SYSTEM_PROMPT,
  createLovableAiGatewayProvider,
} from "@/lib/ai-gateway";

type Body = {
  messages?: UIMessage[];
  context?: {
    classLevel?: string;
    sector?: string;
    specialization?: string;
  };
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const { messages, context } = (await request.json()) as Body;
        if (!Array.isArray(messages)) return new Response("Messages required", { status: 400 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const provider = createLovableAiGatewayProvider(key);
        const model = provider(DEFAULT_MODEL);

        const ctxLine = context
          ? `\n\nSTUDENT CONTEXT (always tailor to this):
- Current level: ${context.classLevel ?? "unknown"}
- Chosen sector: ${context.sector ?? "unknown"}
- Chosen specialization: ${context.specialization ?? "unknown"}
Reference their specific field and level in every answer. If they ask about time, recalculate routine. If they sound confused, simplify automatically.`
          : "";

        const result = streamText({
          model,
          system: PATHFINDER_SYSTEM_PROMPT + ctxLine,
          messages: await convertToModelMessages(messages),
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
