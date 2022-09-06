import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useStatsStore } from '../store';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie = () => {
  const loading = useStatsStore((state) => state.loading);
  const byCategory = useStatsStore((state) => state.byCategory);

  if (!loading) {
    const dataSet = {
      label: [],
      amount: [],
      bgColor: [],
      brdrColor: [],
    };
    byCategory.map((i) => {
      dataSet.label.push(i._id);
      dataSet.amount.push(i.count);
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      const rgb = `${r}, ${g}, ${b}`;
      const rgbaBG = `rgba(${rgb}, 0.6)`;
      const rgbaBrdr = `rgba(${rgb}, 1)`;
      dataSet.bgColor.push(rgbaBG);
      dataSet.brdrColor.push(rgbaBrdr);
      return dataSet;
    });

    const data = {
      labels: dataSet.label,
      datasets: [
        {
          label: '# of products',
          data: dataSet.amount,
          backgroundColor: dataSet.bgColor,
          borderColor: dataSet.brdrColor,
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="relative flex flex-col min-w-0 break-words w-full  mb-6 shadow-lg rouded bg-slate-800">
        <div className="rounded-t mb-0 px-4 py-3">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <p className="uppercase text-slate-100 mb-1 text-xs font-semibold">
                Overview
              </p>
              <p className="text-xl text-slate-200 font-semibold">
                Category
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 md:p-20 flex-auto">
          <div className="relative h-full">
            <Pie data={data} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>Loading</div>
  );
};

export default ChartPie;
