// components/BarChart.js
import { Bar } from "react-chartjs-2";
import { Chart,ArcElement,CategoryScale, LinearScale, BarElement } from "chart.js";


export const BarChart = ({ chartData }) => {
    Chart.register(ArcElement,CategoryScale,LinearScale,BarElement)
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};