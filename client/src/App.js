import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForbiddenPage from "./pages/ForbiddenPage";
import ProtectedRoute from "./routes/protectedRoutes";
import UserLayout from "./components/layout/UserLayout";

import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/restricted" element={<ForbiddenPage />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserLayout>
                <Routes>
                  <Route path="/profile" element={<Profile />} />
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
                  <Route path="/profile" element={<Profile />} />
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
