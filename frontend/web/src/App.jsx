import BacktestForm from "./components/BacktestForm";


export default function App(){
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pairs Trading Backtester</h1>
      <BacktestForm />
    </div>
  );
}