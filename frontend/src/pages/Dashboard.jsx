import React, { useEffect, useState } from "react";
import KPICard from "../components/KPICard";
import CostChart from "../components/CostChart";
import CostBreakdown from "../components/CostBreakdown";
import { getCosts } from "../api";
import '../App.css';

export default function Dashboard() {
  const [data, setData] = useState([]);

useEffect(() => {
  getCosts()
    .then(raw => {
      const arr = Array.isArray(raw.items) ? raw.items : [];
      setData(arr.map(d => ({ ...d, Amount: Number(d.Amount) })));
    })
    .catch(console.error);
}, []);


  if (!Array.isArray(data) || data.length === 0) return <p className="p-6">Loading...</p>;

  const totalCost = data.reduce((sum, d) => sum + d.Amount, 0);
  const byService = data.reduce((acc, d) => {
    acc[d.Service] = (acc[d.Service] || 0) + d.Amount;
    return acc;
  }, {});
  const biggestService = Object.entries(byService).sort((a, b) => b[1] - a[1])[0];

  const highestDailySpend = Math.max(...data.map(d => d.Amount));
  const averageDailySpend = Math.round(data.reduce((sum, d) => sum + d.Amount, 0) / data.length);

  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="Total Spend" value={`$${totalCost}`} />
        <KPICard
          title="Top Service"
          value={biggestService ? biggestService[0] : "—"}
          subtitle={`$${biggestService ? biggestService[1] : 0}`}
        />
        <KPICard title="Active Services" value={Object.keys(byService).length} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Highest Daily Spend</p>
          <p className="text-xl font-bold text-gray-800">${highestDailySpend}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Average Daily Spend</p>
          <p className="text-xl font-bold text-gray-800">${averageDailySpend}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center hover:shadow-lg transition">
          <p className="text-sm text-gray-500">Active Services</p>
          <p className="text-xl font-bold text-gray-800">{Object.keys(byService).length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">Cost Trend</h2>
          <CostChart data={data} />
        </div>
        <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">Service Breakdown</h2>
          <CostBreakdown data={data} />
        </div>
      </div>
    </main>
  );
}
