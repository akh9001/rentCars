import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import ChartRevenue from "../Chart/ChartRevenue";
import ChartOrders from "../Chart/ChartOrders";



export default function SalesCharts() {
    
    const [selectedChart, setSelectedChart] = useState('revenues');

    const handleChartChange = (chartType) => {
      setSelectedChart(chartType);
    };
  
    return (
        <div className="border rounded-2xl border-zinc-400 p-10 my-10 w-full h-68">
        <div className="flex w-full items-center justify-between my-2">
          <div className="flex items-center">
            <h1 className="font-bold text-black text-xl mr-2">Sales over time</h1>
            <BiInfoCircle className=" float-right text-zinc-500" />
          </div>
          <div>
            <button className={`border-zinc-500 text-sm shadow-sm hover:shadow-lg border hover:bg-slate-100 rounded-md px-3 py-1 m-1 ${selectedChart === 'revenues' ? 'bg-slate-100' : ''}`}
              onClick={() => handleChartChange('revenues')}>Revenues</button>

            <button className={`border-zinc-500 text-sm shadow-sm hover:shadow-lg border hover:bg-slate-100 rounded-md px-3 py-1 m-1 ${selectedChart === 'orderItems' ? 'bg-slate-100' : ''}`}
              onClick={() => handleChartChange('orderItems')}>Order Items</button>
          </div>
        </div>

        {selectedChart === 'revenues' ? <ChartRevenue /> : <ChartOrders />}

      </div>
    );
}
