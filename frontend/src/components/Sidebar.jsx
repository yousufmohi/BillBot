// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Home, BarChart2, Table, Settings } from "lucide-react"; 
import '../App.css'

export default function Sidebar() {
  const links = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/" },
    { name: "Trends", icon: <BarChart2 size={20} />, path: "/trends" },
    { name: "Records", icon: <Table size={20} />, path: "/records" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <aside className="w-60 bg-white shadow-md p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">BillBot</h1>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
