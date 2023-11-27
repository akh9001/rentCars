import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartRevenue = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: 'Revenues',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      colors: ['#FF8811'],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartOptions.options}
        series={chartOptions.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ChartRevenue;
