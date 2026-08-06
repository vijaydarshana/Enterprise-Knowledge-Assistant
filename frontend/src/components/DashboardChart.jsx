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
    { name: "Employees", value: stats?.employees ?? 0 },
    { name: "Projects", value: stats?.projects ?? 0 },
    { name: "Skills", value: stats?.skills ?? 0 },
    { name: "Documents", value: stats?.documents ?? 0 },
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