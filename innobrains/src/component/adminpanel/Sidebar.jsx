import React from "react";
import {
  HomeIcon,
  CubeIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ setSection, handleLogout, isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full bg-gray-100 p-4 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[20%]`}
      >
        <div className="mb-8">
          <img
            src="https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
            alt="Logo"
            className="w-40 mx-auto"
          />
        </div>

        <div className="flex flex-col gap-6">
          <button
            onClick={() => setSection("dashboard")}
            className="flex items-center gap-3 ml-5 p-3 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <HomeIcon className="h-6 w-6" />
            Dashboard
          </button>
          <button
            onClick={() => setSection("products")}
            className="flex items-center gap-3 ml-5 p-3 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <CubeIcon className="h-6 w-6" />
            Products
          </button>
          <button
            onClick={() => setSection("services")}
            className="flex items-center gap-3 ml-5 p-3 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <BriefcaseIcon className="h-6 w-6" />
            Services
          </button>
          <button
            onClick={() => setSection("blogs")}
            className="flex items-center gap-3 ml-5 p-3 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <NewspaperIcon className="h-6 w-6" />
            Blogs
          </button>
          <button
            onClick={() => setSection("team")}
            className="flex items-center gap-3 ml-5 p-3 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <UsersIcon className="h-6 w-6" />
            Team
          </button>
          <button
            onClick={() => setSection("visitor")}
            className="flex items-center gap-3 ml-5 p-3 text-lg font-medium hover:bg-blue-500 hover:text-white rounded-md"
          >
            <UsersIcon className="h-6 w-6" />
            Users
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="flex w-full text-lg font-medium ml-5 p-3 hover:bg-red-500 hover:text-white rounded-md"
          >
            <FontAwesomeIcon icon={faPowerOff} className="me-2 mt-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
