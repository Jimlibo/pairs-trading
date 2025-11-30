import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api/v1";


export async function runBacktest(params) {
  const res = await axios.post(`${API_BASE}/backtest`, params);
  return res.data;
}