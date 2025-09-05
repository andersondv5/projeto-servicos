import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartCard({ title, data, loading }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label,
        data: data.values,
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {loading ? (
        <p className="animate-pulse text-gray-400">Carregando gráfico...</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
}
