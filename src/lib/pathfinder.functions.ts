import { createServerFn } from "@tanstack/react-start";
import { generateText, NoObjectGeneratedError, Output } from "ai";
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

const jsonSystemPrompt = `${PATHFINDER_SYSTEM_PROMPT}\n\nReturn ONLY one valid JSON object. Do not use markdown, code fences, comments, or explanatory text outside JSON. Use strings for text fields, numbers for rating fields, and arrays where arrays are requested. Never return null.`;

const ratingSchema = z.coerce.number().int().min(1).max(5).catch(3);

async function generateStructured<T>({
  label,
  prompt,
  schema,
  fallback,
}: {
  label: string;
  prompt: string;
  schema: z.ZodType<T, z.ZodTypeDef, unknown>;
  fallback: T;
}): Promise<T> {
  try {
    const { output } = await generateText({
      model: model(),
      system: jsonSystemPrompt,
      output: Output.json({ name: label }),
      prompt,
    });

    const parsed = schema.safeParse(output);
    if (parsed.success) return parsed.data;

    console.error(`PathfinderAI ${label} validation failed`, {
      issues: parsed.error.issues,
      output,
    });
    return fallback;
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.error(`PathfinderAI ${label} JSON generation failed`, {
        message: error.message,
        cause: error.cause,
        text: error.text,
        finishReason: error.finishReason,
      });
    } else {
      console.error(`PathfinderAI ${label} request failed`, error);
    }
    return fallback;
  }
}

function sectorFallback(classLevel: string): z.infer<typeof sectorSchema> {
  return {
    intro: `For ${classLevel}, the smartest move is to explore broad sectors first, then narrow down after seeing what the day-to-day work really looks like.`,
    honestNote: "These are ranked by practical demand and future scope in India, not by social prestige.",
    sectors: [
      {
        name: "Software, AI & Data",
        description: "Building apps, automation, AI systems, and data products used by real people and companies.",
        demand: 5,
        salaryRange: "₹6–35 LPA",
        difficulty: "Very Hard",
        whySuitsYou: `At ${classLevel}, you can start with logic, math basics, and small projects before specializing.`,
      },
      {
        name: "Healthcare & Life Sciences",
        description: "Careers around medicine, diagnostics, biotech, public health, and health technology.",
        demand: 5,
        salaryRange: "₹5–30 LPA",
        difficulty: "Very Hard",
        whySuitsYou: "Good if you can handle long preparation cycles and consistent study habits.",
      },
      {
        name: "Finance, Business & Analytics",
        description: "Understanding money, markets, companies, customers, and decisions using data and judgment.",
        demand: 4,
        salaryRange: "₹5–28 LPA",
        difficulty: "Hard",
        whySuitsYou: "Useful if you enjoy numbers, decision-making, business stories, or current affairs.",
      },
      {
        name: "Design, Media & Communication",
        description: "Creating user experiences, brands, content, campaigns, and visual stories for audiences.",
        demand: 4,
        salaryRange: "₹4–22 LPA",
        difficulty: "Hard",
        whySuitsYou: "You can test this early through posters, videos, writing, and portfolio projects.",
      },
      {
        name: "Engineering, Robotics & Manufacturing",
        description: "Designing physical systems, machines, electronics, automation, and industrial solutions.",
        demand: 4,
        salaryRange: "₹4–24 LPA",
        difficulty: "Hard",
        whySuitsYou: "Best if you like building, fixing, physics, machines, or practical problem-solving.",
      },
      {
        name: "Law, Policy & Civil Services",
        description: "Working with rules, governance, rights, public systems, legal reasoning, and social impact.",
        demand: 3,
        salaryRange: "₹4–25 LPA",
        difficulty: "Hard",
        whySuitsYou: "Worth exploring if you enjoy reading, argument, society, politics, or structured thinking.",
      },
    ],
  };
}

