import React, { useState } from "react";
import { DateRange } from 'react-date-range';
import { GrCloudDownload, GrDown, GrShareOption, GrUp } from "react-icons/gr";
import { BsCalendarDate } from "react-icons/bs";
import PerformanceOverview from "../components/Admin/DashboardBody/PerformanceOverview";
import Promoting from "../components/Admin/DashboardBody/Promoting";
import TopPlacements from "../components/Admin/DashboardBody/TopPlacements";
import SalesCharts from "../components/Admin/DashboardBody/SalesCharts";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import TopPlacementsByCategories from "../components/Admin/DashboardBody/TopPlacementsByCategories";


export default function GeneralDashboard() {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      key: 'selection',
    },
  ]);


  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

  const handleSelect = (ranges) => {
    setSelectedRange([ranges.selection]);
    console.log([ranges.selection]);
  };
  const toggleDateRange = () => {
    setIsDateRangeVisible(!isDateRangeVisible);
    console.log(isDateRangeVisible);
  };

  return (
    <div className="large:p-32 relative w-full px-8 pt-24">
      <div className='w-full large:flex large:justify-between large:items-center'>
        <h1 className='font-bold text-3xl'>General dashboard</h1>

        <div className="flex ">
          <button
            className="flex items-center hover:shadow-lg border-zinc-500 text-xs large:text-sm shadow-sm border hover:bg-slate-100 rounded-md px-3 py-1 m-1"
            onClick={toggleDateRange}
          >
            <BsCalendarDate size={15} className="text-zinc-700 mr-2" />
            {selectedRange[0].startDate.toLocaleDateString()} - {selectedRange[0].endDate.toLocaleDateString()}
            
            {isDateRangeVisible ? <GrUp size={15} className="text-zinc-700 ml-2" /> : <GrDown size={15} className="text-zinc-700 ml-2" />}
             
          </button>

          {isDateRangeVisible && (
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={selectedRange}
                className=" absolute z-30 top-44 right-34 shadow-md"
              />
          )}
          <button className=' flex hover:shadow-lg items-center border-zinc-500 text-xs large:text-sm shadow-sm border hover:bg-slate-100 rounded-md px-3 py-1 m-1'>
            <GrCloudDownload size={15} className=" text-zinc-700 mr-2" /> Download
          </button>
          <button className=' flex hover:shadow-lg items-center border-zinc-500 text-xs large:text-sm shadow-sm border hover:bg-slate-100 rounded-md px-3 py-1 m-1'>
            <GrShareOption size={15} className=" text-zinc-700 mr-2" /> Share Board
          </button>
        </div>
      </div>

      <PerformanceOverview />

      <TopPlacements />

      <Promoting />

      <SalesCharts/>

      <TopPlacementsByCategories/>      

    </div>
  );
}
