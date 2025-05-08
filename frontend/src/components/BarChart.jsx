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
    fetchBarChart();
  }, [fetchBarChart]);

  const genders = ['male', 'female'];
  const labels = Array.from(new Set(barChartData.map((d) => d.age))).sort((a, b) => a - b);

  const genderData = {
    male: [],
    female: [],
  };

  labels.forEach((age) => {
    genders.forEach((gender) => {
      const total = barChartData
        .filter((d) => d.age === age && d.gender === gender)
        .reduce((sum, d) => sum + Number(d.count), 0);
      genderData[gender].push(total);
    });
  });

  const allCounts = [...genderData.male, ...genderData.female];
  const maxCount = Math.max(...allCounts);
  const yMax = Math.ceil(maxCount * 1.2) || 1; // avoid 0

  const data = {
    labels,
    datasets: [
      {
        label: 'Male',
        data: genderData.male,
        backgroundColor: '#3B82F6',
      },
      {
        label: 'Female',
        data: genderData.female,
        backgroundColor: '#EC4899',
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
        beginAtZero: true,
        suggestedMax: yMax,
        ticks: {
          color: '#6b7280',
          stepSize: 1,
          precision: 0,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white border-2 border-[#e8e8e8] rounded-xl w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Submission by Gender</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
