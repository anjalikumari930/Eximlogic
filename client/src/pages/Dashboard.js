import React from "react";
import CustomersChart from "../component/dashboard/CustomersChart";
import PieChart from "../component/dashboard/PieChart";
import CustomerPieChart from "../component/dashboard/CustomerPieChart";
import SalesChart from "../component/dashboard/SalesChart";

const Dashboard = () => {
  return (
    <div className="h-screen overflow-auto ">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 mt-10 sm:ml-48 justify-center items-center w-auto shadow-lg border-rounded">
        <div className="flex flex-col md:flex-row md:space-x-4 sm:ml-20 ">
          <PieChart />
          <CustomerPieChart totalCustomers={150} />
        </div>
        <CustomersChart />
        <SalesChart />
      </div>
    </div>
  );
};

export default Dashboard;