import BacktestForm from "./components/BacktestForm";


export default function App(){
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto text-gray-100">
        <h1 className="text-4xl font-bold mb-2">Pairs Trading Backtester</h1>
        <p className="text-gray-300 mb-6">Analyze pairs trading strategies with real market data</p>
        <BacktestForm />
      </div>
    </div>
  );
}