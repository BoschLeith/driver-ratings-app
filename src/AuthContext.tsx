import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from local storage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      const userData: User = {
        email: response.data.email,
        accessToken: response.data.accessToken,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:8080/api/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/auth/refresh",
        { withCredentials: true }
      );
      setUser((prevUser) => ({
        ...prevUser!,
        accessToken: response.data.accessToken,
      }));
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      logout();
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
