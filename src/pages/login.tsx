import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import { login } from "../services/auth-service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      setError("Invalid credentials. Try again.");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="card w-[350px]">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleLogin} className="grid gap-4">
            <label className="floating-label" htmlFor="email">
              <span>Email</span>
              <input
                className="input"
                id="email"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                autoComplete="email"
              />
            </label>
            <label className="floating-label" htmlFor="password">
              <span>Password</span>
              <input
                className="input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </label>
            <button className="btn btn-block" type="submit">
              Login
            </button>
          </form>
          {error && <p className="text-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
