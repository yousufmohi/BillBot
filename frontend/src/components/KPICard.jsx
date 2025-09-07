export default function KPICard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
    </div>
  );
}
