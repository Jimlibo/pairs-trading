import { useState } from "react";
import { runBacktest } from "../api";
import Results from "./Results";


export default function BacktestForm(){
  const [params,setParams] = useState({ y_ticker: "KO", x_ticker: "PEP", start_date:"2015-01-01", entry_z: 2.0, exit_z: 0.5, lookback: 20, tc: 0.0005 });
  const [results,setResults] = useState(null);
  const [loading,setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await runBacktest(params);
      setResults(res);
    } catch (err) {
      alert("Backtest error: "+err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-800">
      <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Y Ticker</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded text-gray-800 focus:outline-none focus:border-blue-500" 
              value={params.y_ticker} 
              onChange={e=>setParams({...params,y_ticker:e.target.value})} 
              placeholder="e.g., KO"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">X Ticker</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded text-gray-800 focus:outline-none focus:border-blue-500" 
              value={params.x_ticker} 
              onChange={e=>setParams({...params,x_ticker:e.target.value})} 
              placeholder="e.g., PEP"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded text-gray-800 focus:outline-none focus:border-blue-500" 
              type="date"
              value={params.start_date} 
              onChange={e=>setParams({...params,start_date:e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Entry Z-Score</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded text-gray-800 focus:outline-none focus:border-blue-500" 
              type="number" 
              step="0.1"
              value={params.entry_z} 
              onChange={e=>setParams({...params,entry_z:parseFloat(e.target.value)})} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Exit Z-Score</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded text-gray-800 focus:outline-none focus:border-blue-500" 
              type="number" 
              step="0.1"
              value={params.exit_z} 
              onChange={e=>setParams({...params,exit_z:parseFloat(e.target.value)})} 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Lookback Period</label>
            <input 
              className="w-full border border-gray-300 p-2 rounded text-gray-800 focus:outline-none focus:border-blue-500" 
              type="number"
              value={params.lookback} 
              onChange={e=>setParams({...params,lookback:parseInt(e.target.value)})} 
            />
          </div>
        </div>

        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition" 
          disabled={loading}
        >
          {loading ? "Running..." : "Run Backtest"}
        </button>
      </form>

      {results && <Results data={results} />}
    </div>
  );
}