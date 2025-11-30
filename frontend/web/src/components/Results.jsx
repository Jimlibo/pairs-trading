import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Results({data}){
  const chartData = {
    labels: data.dates,
    datasets: [{ label: "Cumulative Returns", data: data.cum_returns, fill:false }]
  };
  return (
    <div className="mt-6">
      <Line data={chartData} />
      <div className="mt-4">
        <p>Sharpe: {data.sharpe.toFixed(3)}</p>
        <p>Annual Vol: {data.ann_vol.toFixed(3)}</p>
        <p>Max Drawdown: {data.max_drawdown.toFixed(3)}</p>
        <p>Win Rate: {(data.win_rate*100).toFixed(1)}%</p>
      </div>
    </div>
  );
}