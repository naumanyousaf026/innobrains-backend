import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import About from './component/aboutus/About.jsx';
import Services from './component/ourservices/services.jsx';
import Contactus from './component/contact/Contactus.jsx';
import Blog from './component/blog/Blog.jsx'
import Products from './component/products/Products.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element:<About />,
  },
  {
    path: "services",
    element:<Services />,
  },
  {
path : "contact" ,
element : <Contactus />,
  },
  {
    path : "blog" ,
    element :<Blog /> ,
      },
      {
        path : "products" ,
        element :<Products /> ,
          },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <RouterProvider router={router} />
  </StrictMode>,
)
