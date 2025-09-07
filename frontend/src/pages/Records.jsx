import React from "react";
import CostTable from "../components/CostTable";
import { mockCosts } from "../mockData";
import '../App.css'

export default function Records() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Records</h1>
      <CostTable data={mockCosts} />
    </div>
  );
}
