import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const ForgotPasssword = () => {
  const [email, setEmail] = useState("");


  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", {
        email,
       
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md border">
    <form onSubmit={handleSubmit}>
      <h4 className="text-2xl font-semibold mb-4">RESET PASSWORD</h4>

      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
          id="exampleInputEmail1"
          placeholder="Enter Your Email"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-primary-dark"
      >
        RESET
      </button>
    </form>
  </div>
  </div>
    
  );
};

export default ForgotPasssword;
