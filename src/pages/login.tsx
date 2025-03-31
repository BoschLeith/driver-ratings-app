import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router";

import { login } from "../services/auth-service";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setError("Invalid credentials. Try again.");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="login-wrapper">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor="email">
              Email
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                autoComplete="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                autoComplete="current-password"
              />
            </label>
          </fieldset>
          <button type="submit">Login</button>
        </form>
        {error && <small>{error}</small>}
      </div>
    </section>
  );
}
