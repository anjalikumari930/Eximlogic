import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import react-icons
import EditCustomer from "./EditCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("auth"))?.token;

  useEffect(() => {
    // Fetch customers data from the API
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/customers?page=${currentPage}&limit=10&search=${searchTerm}`,
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setCustomers(res.data.customers);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [currentPage, searchTerm , token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    // Update the customer in the local state
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) =>
        cust.id === updatedCustomer.id ? updatedCustomer : cust
      )
    );

    // Close the modal
    setIsEditModalOpen(false);
  };


  const handleDeleteCustomer = async (customerId) => {
    try {
      // Display a confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to delete this customer?");
  
      if (!isConfirmed) {
        // User canceled the deletion
        return;
      }
  
      const res = await axios.delete(
        `http://localhost:5000/api/v1/customers/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
      if (res.data.success) {
        // Reload the customers after deletion
        setCurrentPage(1);
        setSearchTerm("");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 mt-10 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customers</h2>
        <Link
          to="/admin/add-customer"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Add Customer
        </Link>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search customers..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Display customers in a table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border py-2 px-4">ID</th>
            <th className="border py-2 px-4">Company Name</th>
            <th className="border py-2 px-4">Contact Name</th>
            <th className="border py-2 px-4">Contact Title</th>
            <th className="border py-2 px-4">Region</th>
            <th className="border py-2 px-4">Country</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="border py-2 px-4">{customer.id}</td>
              <td className="border py-2 px-4">{customer.companyName}</td>
              <td className="border py-2 px-4">{customer.contactName}</td>
              <td className="border py-2 px-4">{customer.contactTitle}</td>
              <td className="border py-2 px-4">{customer.region}</td>
              <td className="border py-2 px-4">{customer.country}</td>
              <td className="border py-2 px-4">
                <button
                  onClick={() => handleEditCustomer(customer)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="text-red-500 hover:text-red-700 ml-2 focus:outline-none"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {/* Edit Customer Modal */}
      {isEditModalOpen && (
        <EditCustomer
          customer={selectedCustomer}
          closeModal={() => setIsEditModalOpen(false)}
          updateCustomer={handleUpdateCustomer}
        />
      )}
    </div>
  );
};

export default Customers;
