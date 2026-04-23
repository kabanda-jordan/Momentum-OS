import clsx from "clsx";

const buttonStyles = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
  secondary:
    "bg-white/70 text-slate-700 ring-1 ring-slate-200 hover:bg-white dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-700",
  ghost:
    "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  danger:
    "bg-rose-600 text-white hover:bg-rose-500"
};

const Button = ({ className, variant = "primary", ...props }) => (
  <button
    className={clsx(
      "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-60",
      buttonStyles[variant],
      className
    )}
    {...props}
  />
);

export default Button;
