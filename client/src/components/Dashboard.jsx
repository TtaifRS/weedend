import React from 'react';
import ChartBar from './ChartBar';
import ChartPie from './ChartPie';

const Dashboard = () => (
  <div className="flex flex-wrap">
    <div className="w-full xl:w-1/2 mb-12 xl:mb-0 px-4 z-10">
      <ChartPie />
    </div>
    <div className="w-full xl:w-1/2 mb-12 xl:mb-0 px-4 z-10">
      <ChartBar />
    </div>

  </div>
);

export default Dashboard;
