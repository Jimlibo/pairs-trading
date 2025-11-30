import BacktestForm from "./components/BacktestForm";


export default function App(){
  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-900">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Pairs Trading Backtester</h1>
      <p className="text-gray-600 mb-6">Analyze pairs trading strategies with real market data</p>
      <BacktestForm />
    </div>
  );
}