function specializationFallback(sector: string): z.infer<typeof specSchema> {
  return {
    comment: `${sector} is a broad choice, so the next step is to compare specializations by actual work, not by fashionable titles.`,
    specializations: [
      {
        name: `Applied ${sector} Specialist`,
        whatTheyDo: `Solve practical problems inside ${sector} using domain knowledge, tools, and measurable outcomes.`,
        growth: 4,
        fresherPackage: "₹4–10 LPA",
        seniorPackage: "₹15–35 LPA",
        globalDemand: "High",
        recommendedIfYouLike: "Learning by doing and improving real systems.",
      },
      {
        name: `${sector} Research & Strategy`,
        whatTheyDo: "Study trends, users, markets, or technical possibilities and turn them into plans.",
        growth: 4,
        fresherPackage: "₹4–9 LPA",
        seniorPackage: "₹18–40 LPA",
        globalDemand: "High",
        recommendedIfYouLike: "Reading deeply, analyzing patterns, and explaining decisions.",
      },
      {
        name: `${sector} Product & Operations`,
        whatTheyDo: "Coordinate people, tools, timelines, and customer needs to make services work reliably.",
        growth: 4,
        fresherPackage: "₹5–12 LPA",
        seniorPackage: "₹20–45 LPA",
        globalDemand: "High",
        recommendedIfYouLike: "Ownership, communication, and practical execution.",
      },
      {
        name: `${sector} Analytics`,
        whatTheyDo: "Use data to measure performance, find gaps, and recommend better choices.",
        growth: 5,
        fresherPackage: "₹5–14 LPA",
        seniorPackage: "₹22–50 LPA",
        globalDemand: "Very High",
        recommendedIfYouLike: "Numbers, dashboards, evidence, and structured problem-solving.",
      },
      {
        name: `${sector} Consulting`,
        whatTheyDo: "Help organizations diagnose problems and implement improved systems or strategies.",
        growth: 4,
        fresherPackage: "₹6–16 LPA",
        seniorPackage: "₹25–60 LPA",
        globalDemand: "High",
        recommendedIfYouLike: "Fast learning, presentations, and solving different problems often.",
      },
      {
        name: `${sector} Entrepreneurship`,
        whatTheyDo: "Build a service, product, agency, or venture around a specific problem in the sector.",
        growth: 3,
        fresherPackage: "Variable",
        seniorPackage: "Variable",
        globalDemand: "Medium",
        recommendedIfYouLike: "Risk, independence, sales, and creating from zero.",
      },
    ],
  };
}

function roadmapFallback(data: { classLevel: string; sector: string; specialization: string }): z.infer<typeof roadmapSchema> {
  return {
    acknowledgment: `${data.specialization} can be a strong path, but only if you build proof of skill instead of just collecting certificates.`,
    realityCheck: {
      insideView: "The real work is a mix of fundamentals, practice, feedback, and communication. It is less glamorous and more repetitive than most students expect.",
      commonMisconceptions: "A course alone will not make you job-ready. Projects, problem-solving, and consistency matter more.",
      top10PercentVsAverage: "The top 10% build public proof, ask better questions, and practice deliberately. Average learners only watch tutorials.",
      timeToGood: "With steady practice, expect 6–12 months to become useful and 2–3 years to become genuinely strong.",
    },
    phases: ["Foundation", "Building", "Application", "Mastery"].map((name, index) => ({
      name: `Phase ${index + 1}: ${name}`,
      duration: ["0–2 months", "3–5 months", "6–9 months", "10–12 months"][index],
      goals: [
        index === 0 ? `Understand the basics of ${data.specialization}` : `Apply ${data.specialization} concepts in increasingly realistic work`,
        "Build a weekly learning habit",
        "Create visible proof of progress",
      ],
      successLooksLike: index === 0 ? "You can explain the field simply and complete beginner exercises without copying." : "You can finish small projects, explain choices, and improve after feedback.",
      resources: {
        youtube: ["freeCodeCamp", "NPTEL", "CrashCourse"],
        freePlatforms: ["Coursera audit mode", "edX audit mode", "MIT OpenCourseWare"],
        paidIfWorthIt: ["A structured mentor-led course only after finishing free basics"],
        books: [{ title: "Atomic Habits", author: "James Clear", why: "Useful for building consistency while studying." }],
        practicePlatforms: ["GitHub or portfolio", "Kaggle/Behance/Medium depending on field", "LinkedIn project posts"],
      },
    })),
    weeklyRoutine: {
      assumption: `Assumes ${data.classLevel} responsibilities plus 60–90 minutes of focused career work on most days.`,
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
        day,
        blocks: day === "Sun" ? [{ time: "45 min", activity: "Review the week, fix weak areas, and plan the next project step." }] : [{ time: "60–90 min", activity: `Study one concept and apply it to a tiny ${data.specialization} task.` }],
      })),
    },
    milestones: {
      month1: "Finish a beginner overview and write a one-page field summary.",
      month3: "Complete two small projects or case studies.",
      month6: "Publish a portfolio with 3–4 pieces of proof.",
      year1: "Apply for internships, competitions, freelance work, or advanced programs.",
      selfAssessment: "If you cannot explain what you built and why it matters, you need more practice, not more certificates.",
    },
    projects: [1, 2, 3].map((n) => ({
      title: `${data.specialization} Project ${n}`,
      what: "Build a small but complete project that solves a real user or learning problem.",
      why: "It proves initiative and practical understanding.",
      skillsShown: "Research, execution, communication, and improvement after feedback.",
      whereToHost: "GitHub, Notion, Medium, Behance, LinkedIn, or a simple portfolio site.",
    })),
    realExamples: [
      { name: "Relevant Indian professional", background: "Started with fundamentals and public proof of work.", whatTheyDid: "Built visible expertise over time.", whereTheyAreNow: "Recognized in their field." },
      { name: "Early-career achiever", background: "Used projects and internships to move ahead.", whatTheyDid: "Focused on outcomes rather than only credentials.", whereTheyAreNow: "Working in a competitive role." },
      { name: "Independent builder", background: "Learned through consistent practice.", whatTheyDid: "Created a portfolio and network.", whereTheyAreNow: "Growing through real-world work." },
    ],
    mistakesToAvoid: [
      "Watching tutorials without building anything.",
      "Choosing a field only for salary screenshots.",
      "Ignoring communication and writing skills.",
      "Changing paths every week without testing one seriously.",
      "Comparing your beginning to someone else's fifth year.",
    ],
    whatGoodLooksLike: "At your level, good means consistent practice, clear explanations, and 2–3 visible projects that show learning momentum.",
    nextStepToday: `Spend 45 minutes learning the basics of ${data.specialization}, then write 5 bullet points about what people actually do in this role.`,
  };
}

