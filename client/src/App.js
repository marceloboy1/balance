import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./App.css"
import Gastos from "./Routes/Gastos";
import Orcamento from "./Routes/Orcamento";
import Home from "./Routes/Home";
import Navbar from "./components/Navbar"
import RegisterPage from "./Routes/RegisterPage";
import LoginPage from "./Routes/LoginPage";
import PrivateRoute from "./PrivateRoute";

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
              
              //Retirar o <PrivateRoute que funciona
              path: "gastos/*",
              element: <PrivateRoute><Gastos /></PrivateRoute>,
            },
            {
              //Retirar o <PrivateRoute que funciona
              path: "orcamento/*",
              element: <PrivateRoute ><Orcamento /></PrivateRoute>,
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

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
