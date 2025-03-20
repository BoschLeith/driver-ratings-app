import axios from "axios";
import { createStore, setStoreValue } from "pulsy";

createStore(
  "auth",
  {
    user: null,
    token: null,
  },
  { persist: true } // Persist the auth state in localStorage
);

const API_URL = "http://localhost:8080/api";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: username,
      password,
    });
    const { accessToken } = response.data;

    setStoreValue("auth", { token: accessToken, user: username });

    return true;
  } catch (error) {
    console.error("Login failed", error);
    return false;
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/auth/validate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data.user;

    setStoreValue("auth", { user, token });
    return true;
  } catch (error) {
    console.error("Token validation failed", error);
    return false;
  }
};

export const logout = () => {
  setStoreValue("auth", { user: null, token: null });
  localStorage.removeItem("pulsy_auth");
};
