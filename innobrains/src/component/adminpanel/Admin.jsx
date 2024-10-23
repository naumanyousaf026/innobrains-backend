import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductSection from "./ProductSection";
import Dashboard from "./Dashboard";
import Blog from "./Blog";
import Team from "./Team";
import Service from "./Service";
const Admin = () => {
  const [section, setSection] = useState("products"); // Default section
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex">
      {/* Pass handleLogout to Sidebar */}
      <Sidebar setSection={setSection} handleLogout={handleLogout} />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          {section === "dashboard" && (
            <div>
              <Dashboard />
            </div>
          )}
          {section === "products" && <ProductSection />}
          {section === "services" && (
            <div>
              <Service />
            </div>
          )}
          {section === "blogs" && (
            <div>
              <Blog />
            </div>
          )}
          {section === "team" && (
            <div>
              <Team />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
