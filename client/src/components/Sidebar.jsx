import { ChartNoAxesCombined, CheckSquare, Rocket, Target } from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  { label: "Overview", icon: ChartNoAxesCombined },
  { label: "Tasks", icon: CheckSquare },
  { label: "Goals", icon: Target }
];

const Sidebar = () => (
  <aside className="rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
        Momentum
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Productivity hub
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        A focused command center for tasks, goals, and progress.
      </p>
    </div>

    <nav className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-200"
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </div>
        );
      })}
    </nav>

    <Link
      to="/"
      className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <Rocket size={16} />
      View landing page
    </Link>
  </aside>
);

export default Sidebar;
