import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function CostBreakdown({ data }) {
  const aggregated = Object.values(
    data.reduce((acc, item) => {
      acc[item.Service] = acc[item.Service] || { name: item.Service, value: 0 };
      acc[item.Service].value += item.Amount;
      return acc;
    }, {})
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={aggregated} dataKey="value" nameKey="name" fill="#8884d8" label>
          {aggregated.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