const sectorSchema = z.object({
  intro: z.string().catch("Let's map the best career sectors for your current level."),
  sectors: z.array(
    z.object({
      name: z.string().catch("Career Sector"),
      description: z.string().catch("A practical career area with real demand and long-term scope."),
      demand: ratingSchema,
      salaryRange: z.string().catch("₹4–18 LPA"),
      difficulty: z.string().catch("Hard"),
      whySuitsYou: z.string().catch("This is worth exploring through beginner-friendly projects and honest self-assessment."),
    }),
  ).min(1).catch([]),
  honestNote: z.string().catch("Rankings are based on demand and scope, not prestige."),
});

export const getSectors = createServerFn({ method: "POST" })
  .inputValidator((d: { classLevel: string }) => z.object({ classLevel: z.string() }).parse(d))
  .handler(async ({ data }) => {
    return generateStructured({
      label: "career_sectors",
      schema: sectorSchema,
      fallback: sectorFallback(data.classLevel),
      prompt: `Student current level: "${data.classLevel}".
Return JSON with keys: intro, sectors, honestNote.
Each sector needs: name, description, demand, salaryRange, difficulty, whySuitsYou.
Return exactly 6-8 future career SECTORS realistically available to them right now in India.
Rank by current market demand and future scope — not by what sounds impressive.
Be honest about difficulty (use only "Moderate", "Hard", or "Very Hard") and salary.
Demand must be an integer 1-5. Tailor "whySuitsYou" to their specific level.
Include a final "honestNote" explaining ranking is by demand+scope, not prestige.`,
    });
  });

const specSchema = z.object({
  comment: z.string().catch("Good choice. Now compare the actual work inside this sector before choosing a specialization."),
  specializations: z.array(
    z.object({
      name: z.string().catch("Specialization"),
      whatTheyDo: z.string().catch("Solve practical problems in this sector using field-specific skills."),
      growth: ratingSchema,
      fresherPackage: z.string().catch("₹4–10 LPA"),
      seniorPackage: z.string().catch("₹15–35 LPA"),
      globalDemand: z.string().catch("High"),
      recommendedIfYouLike: z.string().catch("Structured learning, practical work, and solving real problems."),
    }),
  ).min(1).catch([]),
});

export const getSpecializations = createServerFn({ method: "POST" })
  .inputValidator((d: { classLevel: string; sector: string }) =>
    z.object({ classLevel: z.string(), sector: z.string() }).parse(d),
  )
  .handler(async ({ data }) => {
    return generateStructured({
      label: "career_specializations",
      schema: specSchema,
      fallback: specializationFallback(data.sector),
      prompt: `Student level: "${data.classLevel}". They picked sector: "${data.sector}".
Return JSON with keys: comment, specializations.
Each specialization needs: name, whatTheyDo, growth, fresherPackage, seniorPackage, globalDemand, recommendedIfYouLike.
Generate 6-10 real sub-fields/specializations inside this sector with honest "what people actually do",
growth integer 1-5, fresher and senior package ranges in India (2024-25),
globalDemand must be one of "Low", "Medium", "High", "Very High",
and "recommended if you like" personality/skill hint.
Also include a one-line intelligent, specific comment (not generic) about their sector choice.`,
    });
  });

