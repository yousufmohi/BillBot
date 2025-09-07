import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function CostChart({ data }) {
  const grouped = data.reduce((acc, item) => {
    let day = acc.find(d => d.Date === item.Date);
    if (!day) {
      day = { Date: item.Date };
      acc.push(day);
    }
    day[item.Service] = item.Amount;
    return acc;
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={grouped}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="EC2" stroke="#8884d8" />
        <Line type="monotone" dataKey="S3" stroke="#82ca9d" />
        <Line type="monotone" dataKey="RDS" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
}
