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
import RegisterPage from "./Routes/RegisterPage";
import LoginPage from "./Routes/LoginPage";


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
                element: <RegisterPage />,
              },
              {
                path: "login",
                element: <LoginPage />,
              },

        ]
    },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);