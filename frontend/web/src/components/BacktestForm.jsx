import { useState } from "react";
import { runBacktest } from "../api";
import Results from "./Results";


export default function BacktestForm(){
  const [params,setParams] = useState({ y_ticker: "KO", x_ticker: "PEP", start_date:"2015-01-01" });
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
    <div>
      <form onSubmit={submit} className="space-y-4">
        <div className="flex gap-4">
          <input className="border p-2" value={params.y_ticker} onChange={e=>setParams({...params,y_ticker:e.target.value})} />
          <input className="border p-2" value={params.x_ticker} onChange={e=>setParams({...params,x_ticker:e.target.value})} />
          <button className="bg-blue-500 text-white px-4 py-2" disabled={loading}>Run</button>
        </div>
      </form>
      {results && <Results data={results} />}
    </div>
  );
}