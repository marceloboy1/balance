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
import Gastos from "./Routes/Gastos";
import Orcamento from "./Routes/Orcamento";
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
                path: "gastos",
                element: <Gastos />,
              },
              {
                path: "orcamento",
                element: <Orcamento />,
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