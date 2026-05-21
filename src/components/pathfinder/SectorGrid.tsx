import { Star, TrendingUp } from "lucide-react";

export type Sector = {
  name: string;
  description: string;
  demand: number;
  salaryRange: string;
  difficulty: "Moderate" | "Hard" | "Very Hard";
  whySuitsYou: string;
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= n ? "fill-emerald text-emerald" : "text-muted-foreground/40"}`}
        />
      ))}
    </div>
  );
}

const diffColor: Record<string, string> = {
  Moderate: "bg-emerald/20 text-emerald",
  Hard: "bg-amber-500/20 text-amber-400",
  "Very Hard": "bg-rose-500/20 text-rose-400",
};

export function SectorGrid({
  sectors,
  onPick,
}: {
  sectors: Sector[];
  onPick: (s: Sector) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sectors.map((s) => (
        <button
          key={s.name}
          onClick={() => onPick(s)}
          className="card-hover group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold">{s.name}</h3>
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${diffColor[s.difficulty]}`}>
              {s.difficulty}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{s.description}</p>
          <div className="mt-2 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5"><Stars n={s.demand} /><span className="text-muted-foreground">demand</span></div>
            <div className="flex items-center gap-1 text-emerald"><TrendingUp className="h-3 w-3" />{s.salaryRange}</div>
          </div>
          <div className="mt-1 rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs text-primary">
            Why this suits you: {s.whySuitsYou}
          </div>
        </button>
      ))}
    </div>
  );
}
