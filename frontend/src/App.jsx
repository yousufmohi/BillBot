import React, { useEffect, useState } from "react";
import { getCosts } from "./api";
import CostTable from "./components/CostTable";
import CostChart from "./components/CostChart";

function App() {
  const [costs, setCosts] = useState([]);

  useEffect(() => {
    getCosts().then(setCosts);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AWS Cost Tracker Dashboard</h1>
      <CostChart data={costs} />
      <div className="mt-6">
        <CostTable data={costs} />
      </div>
    </div>
  );
}

export default App;
