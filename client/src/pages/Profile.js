import { useEffect, useState } from "react";

// Profile page
const Profile = () => {
  const [user, setUser] = useState(null);

  console.log("user profile page");

  useEffect(() => {
    // Retrieve user data from localStorage based on the auth key
    const authData = JSON.parse(localStorage.getItem("auth"));
    console.log(authData);

    if (authData && authData.user) {
      setUser(authData.user);
    } else {
      // Handle the case where user data is not available
      console.error("User data not found in localStorage");
    }
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-md mx-auto mt-20 rounded-sm">
        {user && (
          <div className="bg-white shadow-md rounded-md p-6">
            <h3 className="text-lg font-bold text-center mb-4">
              {user.username}
            </h3>

            <div className="flex justify-center">
              <img
                src={`https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg`}
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
    </div>
  );
};

export default Profile;
