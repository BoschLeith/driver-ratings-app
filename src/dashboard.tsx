import { usePulsy } from "pulsy";

export default function Dashboard() {
  const [auth] = usePulsy<{ user: string }>("auth");

  return (
    <div>
      <h2>Welcome, {auth.user}!</h2>
    </div>
  );
}
