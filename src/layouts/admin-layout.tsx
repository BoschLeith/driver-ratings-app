import { Link, NavLink, Outlet, useNavigate } from "react-router";

import { logout } from "../services/auth-service";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard/drivers", label: "Drivers" },
    { path: "/dashboard/grand-prixs", label: "Grand Prixs" },
    { path: "/dashboard/races", label: "Races" },
    { path: "/dashboard/raters", label: "Raters" },
    { path: "/dashboard/ratings", label: "Ratings" },
    { path: "/dashboard/results", label: "Results" },
    { path: "/dashboard/teams", label: "Teams" },
  ];

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost text-xl">
            Driver Ratings
          </Link>
        </div>
        <div className="flex">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div
        role="tablist"
        className="tabs tabs-border shadow-sm flex justify-center"
      >
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? "tab tab-active" : "tab")}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
