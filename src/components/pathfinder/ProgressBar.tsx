const STEPS = ["Welcome", "Your Level", "Sectors", "Specializations", "Roadmap"];

export function ProgressBar({ step }: { step: number }) {
  return (
    <div className="no-print sticky top-0 z-30 w-full border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2 font-display text-sm font-semibold">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald" />
          PathfinderAI
        </div>
        <div className="mx-auto flex flex-1 items-center gap-1.5">
          {STEPS.map((label, i) => {
            const active = i <= step;
            return (
              <div key={label} className="flex flex-1 items-center gap-1.5">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    active ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div className="hidden text-xs text-muted-foreground sm:block">
          Step {Math.min(step + 1, STEPS.length)} / {STEPS.length}
        </div>
      </div>
    </div>
  );
}
