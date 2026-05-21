import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles } from "lucide-react";

export function FollowUpChat({
  context,
}: {
  context: { classLevel: string; sector: string; specialization: string };
}) {
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const transport = new DefaultChatTransport({
    api: "/api/chat",
    body: { context },
  });

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const busy = status === "submitted" || status === "streaming";

  return (
    <div className="no-print glass mt-6 flex flex-col rounded-2xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm font-semibold">
        <Sparkles className="h-4 w-4 text-emerald" />
        Ask PathfinderAI anything about your roadmap
      </div>

      <div className="max-h-96 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Try asking:</p>
            <ul className="list-disc pl-5">
              <li>"I can only study 1 hour a day — rewrite my routine"</li>
              <li>"Which book should I start with this week?"</li>
              <li>"I'm weak in math, how do I catch up?"</li>
              <li>"Explain Phase 2 in simpler words"</li>
            </ul>
          </div>
        )}

        {(messages as UIMessage[]).map((m) => {
          const text = m.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("");
          return (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm border border-border bg-background/60"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}

        {busy && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald" />
            PathfinderAI is thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          const text = input.trim();
          if (!text || busy) return;
          setInput("");
          sendMessage({ text });
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up question…"
          className="flex-1 rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none ring-primary focus:ring-2"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          <Send className="h-4 w-4" /> Send
        </button>
      </form>
    </div>
  );
}
