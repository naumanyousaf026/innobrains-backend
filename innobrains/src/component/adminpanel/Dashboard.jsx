import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faSearch,
  faUserCircle,
  faTachometerAlt,
  faCubes,
  faPuzzlePiece,
  faTable,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons"; // Importing icons
import ResetPassword from "./ResetPassword";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data for charts
  const salesData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15, 30, 25, 40, 35, 60],
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const ordersData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Total Orders",
        data: [20, 10, 25, 20, 15, 30],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-20 lg:z-0 lg:block bg-white shadow-lg w-64 ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-6">
          <img
            src={
              "https://portal.innobrains.pk/files/system/_file64d57376183f5-site-logo.png"
            }
            alt=""
          />
        </div>
        <nav className="mt-10">
          <ul>
            <li className="py-2 px-4 bg-blue-500 text-white rounded-lg mb-2 flex items-center">
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />{" "}
              {/* Dashboard Icon */}
              Dashboard
            </li>
            <Link to="/teamform">
              <li className="py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg mb-2 flex items-center">
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" /> Team
              </li>
            </Link>

            <li className="py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg mb-2 flex items-center">
              <FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" />{" "}
              {/* Components Icon */}
              Components
            </li>
            <li className="py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg mb-2 flex items-center">
              <FontAwesomeIcon icon={faTable} className="mr-2" />{" "}
              {/* Tables Icon */}
              Tables
            </li>
            <li className="py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg mb-2 flex items-center">
              <FontAwesomeIcon icon={faCubes} className="mr-2" />{" "}
              {/* Examples Icon */}
              Examples
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between bg-white p-4 shadow-lg sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FontAwesomeIcon icon={faBars} size="lg" /> {/* Hamburger Icon */}
            </button>
            <div className="relative">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-2.5 text-gray-500"
              />{" "}
              {/* Search Icon */}
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-200 outline-none"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <FontAwesomeIcon icon={faBell} size="lg" />{" "}
            {/* Notifications Icon */}
            <FontAwesomeIcon icon={faUserCircle} size="lg" />{" "}
            {/* Profile Icon */}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                New
              </button>
              <button className="bg-gray-200 px-4 py-2 rounded">Filters</button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-purple-600 text-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">Tasks Completed</h2>
              <p className="mt-4 text-4xl">8/24</p>
              <div className="bg-white h-1 w-full mt-4 rounded-lg">
                <div className="bg-purple-300 h-full w-1/3 rounded-lg"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">Contacts</h2>
              <p className="mt-4 text-4xl">123/267</p>
              <div className="bg-white h-1 w-full mt-4 rounded-lg">
                <div className="bg-blue-300 h-full w-1/2 rounded-lg"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-red-500 text-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">Items Sold</h2>
              <p className="mt-4 text-4xl">200/300</p>
              <div className="bg-white h-1 w-full mt-4 rounded-lg">
                <div className="bg-red-300 h-full w-2/3 rounded-lg"></div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-indigo-700 text-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="mt-4 text-4xl">50/62</p>
              <div className="bg-white h-1 w-full mt-4 rounded-lg">
                <div className="bg-indigo-300 h-full w-4/5 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Sales Value Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">Sales Value</h2>
              <Line data={salesData} />
            </div>

            {/* Total Orders Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold">Total Orders</h2>
              <Bar data={ordersData} />
            </div>
          </div>

          {/* Progress Track */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow">
            <h2 className="text-xl font-bold">Progress Track</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center justify-between">
                <span>Argon Design System</span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-full rounded-full"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Angular Now UI Kit PRO</span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-full rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>Black Dashboard</span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <span>React Material Dashboard</span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-full rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
