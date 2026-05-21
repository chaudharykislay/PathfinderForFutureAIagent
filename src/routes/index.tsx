import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, Download, RotateCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/pathfinder/ProgressBar";
import { AgentBubble, StudentBubble } from "@/components/pathfinder/AgentBubble";
import { ClassPicker } from "@/components/pathfinder/ClassPicker";
import { SectorGrid, type Sector } from "@/components/pathfinder/SectorGrid";
import { SpecializationGrid, type Spec } from "@/components/pathfinder/SpecializationGrid";
import { RoadmapView } from "@/components/pathfinder/RoadmapView";
import { FollowUpChat } from "@/components/pathfinder/FollowUpChat";
import { getSectors, getSpecializations, getRoadmap, type Roadmap } from "@/lib/pathfinder.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathfinderAI — Your Career Intelligence Agent" },
      {
        name: "description",
        content:
          "Not a quiz. Not a test. A real conversation about your future — personalized career roadmaps for students by an AI mentor.",
      },
      { property: "og:title", content: "PathfinderAI — Your Career Intelligence Agent" },
      { property: "og:description", content: "A personalized AI mentor that builds your career roadmap." },
    ],
  }),
  component: Index,
});

type Step = 0 | 1 | 2 | 3 | 4;

type SectorsResp = Awaited<ReturnType<typeof getSectors>>;
type SpecsResp = Awaited<ReturnType<typeof getSpecializations>>;

function Index() {
  const fetchSectors = useServerFn(getSectors);
  const fetchSpecs = useServerFn(getSpecializations);
  const fetchRoadmap = useServerFn(getRoadmap);

  const [step, setStep] = useState<Step>(0);
  const [classLevel, setClassLevel] = useState<string>("");
  const [sectorsResp, setSectorsResp] = useState<SectorsResp | null>(null);
  const [sector, setSector] = useState<Sector | null>(null);
  const [specsResp, setSpecsResp] = useState<SpecsResp | null>(null);
  const [spec, setSpec] = useState<Spec | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStep(0);
    setClassLevel("");
    setSectorsResp(null);
    setSector(null);
    setSpecsResp(null);
    setSpec(null);
    setRoadmap(null);
    setError(null);
  };

  const handleClass = async (label: string) => {
    setClassLevel(label);
    setStep(2);
    setLoading("Reading the market for your level…");
    setError(null);
    try {
      const data = await fetchSectors({ data: { classLevel: label } });
      setSectorsResp(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load sectors");
    } finally {
      setLoading(null);
    }
  };

  const handleSector = async (s: Sector) => {
    setSector(s);
    setStep(3);
    setLoading("Mapping specializations inside this sector…");
    setError(null);
    try {
      const data = await fetchSpecs({ data: { classLevel, sector: s.name } });
      setSpecsResp(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load specializations");
    } finally {
      setLoading(null);
    }
  };

  const handleSpec = async (s: Spec) => {
    setSpec(s);
    setStep(4);
    setLoading("Building your personalized roadmap (this takes ~20s)…");
    setError(null);
    try {
      const data = await fetchRoadmap({
        data: { classLevel, sector: sector!.name, specialization: s.name },
      });
      setRoadmap(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build roadmap");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen">
      <ProgressBar step={step} />

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-8">
        {step === 0 && <Welcome onStart={() => setStep(1)} />}

        {step >= 1 && (
          <div className="space-y-5">
            {/* Top controls */}
            <div className="no-print flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                {step > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (step === 4) { setStep(3); setRoadmap(null); }
                      else if (step === 3) { setStep(2); setSpec(null); setSpecsResp(null); }
                      else if (step === 2) { setStep(1); setSector(null); setSectorsResp(null); }
                    }}
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={reset}>
                  <RotateCcw className="mr-1 h-4 w-4" /> Start Over
                </Button>
              </div>
              {roadmap && (
                <Button size="sm" className="bg-emerald" onClick={() => window.print()}>
                  <Download className="mr-1 h-4 w-4" /> Download My Roadmap
                </Button>
              )}
            </div>

            {step === 1 && (
              <>
                <AgentBubble>
                  <p>Hey! Before we begin — what class or level are you currently in?</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Pick the one closest to you. I'll calibrate everything from here.
                  </p>
                </AgentBubble>
                <ClassPicker onPick={handleClass} />
              </>
            )}

            {step >= 2 && (
              <StudentBubble>{classLevel}</StudentBubble>
            )}

            {step === 2 && (
              <>
                {loading && <Thinking text={loading} />}
                {sectorsResp && (
                  <>
                    <AgentBubble>
                      <p>{sectorsResp.intro}</p>
                      <p className="mt-2 text-xs italic text-muted-foreground">{sectorsResp.honestNote}</p>
                    </AgentBubble>
                    <SectorGrid sectors={sectorsResp.sectors} onPick={handleSector} />
                  </>
                )}
              </>
            )}

            {step >= 3 && sector && <StudentBubble>{sector.name}</StudentBubble>}

            {step === 3 && (
              <>
                {loading && <Thinking text={loading} />}
                {specsResp && (
                  <>
                    <AgentBubble>{specsResp.comment}</AgentBubble>
                    <SpecializationGrid items={specsResp.specializations} onPick={handleSpec} />
                  </>
                )}
              </>
            )}

            {step >= 4 && spec && <StudentBubble>{spec.name}</StudentBubble>}

            {step === 4 && (
              <>
                {loading && <Thinking text={loading} />}
                {roadmap && (
                  <>
                    <AgentBubble>
                      Here's your full personalized roadmap. Each section expands. After you read through it,
                      ask me anything in the chat below — I'll adapt it to your real life.
                    </AgentBubble>
                    <RoadmapView roadmap={roadmap} />
                    <FollowUpChat
                      context={{
                        classLevel,
                        sector: sector!.name,
                        specialization: spec!.name,
                      }}
                    />
                  </>
                )}
              </>
            )}

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive-foreground">
                <p className="font-semibold">Something went wrong</p>
                <p className="opacity-80">{error}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="no-print border-t border-border py-6 text-center text-xs text-muted-foreground">
        PathfinderAI · Honest career guidance powered by Lovable AI
      </footer>
    </div>
  );
}

function Thinking({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 text-sm">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald" />
      </span>
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-grad-hero relative -mt-8 flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
        <Sparkles className="h-3 w-3 text-emerald" />
        Your Career Intelligence Agent
      </div>
      <h1 className="mt-6 font-display text-6xl font-bold tracking-tight sm:text-8xl">
        Pathfinder<span className="text-emerald">AI</span>
      </h1>
      <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
        Not a quiz. Not a test. <span className="text-foreground">A real conversation about your future.</span>
      </p>
      <Button
        size="lg"
        onClick={onStart}
        className="mt-10 rounded-full bg-primary px-8 py-6 text-base font-semibold shadow-2xl shadow-primary/30 hover:opacity-90"
      >
        Start My Journey →
      </Button>
      <p className="mt-6 text-xs text-muted-foreground">
        No login. No signup. Works instantly. Free for every student.
      </p>

      <div className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
        {[
          { t: "Honest", d: "No sugarcoating. Real difficulty, real numbers." },
          { t: "Personalized", d: "Adapts to your class, time, and field." },
          { t: "Actionable", d: "Real courses, books, projects — start today." },
        ].map((f) => (
          <div key={f.t} className="glass rounded-2xl p-4">
            <div className="font-display text-sm font-semibold text-emerald">{f.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
