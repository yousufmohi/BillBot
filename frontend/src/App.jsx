import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Trends from "./pages/Trends";
import Records from "./pages/Records";
import './App.css'
import Settings from "./pages/Settings";
function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/records" element={<Records />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
