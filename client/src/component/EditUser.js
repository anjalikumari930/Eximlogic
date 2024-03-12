import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EditUser = ({ user, closeModal, updateUser }) => {
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    password: "", // Add a password field
  });

  const handleEditUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      const res = await axios.patch(
        `http://localhost:5000/api/v1/auth/users/${user._id}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user in the parent component
      updateUser(res.data.updatedUser);
      toast.success(res.data.message);
      
      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-md mx-auto my-6">
        {/*content*/}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blue-200 rounded-t">
            <h3 className="text-2xl font-semibold">Edit User</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeModal}
            >
              <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={editedUser.username}
              onChange={(e) =>
                setEditedUser({ ...editedUser, username: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="role" className="block mt-4 text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              id="role"
              value={editedUser.role}
              onChange={(e) =>
                setEditedUser({ ...editedUser, role: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            />

            <label htmlFor="password" className="block mt-4 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={editedUser.password}
              onChange={(e) =>
                setEditedUser({ ...editedUser, password: e.target.value })
              }
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blue-200 rounded-b">
            <button
              className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={handleEditUser}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
