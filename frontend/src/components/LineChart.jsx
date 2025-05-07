import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const hardcodedData = [
  { age: 15, vaccinated: 2, unvaccinated: 1 },
  { age: 16, vaccinated: 4, unvaccinated: 3 },
  { age: 17, vaccinated: 1, unvaccinated: 5 },
  { age: 18, vaccinated: 3, unvaccinated: 2 },
  { age: 19, vaccinated: 3, unvaccinated: 2 },
];

const LineChart = () => {

  const labels = hardcodedData.map((item) => item.age);

  const data = {
    labels,
    datasets: [
      {
        label: 'Vaccinated',
        data: hardcodedData.map((item) => item.vaccinated),
        borderColor: '#16a34a', // Tailwind green-600
        backgroundColor: '#16a34a40',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Unvaccinated',
        data: hardcodedData.map((item) => item.unvaccinated),
        borderColor: '#dc2626', // Tailwind red-600
        backgroundColor: '#dc262640',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151', // Tailwind gray-700
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          color: '#6b7280', // Tailwind gray-500
        },
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb', // Tailwind gray-200
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of People',
          color: '#6b7280',
        },
        ticks: {
          color: '#6b7280',
          beginAtZero: true,
          stepSize: 1,
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white border-2 border-[#e8e8e8] rounded-xl w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Vaccination by Age</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart
