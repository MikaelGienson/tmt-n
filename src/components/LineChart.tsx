import './LineChart.scss'
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const data = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thurstday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      data: [0, 25, 50, 75, 100],
      fill: false,
      borderColor: "#742774"
    }
  ],
  options: {
    scales: {
        y: {
            min: 0,
            max: 100,
            
        }
    },
  },
  responsive: true,
};

export default function LineChart() {
  return (
    <div className="chart">
      <Line 
      data={data}
      options={data.options}/>
    </div>
  );
}