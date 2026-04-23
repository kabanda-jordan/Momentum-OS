import { ArrowRight, ChartSpline, CheckCheck, ShieldCheck, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import Button from "../components/Button";

const featureCards = [
  {
    title: "Focused dashboard",
    description: "Keep tasks, goals, reminders, and weekly momentum in one sharp workspace.",
    icon: ChartSpline
  },
  {
    title: "Clean execution",
    description: "Move from idea to done with filters, deadlines, priorities, and fast editing flows.",
    icon: CheckCheck
  },
  {
    title: "Reliable backend",
    description: "Protected routes, request validation, normalized data, and safer API responses out of the box.",
    icon: ShieldCheck
  }
];

const proofPoints = [
  { label: "Task flow", value: "Search, sort, and track what matters first." },
  { label: "Goal rhythm", value: "Measure long-term progress without losing urgency." },
  { label: "Weekly insight", value: "Spot streaks and missed momentum before they drift." }
];

const LandingPage = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f1e8] text-slate-900 dark:bg-[#111827] dark:text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-4rem] h-72 w-72 rounded-full bg-[#ffb36b]/40 blur-3xl dark:bg-[#f97316]/20" />
        <div className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-[#3b82f6]/20 blur-3xl dark:bg-[#38bdf8]/15" />
        <div className="absolute bottom-[-8rem] left-1/3 h-96 w-96 rounded-full bg-[#14b8a6]/15 blur-3xl dark:bg-[#2dd4bf]/10" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[32px] border border-white/60 bg-white/65 px-5 py-4 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)] backdrop-blur lg:flex-row lg:items-center lg:justify-between dark:border-white/10 dark:bg-slate-900/55">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c2410c] dark:text-[#fdba74]">
              Momentum OS
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Personal productivity that actually feels alive.</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={toggleTheme} type="button">
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </Button>
            <Link
              to={user ? "/app" : "/auth"}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {user ? "Open dashboard" : "Get started"}
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-12">
          <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-2 text-sm text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <Sparkles size={16} className="text-[#ea580c]" />
                Built for calm execution, not chaos.
              </div>

              <div className="space-y-5">
                <h2 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
                  A bold landing space for your work, then a dashboard that keeps promises.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Plan the week, track the long game, and keep your next move visible with a modern
                  productivity system powered by React, Express, and MongoDB.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={user ? "/app" : "/auth"}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#c2410c] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-20px_rgba(194,65,12,0.8)] transition hover:bg-[#9a3412]"
                >
                  {user ? "Go to workspace" : "Launch the app"}
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center rounded-2xl border border-slate-900/10 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  Explore features
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {proofPoints.map((point) => (
                  <div
                    key={point.label}
                    className="rounded-[28px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-900/50"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{point.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{point.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-8 hidden h-24 w-24 rounded-[28px] bg-[#0f766e] md:block" />
              <div className="absolute -right-4 bottom-12 hidden h-20 w-20 rounded-full border-8 border-[#f59e0b] bg-transparent md:block" />
              <div className="relative rounded-[36px] border border-white/60 bg-[linear-gradient(160deg,rgba(15,23,42,0.95),rgba(30,41,59,0.92),rgba(194,65,12,0.85))] p-6 text-white shadow-[0_32px_90px_-36px_rgba(15,23,42,0.75)]">
                <div className="flex items-center justify-between rounded-[28px] bg-white/10 px-4 py-3 backdrop-blur">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-orange-100/70">Preview</p>
                    <p className="mt-1 text-lg font-semibold">Your week at a glance</p>
                  </div>
                  <Target className="text-orange-200" />
                </div>

                <div className="mt-5 space-y-4 rounded-[30px] bg-white/10 p-5 backdrop-blur">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-[24px] bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-orange-100/60">Completion</p>
                      <p className="mt-3 text-3xl font-semibold">78%</p>
                      <p className="mt-2 text-sm text-orange-50/80">Closed loops this week</p>
                    </div>
                    <div className="rounded-[24px] bg-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-orange-100/60">Deadlines</p>
                      <p className="mt-3 text-3xl font-semibold">4</p>
                      <p className="mt-2 text-sm text-orange-50/80">Upcoming priorities</p>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-[#f8fafc] p-4 text-slate-900">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">Today's focus</p>
                      <span className="rounded-full bg-[#fed7aa] px-3 py-1 text-xs font-semibold text-[#9a3412]">
                        High energy
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        "Ship backend improvements",
                        "Review active goals",
                        "Polish the public landing page"
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#fff7ed] px-3 py-3">
                          <div className="h-3 w-3 rounded-full bg-[#ea580c]" />
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="mt-20 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-900/50"
                >
                  <div className="inline-flex rounded-2xl bg-[#fff7ed] p-3 text-[#c2410c] dark:bg-white/10 dark:text-[#fdba74]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
