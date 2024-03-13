import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Import loading animation

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
  
    // Form validation
    if (!username || !email || !password || !role) {
      setIsLoading(false); // Reset loading state
      setFormError("All fields are required");
      return;
    }
  
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
  
    axios
      .post(
        "http://localhost:5000/api/v1/auth/register",
        {
          username,
          email,
          password,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setIsLoading(false); // Reset loading state
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/admin/users");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false); // Reset loading state
        console.error("Error during registration:", error);
        toast.error("User Or Email Already Registered");
      });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-full max-w-sm p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-600">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-400 focus:outline-none focus:shadow-outline-blue"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" loading={true} size={24} /> // Show loading animation
          ) : (
            "Register" // Show normal text when not loading
          )}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
