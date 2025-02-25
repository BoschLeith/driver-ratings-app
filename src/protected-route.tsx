import usePulsy from "pulsy";
import { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

import { logout, validateToken } from "./auth-service";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [auth] = usePulsy<{ token: string | null }>("auth");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!auth?.token) {
          logout();
          navigate("/login");
          return;
        }

        const isValid = await validateToken(auth.token);

        if (!isValid) {
          logout();
          navigate("/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Error validating token:", error);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [auth?.token, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children ? children : <Outlet />;
}
