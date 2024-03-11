// EditCustomer.js
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditCustomer = ({ customer, closeModal, updateCustomer }) => {
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });
  const [formError, setFormError] = useState("");

  const handleEditCustomer = async () => {
    try {
      // Perform validation if needed
      if (!editedCustomer.companyName || !editedCustomer.contactName) {
        setFormError("Company Name and Contact Name are required");
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/api/v1/customers/${customer.id}`,
        editedCustomer
      );

      // Check if the update was successful
      if (res.data.success) {
        // Update the customer in the parent component
        updateCustomer(res.data.customer);

        // Close the modal
        closeModal();
        toast.success("Customer updated successfully");
      } else {
        // Handle the case where the update was not successful
        toast.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error editing customer:", error);
      toast.error("Failed to update customer");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 fixed inset-0"></div>
      <div className="bg-white p-6 rounded-md z-10">
        <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-gray-600">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={editedCustomer.companyName}
            onChange={(e) =>
              setEditedCustomer({
                ...editedCustomer,
                companyName: e.target.value,
              })
            }
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
            value={editedCustomer.contactName}
            onChange={(e) =>
              setEditedCustomer({
                ...editedCustomer,
                contactName: e.target.value,
              })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {/* Add other input fields for editing customer data as needed */}
        <div className="flex justify-end">
          <button
            onClick={handleEditCustomer}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mr-2"
          >
            Update
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:shadow-outline-gray"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
