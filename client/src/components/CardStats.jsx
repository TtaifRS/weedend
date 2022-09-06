import React from 'react';

const CardStats = ({ mainTitle, mainNumber, StatIcon, statNumber, statDesc, ArrowIcon, statColor }) => (
  <div className="relative flex flex-col min-w-0 break-words bg-black rounded mb-6 xl:mb-0 shadow-lg">
    <div className="p-4 flex-auto">
      <div className="flex flex-wrap">
        <div className="w-full relative pr-4 max-w-full flex-grow flex-1">
          <p className="text-gray-400 uppercase font-bold text-xs">
            {mainTitle}
          </p>
          <span className="font-semibold text-xl text-yellow-100">
            {mainNumber}
          </span>
        </div>
        <div className="w-auto relative pl-4 flex-initial">
          <div className="bg-slate-600 p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full">
            {StatIcon}
          </div>
        </div>
      </div>
      <div className={`text-sm mt-4 flex font-semibold ${statColor}`}>
        <div className="mr-1 flex justify-center">
          {statNumber}
          <span>
            {ArrowIcon}
          </span>

        </div>
        <div className="whitespace-nowrap">{statDesc}</div>
      </div>
    </div>
  </div>
);

export default CardStats;
