import Card from "./Card";

const StatCard = ({ label, value, helper }) => (
  <Card className="overflow-hidden">
    <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
      {value}
    </p>
    <p className="mt-2 text-sm text-cyan-600 dark:text-cyan-300">{helper}</p>
  </Card>
);

export default StatCard;
