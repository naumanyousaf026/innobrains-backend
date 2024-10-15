import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./component/aboutus/About.jsx";
import Services from "./component/ourservices/Services.jsx";
import Contactus from "./component/contact/Contactus.jsx";
import Blog from "./component/blog/Blog.jsx";
import Products from "./component/products/Products.jsx";

import Admin from "./component/adminpanel/Admin.jsx";
import Teamform from "./component/adminpanel/Teamform.jsx";

import ProtectedRoute from "./component/adminpanel/ProtectedRoute.jsx";
import Login from "./component/adminpanel/Login.jsx";
import Signupform from "./component/adminpanel/Signupform.jsx";
import EmailRequest from "./component/adminpanel/EmailRequest.jsx";
import VerifyOTP from "./component/adminpanel/VerifyOTP.jsx";
import ResetPassword from "./component/adminpanel/ResetPassword.jsx";
import SuccessMessage from "./component/adminpanel/SuccessMessage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/contact",
    element: <Contactus />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/signupform",
    element: <Signupform />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/emailrequest", // Added EmailRequest route
    element: <EmailRequest />,
  },
  {
    path: "/verifyotp", // Added VerifyOTP route
    element: <VerifyOTP />,
  },
  {
    path: "/SuccessMessage",
    element: <SuccessMessage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/teamform",
    element: (
      <ProtectedRoute>
        <Teamform />
      </ProtectedRoute>
    ),
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
