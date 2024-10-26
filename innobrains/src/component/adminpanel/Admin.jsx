import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductSection from "./ProductSection";
import Dashboard from "./Dashboard";
import Blog from "./Blog";
import Team from "./Team";
import Service from "./Service";
import Visitor from "./Visitor";

const Admin = () => {
  const [section, setSection] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex">
      <Sidebar
        setSection={setSection}
        handleLogout={handleLogout}
        isOpen={sidebarOpen}
      />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-48" : "ml-0"
        } md:ml-64`} // Adjust margin for the sidebar width
      >
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="p-6">
          {section === "dashboard" && <Dashboard />}
          {section === "products" && <ProductSection />}
          {section === "services" && <Service />}
          {section === "blogs" && <Blog />}
          {section === "team" && <Team />}
          {section === "visitor" && <Visitor />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
