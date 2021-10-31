import { Link, Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashBoardComponent/DashboardApp";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import Chat from "./pages/ChatComponent/Chat";
import Groups from "./pages/GroupsComponent/Groups";
import Contact from "./pages/ContactComponent/Contact";
import RegisterOTP from "./pages/RegisterOTP";
import ForgotPhone from "./pages/ForgotPhone";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "contact", element: <Contact /> },
        { path: "chat", element: <Chat /> },
        { path: "groups", element: <Groups /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgot", element: <ForgotPhone /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/404" /> },
        { path: "registerotp", element: <RegisterOTP /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
