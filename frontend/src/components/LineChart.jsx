import { useEffect } from 'react';
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
import { useCensusStore } from '../store/store.js';



ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const LineChart = () => {
  const { lineChartData, fetchLineChart } = useCensusStore();

 
  useEffect(() => {
    fetchLineChart();
  }, [fetchLineChart]);

  const labels = lineChartData.map((item) => item.age);

  const data = {
    labels,
    datasets: [
      {
        label: 'Vaccinated',
        data: lineChartData.map((item) => item.vaccinated),
        borderColor: '#16a34a',
        backgroundColor: '#16a34a40',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Unvaccinated',
        data: lineChartData.map((item) => item.unvaccinated),
        borderColor: '#dc2626',
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
          color: '#374151',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          color: '#6b7280',
        },
        ticks: {
          color: '#6b7280',
        },
        grid: {
          display: false,
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
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white border-2 border-[#e8e8e8] rounded-xl w-full max-w-3xl mx-auto min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Vaccination by Age</h2>
      <Line data={data} options={options} />
      
    </div>
  );
};

export default LineChart;
