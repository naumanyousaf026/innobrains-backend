import React from "react";
import {
  HomeIcon,
  CubeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ setSection, handleLogout }) => {
  return (
    <div className="w-1/5 h-screen bg-gray-100 p-4 flex flex-col justify-between">
      {/* Top Section: Logo and Links */}
      <div>
        {/* Logo at the top */}
        <div className="mb-8">
          <img
            src={
              "https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
            }
            alt="Logo"
            className="w-40 mx-auto"
          />
        </div>

        {/* Sidebar links */}
        <div className="flex flex-col gap-6">
          <button
            onClick={() => setSection("dashboard")}
            className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <HomeIcon className="h-6 w-6" />
            Dashboard
          </button>
          <button
            onClick={() => setSection("products")}
            className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <CubeIcon className="h-6 w-6" />
            Products
          </button>
          <button
            onClick={() => setSection("services")}
            className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <BriefcaseIcon className="h-6 w-6" />
            Services
          </button>
          <button
            onClick={() => setSection("blogs")}
            className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <NewspaperIcon className="h-6 w-6" />
            Blogs
          </button>
          <button
            onClick={() => setSection("team")}
            className="flex items-center gap-3 p-2 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <UsersIcon className="h-6 w-6" />
            Team
          </button>
        </div>
      </div>

      {/* Bottom Section: Logout Button */}
      <div className="mt-8">
        <button
          onClick={handleLogout} // Call handleLogout when the button is clicked
          className="flex items-center justify-center w-full p-2 text-lg font-medium bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
