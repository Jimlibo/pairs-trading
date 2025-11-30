import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

// register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Chart({ data, options }) {
  // default dark theme options, merged with provided options
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: { size: 12 }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17,24,39,0.95)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb'
      }
    },
    scales: {
      x: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(255,255,255,0.03)' }
      },
      y: {
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(255,255,255,0.03)' }
      }
    }
  };

  const merged = Object.assign({}, defaultOptions, options || {});

  return (
    <div style={{ height: 360 }}>
      <Line data={data} options={merged} />
    </div>
  );
}
