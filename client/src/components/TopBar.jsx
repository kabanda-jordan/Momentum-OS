import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const TopBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col gap-4 rounded-[32px] border border-white/60 bg-white/70 p-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/75 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {user?.name}
        </h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <ThemeToggle />
        <Button variant="secondary" className="gap-2" onClick={logout} type="button">
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
