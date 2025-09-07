import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function CostChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Amount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
