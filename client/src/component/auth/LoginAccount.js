import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        const { user, token, message } = res.data;
  
        localStorage.setItem("auth", JSON.stringify({ user, token }));
        toast.success(message);
  
        // Check user role and navigate accordingly
        if (user.role === "employee") {
          navigate("/user/dashboard");
        } else if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          // Handle other roles or navigate to a default page
          navigate("/");
        }
      } else {
        toast.error(res.data.message);
      }

    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="w-full m-auto bg-white lg:max-w-lg border p-4 shadow-md">
        <div className="text-2xl text-center">Login</div>
        <div className="text-center">
          Enter your username and password to login
        </div>
        <div className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl focus:outline-none focus:bg-primary-dark"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary underline">
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-primary underline">
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAccount;
