import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import '../App.css'

export default function CostDashboard({ data }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="Service" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" />
      <Bar dataKey="Cost" fill="#8884d8" />
    </BarChart>
  );
}
