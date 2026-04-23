const Card = ({ title, subtitle, action, children, className = "" }) => (
  <section
    className={`rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 ${className}`}
  >
    {(title || action) && (
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {title ? <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2> : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          ) : null}
        </div>
        {action}
      </div>
    )}
    {children}
  </section>
);

export default Card;
