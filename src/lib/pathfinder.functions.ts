import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
import { z } from "zod";
import {
  DEFAULT_MODEL,
  PATHFINDER_SYSTEM_PROMPT,
  createLovableAiGatewayProvider,
} from "./ai-gateway";

function model() {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("LOVABLE_API_KEY missing");
  return createLovableAiGatewayProvider(key)(DEFAULT_MODEL);
}

const sectorSchema = z.object({
  intro: z.string().describe("Warm, intelligent 1-2 sentence acknowledgment of the student's level."),
  sectors: z.array(
    z.object({
      name: z.string(),
      description: z.string().describe("2-line honest description"),
      demand: z.number().describe("Market demand rating 1-5"),
      salaryRange: z.string().describe("Avg salary range in India, e.g. '₹6–25 LPA'"),
      difficulty: z.string().describe("Moderate, Hard, or Very Hard"),
      whySuitsYou: z.string().describe("Why this fits their current class level, one sentence"),
    }),
  ).describe("6 to 8 sectors"),
  honestNote: z.string(),
});

export const getSectors = createServerFn({ method: "POST" })
  .inputValidator((d: { classLevel: string }) => z.object({ classLevel: z.string() }).parse(d))
  .handler(async ({ data }) => {
    const { output } = await generateText({
      model: model(),
      system: PATHFINDER_SYSTEM_PROMPT,
      output: Output.object({ schema: sectorSchema }),
      prompt: `Student current level: "${data.classLevel}".
Return exactly 6-8 future career SECTORS realistically available to them right now in India.
Rank by current market demand and future scope — not by what sounds impressive.
Be honest about difficulty (use only "Moderate", "Hard", or "Very Hard") and salary.
Demand must be an integer 1-5. Tailor "whySuitsYou" to their specific level.
Include a final "honestNote" explaining ranking is by demand+scope, not prestige.`,
    });
    return output;
  });

const specSchema = z.object({
  comment: z.string().describe("Short, intelligent, sector-specific acknowledgment."),
  specializations: z.array(
    z.object({
      name: z.string(),
      whatTheyDo: z.string().describe("1-2 lines, honest"),
      growth: z.number().describe("1 to 5"),
      fresherPackage: z.string(),
      seniorPackage: z.string(),
      globalDemand: z.string().describe("Low, Medium, High, or Very High"),
      recommendedIfYouLike: z.string(),
    }),
  ).describe("6 to 10 specializations"),
});

export const getSpecializations = createServerFn({ method: "POST" })
  .inputValidator((d: { classLevel: string; sector: string }) =>
    z.object({ classLevel: z.string(), sector: z.string() }).parse(d),
  )
  .handler(async ({ data }) => {
    const { output } = await generateText({
      model: model(),
      system: PATHFINDER_SYSTEM_PROMPT,
      output: Output.object({ schema: specSchema }),
      prompt: `Student level: "${data.classLevel}". They picked sector: "${data.sector}".
Generate 6-10 real sub-fields/specializations inside this sector with honest "what people actually do",
growth integer 1-5, fresher and senior package ranges in India (2024-25),
globalDemand must be one of "Low", "Medium", "High", "Very High",
and "recommended if you like" personality/skill hint.
Also include a one-line intelligent, specific comment (not generic) about their sector choice.`,
    });
    return output;
  });

const roadmapSchema = z.object({
  acknowledgment: z.string().describe("Short intelligent comment about their specialization choice."),
  realityCheck: z.object({
    insideView: z.string(),
    commonMisconceptions: z.string(),
    top10PercentVsAverage: z.string(),
    timeToGood: z.string(),
  }),
  phases: z.array(
    z.object({
      name: z.string().describe("e.g. 'Phase 1: Foundation'"),
      duration: z.string(),
      goals: z.array(z.string()),
      successLooksLike: z.string(),
      resources: z.object({
        youtube: z.array(z.string()).describe("Specific channel names"),
        freePlatforms: z.array(z.string()),
        paidIfWorthIt: z.array(z.string()),
        books: z.array(z.object({ title: z.string(), author: z.string(), why: z.string() })),
        practicePlatforms: z.array(z.string()),
      }),
    }),
  ).describe("Exactly 4 phases: Foundation, Building, Application, Mastery"),
  weeklyRoutine: z.object({
    assumption: z.string().describe("e.g. 'Assumes school until 3pm + homework'"),
    days: z.array(
      z.object({
        day: z.string().describe("Mon, Tue, Wed, Thu, Fri, Sat, or Sun"),
        blocks: z.array(z.object({ time: z.string(), activity: z.string() })),
      }),
    ).describe("Exactly 7 days Mon-Sun"),
  }),
  milestones: z.object({
    month1: z.string(),
    month3: z.string(),
    month6: z.string(),
    year1: z.string(),
    selfAssessment: z.string(),
  }),
  projects: z.array(
    z.object({
      title: z.string(),
      what: z.string(),
      why: z.string(),
      skillsShown: z.string(),
      whereToHost: z.string(),
    }),
  ).describe("3 to 5 projects"),
  realExamples: z.array(
    z.object({
      name: z.string(),
      background: z.string(),
      whatTheyDid: z.string(),
        whereTheyAreNow: z.string(),
      }),
    )
    .length(3),
  mistakesToAvoid: z.array(z.string()).length(5),
  whatGoodLooksLike: z.string().describe("Specific benchmarks for their exact level"),
  nextStepToday: z.string(),
});

export type Roadmap = z.infer<typeof roadmapSchema>;

export const getRoadmap = createServerFn({ method: "POST" })
  .inputValidator(
    (d: { classLevel: string; sector: string; specialization: string; hoursPerDay?: number; preference?: string }) =>
      z
        .object({
          classLevel: z.string(),
          sector: z.string(),
          specialization: z.string(),
          hoursPerDay: z.number().optional(),
          preference: z.string().optional(),
        })
        .parse(d),
  )
  .handler(async ({ data }) => {
    const { output } = await generateText({
      model: model(),
      system: PATHFINDER_SYSTEM_PROMPT,
      output: Output.object({ schema: roadmapSchema }),
      prompt: `Build a complete, structured, deeply personalized career roadmap.
Student level: "${data.classLevel}"
Chosen sector: "${data.sector}"
Chosen specialization: "${data.specialization}"
${data.hoursPerDay ? `Available study time: ~${data.hoursPerDay} hours/day.` : ""}
${data.preference ? `Preference: ${data.preference}.` : ""}

Rules:
- 4 phases (Foundation, Building, Application, Mastery) tailored to their CURRENT level.
- Weekly routine must be realistic — account for school/college/work hours implied by level. Never propose 16h/day.
- Resources must name REAL YouTube channels, NPTEL/Coursera/edX/freeCodeCamp/Khan/MIT OCW/CS50 courses, real books (title + author).
- Salary, examples, companies must reflect Indian market 2024-25.
- Be brutally honest in "mistakesToAvoid" and "realityCheck". No sugarcoating.
- "realExamples": 3 real, recognizable Indian professionals from this exact field where possible.
- End with one concrete "nextStepToday" the student can do in the next 2 hours.`,
    });
    return output;
  });
