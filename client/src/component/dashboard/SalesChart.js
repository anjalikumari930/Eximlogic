import React from 'react';
import ApexCharts from 'react-apexcharts';

const SalesChart = () => {
  const chartOptions = {
    series: [{
      name: "Sales",
      data: [300, 400, 450, 500, 490, 600, 700, 910, 1250]
    }],
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth' // You can adjust the curve type if needed
    },
    title: {
      text: 'Sales Analysis',
      align: 'left'
    },
    subtitle: {
      text: 'Monthly Sales',
      align: 'left'
    },
    xaxis: {
     
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      title: {
        text: 'Sales'
      },
      opposite: true
    },
    legend: {
      horizontalAlign: 'left'
    }
  };

  return (
    <div id="areaChart" className='border p-2'>
      <ApexCharts options={chartOptions} series={chartOptions.series} type="area" height={350} />
    </div>
  );
};

export default SalesChart;
