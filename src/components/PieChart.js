// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart,ArcElement } from "chart.js";

function PieChart({ chartData }) {
    Chart.register(ArcElement);
  return (
    <div className="m-10 p-10">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;