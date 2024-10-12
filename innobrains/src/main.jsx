// src/index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // Main app component
import "./index.css"; // Global styles
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing other components
import About from "./component/aboutus/About.jsx";
import Services from "./component/ourservices/Services.jsx";
import Contactus from "./component/contact/Contactus.jsx";
import Blog from "./component/blog/Blog.jsx";
import Products from "./component/products/Products.jsx";
import Login from "./component/adminpanel/login.jsx";
import Admin from "./component/adminpanel/Admin.jsx"; // Admin component
import Teamform from "./component/adminpanel/Teamform.jsx";
import ResetPassword from "./component/adminpanel/ResetPassword.jsx"; // Updated import

// Define the router with paths and corresponding components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "services",
    element: <Services />, // Show all services on Services page
  },
  {
    path: "contact",
    element: <Contactus />,
  },
  {
    path: "blog",
    element: <Blog />, // Show all blogs on Blog page
  },
  {
    path: "products",
    element: <Products />, // Show all products on Products page
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
  {
    path: "teamform",
    element: <Teamform />,
  },
  {
    path: "resetpassword", // Updated path
    element: <ResetPassword />, // Updated component
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
