import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie
} from "recharts";
import Card from "./Card";

const pieColors = ["#06b6d4", "#0f172a", "#38bdf8", "#67e8f9", "#1d4ed8"];

const DashboardCharts = ({ weeklyProductivity, goalProgress }) => (
  <div className="grid gap-6 xl:grid-cols-2">
    <Card title="Weekly productivity" subtitle="Completed tasks over the last seven days.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyProductivity}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="completed" radius={[10, 10, 0, 0]} fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <Card title="Goal progress" subtitle="See how each active goal is moving forward.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={goalProgress}
              dataKey="progress"
              nameKey="name"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={4}
            >
              {goalProgress.map((entry, index) => (
                <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </div>
);

export default DashboardCharts;
