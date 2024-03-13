import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader"; // Import loading animation

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password", {
        email,
      });
      if (res && res.data.success) {
        toast.success("Password reset Request sent to Admin");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // Reset loading state
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
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" loading={true} size={24} /> // Show loading animation
            ) : (
              "RESET"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
