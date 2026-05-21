import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export function AgentBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/30">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="glass max-w-2xl rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function StudentBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-xl rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20">
        {children}
      </div>
    </div>
  );
}
