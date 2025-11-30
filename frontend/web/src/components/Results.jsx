import { useState } from "react";
import Chart from "./Chart";

export default function Results({data}){
  const [activeTab, setActiveTab] = useState("returns");

  const returnsChartData = {
    labels: data.dates,
    datasets: [{ 
      label: "Cumulative Returns", 
      data: data.cum_returns, 
      fill: true,
      borderColor: "#60a5fa",
      backgroundColor: "rgba(96,165,250,0.08)",
      tension: 0.1
    }]
  };

  const pricesChartData = {
    labels: data.dates,
    datasets: [
      { 
        label: data.y_label || "Y",
        data: data.closing_prices_y || [], 
        fill: false,
        borderColor: "#34d399",
        tension: 0.1
      },
      { 
        label: data.x_label || "X",
        data: data.closing_prices_x || [], 
        fill: false,
        borderColor: "#f87171",
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: { position: 'top' }
    }
  };

  const tabs = [
    { id: "returns", label: "Cumulative Returns" },
    { id: "prices", label: "Closing Prices" },
    { id: "metrics", label: "Metrics" }
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 text-gray-100">
      <h2 className="text-2xl font-bold mb-6">Results</h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === tab.id
                ? "border-b-2 border-blue-400 text-blue-300"
                : "text-gray-400 hover:text-gray-200"
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
            <h3 className="text-lg font-semibold mb-4">Cumulative Returns Over Time</h3>
            <Chart data={returnsChartData} options={chartOptions} />
          </div>
        )}

        {activeTab === "prices" && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Ticker Closing Prices</h3>
            {data.closing_prices_y && data.closing_prices_x ? (
              <Chart data={pricesChartData} options={chartOptions} />
            ) : (
              <p className="text-gray-400">Price data not available. Prices must be included in backtest results.</p>
            )}
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 font-semibold">Sharpe Ratio</p>
              <p className="text-3xl font-bold text-blue-300">{data.sharpe.toFixed(3)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 font-semibold">Annual Volatility</p>
              <p className="text-3xl font-bold text-green-300">{data.ann_vol.toFixed(3)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 font-semibold">Max Drawdown</p>
              <p className="text-3xl font-bold text-red-300">{data.max_drawdown.toFixed(3)}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 font-semibold">Win Rate</p>
              <p className="text-3xl font-bold text-purple-300">{(data.win_rate*100).toFixed(1)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}