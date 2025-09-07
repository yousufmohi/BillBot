import React from "react";
import '../App.css'

export default function CostTable({ data }) {
  return (
    <table className="min-w-full border-collapse table-auto">
      <thead className="bg-gray-200">
        <tr>
          <th className="border px-4 py-2 text-left text-gray-700">Service</th>
          <th className="border px-4 py-2 text-left text-gray-700">Date</th>
          <th className="border px-4 py-2 text-left text-gray-700">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-100 transition">
            <td className="border px-4 py-2">{item.Service}</td>
            <td className="border px-4 py-2">{item.Date}</td>
            <td className="border px-4 py-2">${item.Amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
