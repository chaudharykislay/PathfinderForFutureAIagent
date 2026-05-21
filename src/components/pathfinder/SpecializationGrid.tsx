import { Star } from "lucide-react";

export type Spec = {
  name: string;
  whatTheyDo: string;
  growth: number;
  fresherPackage: string;
  seniorPackage: string;
  globalDemand: string;
  recommendedIfYouLike: string;
};

const demandColor: Record<string, string> = {
  Low: "bg-muted text-muted-foreground",
  Medium: "bg-primary/20 text-primary",
  High: "bg-emerald/20 text-emerald",
  "Very High": "bg-emerald text-emerald-foreground",
};

export function SpecializationGrid({
  items,
  onPick,
}: {
  items: Spec[];
  onPick: (s: Spec) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((s) => (
        <button
          key={s.name}
          onClick={() => onPick(s)}
          className="card-hover flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 text-left"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold">{s.name}</h3>
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${demandColor[s.globalDemand]}`}>
              {s.globalDemand}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{s.whatTheyDo}</p>
          <div className="flex items-center gap-1.5 text-xs">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className={`h-3 w-3 ${i <= s.growth ? "fill-emerald text-emerald" : "text-muted-foreground/40"}`} />
            ))}
            <span className="text-muted-foreground">growth</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-muted/40 px-2 py-1">
              <div className="text-muted-foreground">Fresher</div>
              <div className="font-semibold">{s.fresherPackage}</div>
            </div>
            <div className="rounded-lg bg-muted/40 px-2 py-1">
              <div className="text-muted-foreground">Senior</div>
              <div className="font-semibold text-emerald">{s.seniorPackage}</div>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-xs text-primary">
            Recommended if you like: {s.recommendedIfYouLike}
          </div>
        </button>
      ))}
    </div>
  );
}
