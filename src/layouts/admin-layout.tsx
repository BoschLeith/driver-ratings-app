import { Outlet, useNavigate } from "react-router";

import { logout } from "../auth-service";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Driver Ratings</a>
        </div>
        <div className="flex">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
