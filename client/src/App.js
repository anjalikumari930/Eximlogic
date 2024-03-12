import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForbiddenPage from "./pages/ForbiddenPage";
import ProtectedRoute from "./routes/protectedRoutes"; 
import Profile from "./pages/Profile";
import UserLayout from "./component/layout/UserLayout";
import Register from "./pages/Register";
import ForgotPasssword from "./pages/ForgotPassword";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomers";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/restricted" element={<ForbiddenPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserLayout>
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/add-user" element={<AddUser />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/add-customer" element={<AddCustomer />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <UserLayout>
                <Routes>
                  <Route path="/user-profile" element={<Profile />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/add-customer" element={<AddCustomer />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </UserLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
