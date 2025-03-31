import { NavLink, Outlet, useNavigate } from "react-router";

import { logout } from "../services/auth-service";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", exact: true },
    { path: "drivers", label: "Drivers" },
    { path: "grand-prixs", label: "Grand Prixs" },
    { path: "races", label: "Races" },
    { path: "raters", label: "Raters" },
    { path: "ratings", label: "Ratings" },
    { path: "results", label: "Results" },
    { path: "teams", label: "Teams" },
  ];

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <strong>Driver Ratings</strong>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <nav className="overflow-auto">
          <ul>
            {navLinks.map(({ path, label, exact }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={exact}
                  className={({ isActive }) => (!isActive ? "secondary" : "")}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}
