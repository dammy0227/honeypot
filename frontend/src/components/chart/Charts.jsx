import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import './chart.css'

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Charts = ({ data }) => {
  const routeStats = {};
  const typeStats = {};

  data.forEach((log) => {
    const route = log.routeAccessed || "Unknown";
    const type = log.attackType || "Unknown";

    routeStats[route] = (routeStats[route] || 0) + 1;
    typeStats[type] = (typeStats[type] || 0) + 1;
  });

  if (Object.keys(routeStats).length === 0) {
    routeStats["No Data"] = 1;
  }

  if (Object.keys(typeStats).length === 0) {
    typeStats["No Data"] = 1;
  }

  const routeChartData = {
    labels: Object.keys(routeStats),
    datasets: [
      {
        label: "Attacks per Route",
        data: Object.values(routeStats),
        backgroundColor: "#5c6ac4",
      },
    ],
  };

  const typeChartData = {
    labels: Object.keys(typeStats),
    datasets: [
      {
        label: "Attack Types",
        data: Object.values(typeStats),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <div className="chart-title">📈 Attack Visualizations</div>
      <div className="chart-wrapper">
        <div className="bar-container">
          <Bar data={routeChartData} />
        </div>
        <div className="pie-container">
          <Pie data={typeChartData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
