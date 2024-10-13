// src/component/adminpanel/Admin.jsx
// src/component/adminpanel/Admin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import ResetPassword from "./ResetPassword";
const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Token ko localStorage se remove karein
    localStorage.removeItem("authToken");

    // Logout hone ke baad login page pe redirect karein
    navigate("/login");
  };
  return (
    <div>
      <Dashboard />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Admin;
