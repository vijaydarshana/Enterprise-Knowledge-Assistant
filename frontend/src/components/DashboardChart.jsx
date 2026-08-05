import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#ea580c",
  "#9333ea",
];

function DashboardChart({ stats }) {
  const data = [
    { name: "Employees", value: stats.employees },
    { name: "Projects", value: stats.projects },
    { name: "Skills", value: stats.skills },
    { name: "Documents", value: stats.documents },
  ];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>

        <Pie
          data={data}
          outerRadius={120}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>
  );
}

export default DashboardChart;