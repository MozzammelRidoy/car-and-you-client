import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Components/Pages/Home/Home";
import ErrorPage from "../Components/SharePages/ErrorPage/ErrorPage";
import Login from "../Components/SharePages/LoginPage/Login";
import Register from "../Components/SharePages/RegistrationPage/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
