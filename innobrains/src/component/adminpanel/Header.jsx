import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/ProfilePage");
  };

  return (
    <div className="lg:w-[81%] bg-white p-4 shadow-md flex ml-auto justify-between items-center">
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="lg:hidden p-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <div className="flex  gap-2 max-w-lg">
        <div className="flex items-center border rounded-md w-full">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 " />
          <input
            type="text"
            placeholder="Search"
            className="border-none p-2 w-full focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

        <div onClick={goToProfile} style={{ cursor: "pointer" }}>
          <img
            src={
              "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            }
            alt="User"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
