import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css"
import Products from "./Routes/Products";
import Reports from "./Routes/Reports";
import Home from "./Routes/Home";
import Navbar from "./components/Navbar"
import RegisterContainer from "./Routes/RegisterPage";


const AppLayout = () => (
    <>
        <Navbar />
        <Outlet />
    </>
)

const router = createBrowserRouter([
    {
        element:<AppLayout/>,
        children:[
            {
                path: "/",
                element:<Home />,
              },
              {
                path: "products",
                element: <Products />,
              },
              {
                path: "reports",
                element: <Reports />,
              },
              {
                path: "register",
                element: <RegisterContainer />,
              },

        ]
    },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);