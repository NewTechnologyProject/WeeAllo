import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import Chat from "./pages/ChatComponent/Chat";
import Contact from "./pages/ContactComponent/Contact";
import RegisterOTP from "./pages/RegisterOTP";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "contact", element: <Contact /> },
        { path: "chat", element: <Chat /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
        { path: "registerotp", element: <RegisterOTP /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
