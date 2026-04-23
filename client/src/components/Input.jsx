const Input = ({ label, error, ...props }) => (
  <label className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
    <span>{label}</span>
    <input
      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      {...props}
    />
    {error ? <span className="text-xs text-rose-500">{error}</span> : null}
  </label>
);

export default Input;
