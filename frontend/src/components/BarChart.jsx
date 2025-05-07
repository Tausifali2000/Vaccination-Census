import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useCensusStore } from '../store/store';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const { fetchBarChart, barChartData } = useCensusStore();

  useEffect(() => {
    fetchBarChart(); // Fetch on component mount
  }, [fetchBarChart]);

  const genders = ['male', 'female'];

  // Extract unique sorted ages
  const labels = Array.from(new Set(barChartData.map((d) => d.age))).sort((a, b) => a - b);

  // Prepare gender-wise data per age
  const genderData = {
    male: [],
    female: [],
  };

  labels.forEach((age) => {
    genders.forEach((gender) => {
      const match = barChartData.find((d) => d.age === age && d.gender === gender);
      genderData[gender].push(match ? Number(match.count) : 0);
    });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Male',
        data: genderData.male,
        backgroundColor: '#3B82F6', // Tailwind blue-500
      },
      {
        label: 'Female',
        data: genderData.female,
        backgroundColor: '#EC4899', // Tailwind pink-500
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
          color: '#e5e7eb',
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
    <div className="p-6 bg-white border-2 border-[#e8e8e8] rounded-xl w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Gender Distribution by Age</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
