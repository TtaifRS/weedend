/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { MdUpdate } from 'react-icons/md';
import { BsBoxSeam, BsFillCalendar2WeekFill, BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import CardStats from './CardStats';
import Loader from './Loader';
import { useStatsStore, useTokenStore } from '../store';

const Header = () => {
  const token = useTokenStore((state) => state.token);
  const loading = useStatsStore((state) => state.loading);
  const error = useStatsStore((state) => state.error);
  const fetchStats = useStatsStore((state) => state.fetchStats);

  useEffect(() => {
    const fetch = async () => {
      await fetchStats(token);
    };
    fetch();
  }, [fetchStats]);

  const total = useStatsStore((state) => state.total);
  const byCatergory = useStatsStore((state) => state.byCategory);
  const numberOfUpdatedProduct = useStatsStore((state) => state.numberOfUpdatedProduct);
  const currentMonth = useStatsStore((state) => state.currentMonth);
  const previousMonth = useStatsStore((state) => state.previousMonth);
  const currentWeek = useStatsStore((state) => state.currentWeek);
  const previousWeek = useStatsStore((state) => state.previousWeek);

  if (!loading) {
    const monthNow = currentMonth.length ? currentMonth[0].Total : 0;
    const monthAgo = previousMonth.length ? previousMonth[0].Total : 0;

    const weekNow = currentWeek.length ? currentWeek[0].Total : 0;
    const weekAgo = previousWeek.length ? previousWeek[0].Total : 0;

    const monthDiff = monthNow - monthAgo;
    const weekDiff = weekNow - weekAgo;

    return (
      <div className="relative bg-green-300 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap justify-around">
              {/* card 1 */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  mainTitle="Total Product"
                  mainNumber={total}
                  StatIcon={<BsBoxSeam className="text-yellow-500" />}
                  statNumber={byCatergory.length}
                  statDesc="categories"
                  statColor="text-yellow-500"

                />
              </div>
              {/* card 2 */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  mainTitle="Total Updated Product"
                  mainNumber={
                    numberOfUpdatedProduct.map((i) => (i._id === true ? i.count : ''))
                  }
                  StatIcon={<MdUpdate className="text-lime-300" />}
                  statNumber={Math.abs(monthDiff)}
                  statDesc={monthDiff >= 0 ? 'more than last month' : 'less than last month'}
                  ArrowIcon={monthDiff >= 0 ? <BsArrowUpShort /> : <BsArrowDownShort />}
                  statColor={monthDiff >= 0 ? 'text-green-700' : 'text-red-700'}
                />
              </div>
              {/* card 3 */}
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  mainTitle="Updated This Week"
                  mainNumber={weekNow}
                  StatIcon={<BsFillCalendar2WeekFill className="text-orange-500" />}
                  statNumber={Math.abs(weekDiff)}
                  statDesc={weekDiff >= 0 ? 'more than last week' : 'less than last week'}
                  ArrowIcon={weekDiff >= 0 ? <BsArrowUpShort /> : <BsArrowDownShort />}
                  statColor={weekDiff >= 0 ? 'text-green-800' : 'text-red-700'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    console.log(error);
    return (
      <div>error</div>
    );
  }
  return (
    <div><Loader /></div>
  );
};

export default Header;