const roadmapSchema = z.object({
  acknowledgment: z.string().catch("This path is promising if you build real proof of skill."),
  realityCheck: z.object({
    insideView: z.string().catch("The daily work requires fundamentals, practice, and communication."),
    commonMisconceptions: z.string().catch("Certificates alone are not enough."),
    top10PercentVsAverage: z.string().catch("The top 10% build public proof and practice consistently."),
    timeToGood: z.string().catch("Expect 6–12 months for useful skill and longer for mastery."),
  }).catch({
    insideView: "The daily work requires fundamentals, practice, and communication.",
    commonMisconceptions: "Certificates alone are not enough.",
    top10PercentVsAverage: "The top 10% build public proof and practice consistently.",
    timeToGood: "Expect 6–12 months for useful skill and longer for mastery.",
  }),
  phases: z.array(
    z.object({
      name: z.string().catch("Phase"),
      duration: z.string().catch("2–3 months"),
      goals: z.array(z.string()).catch([]),
      successLooksLike: z.string().catch("You can explain and apply the concept without copying."),
      resources: z.object({
        youtube: z.array(z.string()).catch([]),
        freePlatforms: z.array(z.string()).catch([]),
        paidIfWorthIt: z.array(z.string()).catch([]),
        books: z.array(z.object({ title: z.string().catch("Book"), author: z.string().catch("Author"), why: z.string().catch("Useful for fundamentals.") })).catch([]),
        practicePlatforms: z.array(z.string()).catch([]),
      }).catch({ youtube: [], freePlatforms: [], paidIfWorthIt: [], books: [], practicePlatforms: [] }),
    }),
  ).min(1).catch([]),
  weeklyRoutine: z.object({
    assumption: z.string().catch("Assumes school/college/work plus 60–90 minutes of focused study."),
    days: z.array(
      z.object({
        day: z.string().catch("Day"),
        blocks: z.array(z.object({ time: z.string().catch("60 min"), activity: z.string().catch("Focused study and practice") })).catch([]),
      }),
    ).catch([]),
  }).catch({ assumption: "Assumes school/college/work plus 60–90 minutes of focused study.", days: [] }),
  milestones: z.object({
    month1: z.string().catch("Understand the basics and complete beginner exercises."),
    month3: z.string().catch("Finish two small projects."),
    month6: z.string().catch("Publish a portfolio with proof of work."),
    year1: z.string().catch("Apply for internships or advanced opportunities."),
    selfAssessment: z.string().catch("Judge progress by what you can build and explain."),
  }).catch({ month1: "Understand the basics and complete beginner exercises.", month3: "Finish two small projects.", month6: "Publish a portfolio with proof of work.", year1: "Apply for internships or advanced opportunities.", selfAssessment: "Judge progress by what you can build and explain." }),
  projects: z.array(
    z.object({
      title: z.string().catch("Portfolio Project"),
      what: z.string().catch("Build a small complete project."),
      why: z.string().catch("It proves practical skill."),
      skillsShown: z.string().catch("Research, execution, and communication."),
      whereToHost: z.string().catch("GitHub, LinkedIn, Medium, Behance, or portfolio site."),
    }),
  ).catch([]),
  realExamples: z.array(
    z.object({
      name: z.string().catch("Relevant professional"),
      background: z.string().catch("Built expertise through fundamentals and practice."),
      whatTheyDid: z.string().catch("Created visible proof of skill."),
      whereTheyAreNow: z.string().catch("Working in the field."),
      }),
    )
    .catch([]),
  mistakesToAvoid: z.array(z.string()).catch([]),
  whatGoodLooksLike: z.string().catch("Good means consistent practice, clear explanations, and visible proof of work."),
  nextStepToday: z.string().catch("Spend 45 minutes learning one beginner concept and write a short summary."),
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
    return generateStructured({
      label: "career_roadmap",
      schema: roadmapSchema,
      fallback: roadmapFallback(data),
      prompt: `Build a complete, structured, deeply personalized career roadmap.
Student level: "${data.classLevel}"
Chosen sector: "${data.sector}"
Chosen specialization: "${data.specialization}"
${data.hoursPerDay ? `Available study time: ~${data.hoursPerDay} hours/day.` : ""}
${data.preference ? `Preference: ${data.preference}.` : ""}

Return JSON with keys: acknowledgment, realityCheck, phases, weeklyRoutine, milestones, projects, realExamples, mistakesToAvoid, whatGoodLooksLike, nextStepToday.

Rules:
- 4 phases (Foundation, Building, Application, Mastery) tailored to their CURRENT level.
- Weekly routine must be realistic — account for school/college/work hours implied by level. Never propose 16h/day.
- Resources must name REAL YouTube channels, NPTEL/Coursera/edX/freeCodeCamp/Khan/MIT OCW/CS50 courses, real books (title + author).
- Salary, examples, companies must reflect Indian market 2024-25.
- Be brutally honest in "mistakesToAvoid" and "realityCheck". No sugarcoating.
- "realExamples": 3 real, recognizable Indian professionals from this exact field where possible.
- End with one concrete "nextStepToday" the student can do in the next 2 hours.`,
    });
  });
