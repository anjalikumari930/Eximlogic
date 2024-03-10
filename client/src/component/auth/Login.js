import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        username,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
        <div className="text-2xl text-center">login</div>
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
              type="username"
              placeholder=""
              value={username} // Bind value to the state variable
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="block">
              password
            </label>
            <input
              id="password"
              type="password"
              value={password} // Bind value to the state variable
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 bg-primary text-white rounded-xl focus:outline-none focus:bg-primary-dark"
            onClick={handleSubmit}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
