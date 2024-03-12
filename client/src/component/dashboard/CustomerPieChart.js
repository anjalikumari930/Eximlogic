import React from 'react';
import ApexCharts from 'react-apexcharts';

const CustomerPieChart = ({ totalCustomers }) => {
    const chartOptions = {
        series: [totalCustomers],
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Total Customers'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      };
    
      return (
        <div id="totalCustomerPieChart">
          <ApexCharts options={chartOptions} series={chartOptions.series} type="pie" width={380} />
        </div>
      );
    };
    
    

export default CustomerPieChart;
