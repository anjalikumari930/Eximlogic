import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EditUser from "../component/EditUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Fetch users data from the API
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const res = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      await axios.delete(`http://localhost:5000/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted user from the local state
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 mt-10 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <Link
          to="/admin/add-user"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Add User
        </Link>
      </div>

      {/* Display users in a table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border py-2 px-4">Username</th>
            <th className="border py-2 px-4">Email</th>
            <th className="border py-2 px-4">Role</th>
            <th className="border py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border py-2 px-4">{user.username}</td>
              <td className="border py-2 px-4">{user.email}</td>
              <td className="border py-2 px-4">{user.role}</td>
              <td className="border py-2 px-4 flex justify-around">
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <AiOutlineEdit />
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  <AiOutlineDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUser
          user={selectedUser}
          closeModal={() => setIsEditModalOpen(false)}
          updateUser={(updatedUser) => {
            // Update the user in the local state
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
              )
            );

            // Close the modal
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Users;
