import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners"; // Import loading animation

const AddCustomer = () => {
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [customerData, setCustomerData] = useState({
    companyName: "",
    contactName: "",
    contactTitle: "",
    region: "",
    postalCode: "",
    country: "",
    city: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    try {
      const token = authData?.token; // Replace with your actual storage key
      const res = await axios.post(
        "http://localhost:5000/api/v1/customers",
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Check user role and navigate accordingly
        if (authData && authData.user && authData.user.role === "admin") {
          navigate("/admin/customers"); // Redirect to the admin customers page
        } else {
          navigate("/user/dashboard"); // Redirect to the user dashboard
        } // Redirect to the customers page after adding a customer
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleAddCustomer}
        className="w-full max-w-md p-4 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-600">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={customerData.companyName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactName" className="block text-gray-600">
              Contact Name
            </label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={customerData.contactName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactTitle" className="block text-gray-600">
              Contact Title
            </label>
            <input
              type="text"
              id="contactTitle"
              name="contactTitle"
              value={customerData.contactTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="region" className="block text-gray-600">
              Region
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={customerData.region}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-gray-600">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={customerData.postalCode}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-600">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={customerData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-600">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={customerData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-600">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={customerData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:shadow-outline-blue"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" loading={true} size={24} /> // Show loading animation
          ) : (
            "Add Customer" // Show normal text when not loading
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
