import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars, react/prop-types
const ProtectedRoute = ({ children, allowedRoles }) => {
  //const navigate = useNavigate();

  const authData = JSON.parse(localStorage.getItem("auth"));

  // Check if the user is authenticated
  const isAuthenticated = !!authData && !!authData.token;

  // Check if the user has the required role
  const userRole = authData ? authData.user.role : null;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated or if the role is not allowed
    return <Navigate to="/" />;
  }
  // eslint-disable-next-line no-unused-vars, react/prop-types
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/restricted" />;
  }

  return children;
};

export default ProtectedRoute;
