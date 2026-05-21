import { Button } from "@/components/ui/button";

export const CLASS_OPTIONS = [
  { id: "middle", label: "Class 6, 7, 8", sub: "Middle School" },
  { id: "secondary", label: "Class 9, 10", sub: "Secondary" },
  { id: "11-12-sci", label: "Class 11, 12 — Science", sub: "PCM / PCB" },
  { id: "11-12-com", label: "Class 11, 12 — Commerce", sub: "Accounts / Economics" },
  { id: "11-12-arts", label: "Class 11, 12 — Arts/Humanities", sub: "Liberal Arts" },
  { id: "ug-12", label: "Undergraduate — 1st/2nd Year", sub: "Early college" },
  { id: "ug-34", label: "Undergraduate — 3rd/Final Year", sub: "Pre-placement" },
  { id: "pg", label: "Postgraduate", sub: "Masters / Research" },
  { id: "gap", label: "Dropped out / Gap Year", sub: "Re-routing" },
  { id: "working", label: "Working professional", sub: "Exploring change" },
];

export function ClassPicker({ onPick }: { onPick: (label: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {CLASS_OPTIONS.map((opt) => (
        <Button
          key={opt.id}
          variant="outline"
          onClick={() => onPick(opt.label)}
          className="card-hover h-auto justify-start whitespace-normal rounded-xl border-border bg-card px-4 py-4 text-left"
        >
          <div>
            <div className="font-display text-base font-semibold">{opt.label}</div>
            <div className="text-xs font-normal text-muted-foreground">{opt.sub}</div>
          </div>
        </Button>
      ))}
    </div>
  );
}
