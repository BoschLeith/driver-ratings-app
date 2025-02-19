import { usePulsy } from "pulsy";
import { useNavigate } from "react-router";

import { logout } from "./authService";

export default function Dashboard() {
  const [auth] = usePulsy<{ user: string }>("auth");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome, {auth.user}!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
