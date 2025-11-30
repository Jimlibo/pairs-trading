import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Results({data}){
  const [activeTab, setActiveTab] = useState("returns");

  const returnsChartData = {
    labels: data.dates,
    datasets: [{ 
      label: "Cumulative Returns", 
      data: data.cum_returns, 
      fill: false,
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      tension: 0.1
    }]
  };

  const pricesChartData = {
    labels: data.dates,
    datasets: [
      { 
        label: "Y Ticker", 
        data: data.closing_prices_y || [], 
        fill: false,
        borderColor: "#059669",
        tension: 0.1
      },
      { 
        label: "X Ticker", 
        data: data.closing_prices_x || [], 
        fill: false,
        borderColor: "#dc2626",
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#374151",
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: "#6b7280"
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)"
        }
      },
      x: {
        ticks: {
          color: "#6b7280"
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)"
        }
      }
    }
  };

  const tabs = [
    { id: "returns", label: "Cumulative Returns" },
    { id: "prices", label: "Closing Prices" },
    { id: "metrics", label: "Metrics" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Results</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "returns" && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Cumulative Returns Over Time</h3>
            <Line data={returnsChartData} options={chartOptions} />
          </div>
        )}

        {activeTab === "prices" && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Ticker Closing Prices</h3>
            {data.closing_prices_y && data.closing_prices_x ? (
              <Line data={pricesChartData} options={chartOptions} />
            ) : (
              <p className="text-gray-600">Price data not available. Prices must be included in backtest results.</p>
            )}
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">Sharpe Ratio</p>
              <p className="text-3xl font-bold text-blue-600">{data.sharpe.toFixed(3)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">Annual Volatility</p>
              <p className="text-3xl font-bold text-green-600">{data.ann_vol.toFixed(3)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">Max Drawdown</p>
              <p className="text-3xl font-bold text-red-600">{data.max_drawdown.toFixed(3)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 font-semibold">Win Rate</p>
              <p className="text-3xl font-bold text-purple-600">{(data.win_rate*100).toFixed(1)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}