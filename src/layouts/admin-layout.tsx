import { NavLink, Outlet, useNavigate } from "react-router";

import { logout } from "../services/auth-service";
import { House } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: <House />, exact: true },
    { path: "drivers", label: "Drivers" },
    { path: "grand-prixs", label: "Grand Prixs" },
    { path: "races", label: "Races" },
    { path: "raters", label: "Raters" },
    { path: "ratings", label: "Ratings" },
    { path: "results", label: "Results" },
    { path: "teams", label: "Teams" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            <NavLink to="/dashboard" className="hover:underline">
              Dashboard
            </NavLink>
          </h1>
          <button className="btn ml-auto" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <ul className="menu menu-horizontal bg-base-200 rounded-box items-center">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? "menu-active" : "")}
                end={link.exact}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Outlet />
      </main>
    </div>
  );
}
