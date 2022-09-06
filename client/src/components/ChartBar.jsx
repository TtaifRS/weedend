import React from 'react';
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
import { useStatsStore } from '../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const formatDate = (date) => {
  const d = new Date(date);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();
  return [year, month, day].join('-');
};

const labels = [...Array(7).keys()].map((index) => {
  let date = new Date();

  date.setDate(date.getDate() - index);
  date = formatDate(date);
  return date;
});

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'update per day',
    },
  },
};
const ChartBar = () => {
  const loading = useStatsStore((state) => state.loading);
  const error = useStatsStore((state) => state.error);
  const updatePerDay = useStatsStore((state) => state.updatePerDay);

  if (error) {
    return <div>error</div>;
  }
  if (!loading) {
    const amount = [0, 0, 0, 0, 0, 0, 0];
    if (updatePerDay.length) {
      updatePerDay.map((i) => {
        const index = (labels.indexOf(i._id));
        amount[index] = i.count;
        return amount;
      });
    }
    const data = {
      labels,
      datasets: [
        {
          label: 'Last 7 Days',
          data: amount,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

      ],
    };

    return (
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Update
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Last 7days
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <Bar data={data} />
          </div>
        </div>
      </div>

    );
  }

  return <div>loading</div>;
};
export default ChartBar;
