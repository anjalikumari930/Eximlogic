import ApexCharts from 'react-apexcharts';

const CustomersChart = () => {

  const chartOptions = {
    chart: {
        type: 'bar'
      },
      title: {
        text: 'Customer Analysis',
        align: 'left'
      },
      subtitle: {
        text: 'Monthly Customers',
        align: 'left'
      },
      series: [{
        name: 'Customers',
        data: [30,40,45,50,49,60,70,91,125]
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }
    
    // Add other chart options here
  

  return (
    <div id="barChart" className='border p-2'>
      <ApexCharts options={chartOptions} series={chartOptions.series} type="bar" height={350} />
    </div>
  );
};

export default CustomersChart;