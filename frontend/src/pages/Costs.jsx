import React from "react";
import CostTable from "../components/CostTable";
import { mockCosts } from "../mockData";

export default function Costs() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Detailed Costs</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <CostTable data={mockCosts} />
      </div>
    </div>
  );
}
