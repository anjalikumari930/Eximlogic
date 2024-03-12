import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import EditUser from "../component/EditUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const res = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: currentPage,
            limit: 10, // You can adjust the limit as needed
            search: searchTerm,
            sort: sortBy,
            order: sortOrder,
          },
        });

        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm, sortBy, sortOrder]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
      if (!isConfirmed) {
        return;
      }
  
      const token = JSON.parse(localStorage.getItem("auth"))?.token;
      await axios.delete(`http://localhost:5000/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />

      {/* Display users in a table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border py-2 px-4" onClick={() => handleSort("username")}>
              Username
            </th>
            <th className="border py-2 px-4" onClick={() => handleSort("email")}>
              Email
            </th>
            <th className="border py-2 px-4" onClick={() => handleSort("role")}>
              Role
            </th>
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

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-2 p-2 border ${page === currentPage ? 'bg-gray-300' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUser
          user={selectedUser}
          closeModal={() => setIsEditModalOpen(false)}
          updateUser={(updatedUser) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
              )
            );

            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Users;
