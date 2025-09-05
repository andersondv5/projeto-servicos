import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Table from "./components/Table";
import ChartCard from "./components/ChartCard";
import axios from "axios";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    cards: [],
    chart: { labels: [], values: [], label: "" },
    table: [],
  });

  useEffect(() => {
    // Simula chamada a API (ex: Django DRF)
    setTimeout(() => {
      setDashboardData({
        cards: [
          { title: "Usuários", value: 150, color: "bg-blue-500" },
          { title: "Ativos", value: 120, color: "bg-green-500" },
          { title: "Pendentes", value: 30, color: "bg-yellow-500" },
        ],
        chart: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          values: [30, 45, 60, 40, 80, 70],
          label: "Crescimento de usuários",
        },
        table: [
          { name: "André", email: "andre@email.com", status: "Ativo" },
          { name: "Maria", email: "maria@email.com", status: "Inativo" },
          { name: "João", email: "joao@email.com", status: "Ativo" },
        ],
      });
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-50 flex-1 space-y-6 overflow-auto">
          <div className="grid grid-cols-3 gap-4">
            {dashboardData.cards.map((card, idx) => (
              <Card key={idx} {...card} loading={loading} />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartCard title="Usuários ao longo do tempo" data={dashboardData.chart} loading={loading} />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Lista de usuários</h2>
            <Table data={dashboardData.table} loading={loading} />
          </div>
        </main>
      </div>
    </div>
  );
}

