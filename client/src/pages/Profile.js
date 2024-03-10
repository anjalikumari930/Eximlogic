import { useEffect, useState } from "react";

// Profile page
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage based on the user ID
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 rounded-sm">
      {user && (
        <div className="bg-white shadow-md rounded-md p-6">
          <h3 className="text-lg font-bold text-center mb-4">
            {user.username}
          </h3>
          {/* Display GitHub username */}

          <div className="flex justify-center">
            <img
              src={`https://randomuser.me/api/portraits/men/${Math.floor(
                Math.random() * 100
              )}.jpg`}
              alt="Random User"
              className="w-34 h-34 rounded-full"
            />
          </div>

          <p className="text-gray-600 mb-2 mt-2 font-bold">
            Email: {user.email}
          </p>
          <p className="text-gray-600 mb-2 mt-2 font-bold">
            Role: {user.role}
          </p>
          {/* Add more user details here */}
        </div>
      )}
    </div>
  );
};

export default Profile;
