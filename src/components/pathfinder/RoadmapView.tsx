import type { Roadmap } from "@/lib/pathfinder.functions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertTriangle, BookOpen, Calendar, CheckCircle2, Compass, Hammer, Target, Trophy, Users } from "lucide-react";

function Section({
  icon,
  value,
  title,
  children,
}: {
  icon: React.ReactNode;
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AccordionItem value={value} className="border-border">
      <AccordionTrigger className="text-left hover:no-underline">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">{icon}</span>
          <span className="font-display text-base font-semibold">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pl-11 text-sm leading-relaxed text-muted-foreground">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

export function RoadmapView({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5">
        <div className="text-xs uppercase tracking-wider text-emerald">Acknowledgment</div>
        <p className="mt-1 text-base">{roadmap.acknowledgment}</p>
      </div>

      <Accordion type="multiple" defaultValue={["reality", "phases"]} className="space-y-2">
        <div className="glass rounded-2xl px-4">
          <Section icon={<Compass className="h-4 w-4" />} value="reality" title="A) Honest Reality Check">
            <div className="space-y-3">
              <p><b className="text-foreground">From the inside: </b>{roadmap.realityCheck.insideView}</p>
              <p><b className="text-foreground">Common misconceptions: </b>{roadmap.realityCheck.commonMisconceptions}</p>
              <p><b className="text-foreground">Top 10% vs average: </b>{roadmap.realityCheck.top10PercentVsAverage}</p>
              <p><b className="text-foreground">Time to become genuinely good: </b>{roadmap.realityCheck.timeToGood}</p>
            </div>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<Target className="h-4 w-4" />} value="phases" title="B) Phase-by-Phase Learning Path">
            <div className="space-y-4">
              {roadmap.phases.map((p, i) => (
                <div key={i} className="rounded-xl border border-border bg-background/40 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-base font-semibold text-foreground">{p.name}</h4>
                    <span className="text-xs text-emerald">{p.duration}</span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {p.goals.map((g, j) => <li key={j}>{g}</li>)}
                  </ul>
                  <p className="mt-2 text-xs"><b className="text-foreground">Success looks like: </b>{p.successLooksLike}</p>
                  <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                    <div><b className="text-foreground">YouTube:</b> {p.resources.youtube.join(", ")}</div>
                    <div><b className="text-foreground">Free platforms:</b> {p.resources.freePlatforms.join(", ")}</div>
                    <div><b className="text-foreground">Practice:</b> {p.resources.practicePlatforms.join(", ")}</div>
                    {p.resources.paidIfWorthIt.length > 0 && (
                      <div><b className="text-foreground">Paid (if worth it):</b> {p.resources.paidIfWorthIt.join(", ")}</div>
                    )}
                  </div>
                  <div className="mt-2 text-xs">
                    <b className="text-foreground">Books:</b>
                    <ul className="mt-1 list-disc pl-5">
                      {p.resources.books.map((b, k) => (
                        <li key={k}>
                          <span className="text-foreground">{b.title}</span> — {b.author}. <span className="italic">{b.why}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<Calendar className="h-4 w-4" />} value="routine" title="C/D) Realistic Weekly Routine">
            <p className="mb-3 text-xs italic">{roadmap.weeklyRoutine.assumption}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-left text-foreground">
                    <th className="py-2 pr-3">Day</th>
                    <th className="py-2">Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {roadmap.weeklyRoutine.days.map((d) => (
                    <tr key={d.day} className="border-b border-border/50 align-top">
                      <td className="py-2 pr-3 font-semibold text-emerald">{d.day}</td>
                      <td className="py-2">
                        {d.blocks.map((b, i) => (
                          <div key={i}>
                            <span className="text-foreground">{b.time}</span> — {b.activity}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<CheckCircle2 className="h-4 w-4" />} value="milestones" title="E) Milestones & Checkpoints">
            <div className="grid gap-2 sm:grid-cols-2">
              <div><b className="text-foreground">Month 1:</b> {roadmap.milestones.month1}</div>
              <div><b className="text-foreground">Month 3:</b> {roadmap.milestones.month3}</div>
              <div><b className="text-foreground">Month 6:</b> {roadmap.milestones.month6}</div>
              <div><b className="text-foreground">Year 1:</b> {roadmap.milestones.year1}</div>
            </div>
            <p className="mt-3"><b className="text-foreground">Self-assess honestly: </b>{roadmap.milestones.selfAssessment}</p>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<Hammer className="h-4 w-4" />} value="projects" title="F) Projects to Build">
            <div className="space-y-3">
              {roadmap.projects.map((p, i) => (
                <div key={i} className="rounded-xl border border-border bg-background/40 p-3">
                  <div className="font-semibold text-foreground">{i + 1}. {p.title}</div>
                  <p className="mt-1"><b className="text-foreground">Build: </b>{p.what}</p>
                  <p><b className="text-foreground">Why: </b>{p.why}</p>
                  <p><b className="text-foreground">Skills shown: </b>{p.skillsShown}</p>
                  <p><b className="text-foreground">Where to host: </b>{p.whereToHost}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<Users className="h-4 w-4" />} value="examples" title="G) Real Examples">
            <div className="space-y-3">
              {roadmap.realExamples.map((e, i) => (
                <div key={i} className="rounded-xl border border-border bg-background/40 p-3">
                  <div className="font-semibold text-foreground">{e.name}</div>
                  <p><b className="text-foreground">Background: </b>{e.background}</p>
                  <p><b className="text-foreground">What they did: </b>{e.whatTheyDid}</p>
                  <p><b className="text-foreground">Where they are now: </b>{e.whereTheyAreNow}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<AlertTriangle className="h-4 w-4" />} value="mistakes" title="H) Mistakes to Avoid">
            <ol className="list-decimal space-y-1 pl-5">
              {roadmap.mistakesToAvoid.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </Section>
        </div>

        <div className="glass rounded-2xl px-4">
          <Section icon={<Trophy className="h-4 w-4" />} value="good" title="I) What Good Looks Like at Your Level">
            <p>{roadmap.whatGoodLooksLike}</p>
          </Section>
        </div>
      </Accordion>

      <div className="rounded-2xl border border-emerald/40 bg-emerald/10 p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald">
          <BookOpen className="h-4 w-4" /> Do this today
        </div>
        <p className="mt-1 text-sm">{roadmap.nextStepToday}</p>
      </div>
    </div>
  );
}
