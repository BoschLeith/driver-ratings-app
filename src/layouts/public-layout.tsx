import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl">Driver Ratings</a>
      </div>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
