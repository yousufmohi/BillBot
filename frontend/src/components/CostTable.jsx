import React from "react";

export default function CostTable({ data }) {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border px-2 py-1">Service</th>
          <th className="border px-2 py-1">Timestamp</th>
          <th className="border px-2 py-1">Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td className="border px-2 py-1">{item.Service}</td>
            <td className="border px-2 py-1">{item.Timestamp}</td>
            <td className="border px-2 py-1">{item.Amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
