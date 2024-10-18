import React from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Import icons
// import arsid from "../../images/ar";

const Header = () => {
  return (
    <div className="w-full bg-white p-4 shadow-md flex justify-between items-center">
      {/* Left Side - Search Bar */}
      <div className="flex items-center gap-2  max-w-lg">
        <div className="flex items-center border rounded-md w-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 ml-3" />
          <input
            type="text"
            placeholder="Search"
            className="border-none p-2 w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Right Side - Notification Icon and User Profile Image */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

        {/* User Profile Image */}
        <div className="relative">
          <img
            src={
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
