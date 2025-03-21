import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useNavigate } from "react-router";

import { logout } from "../services/auth-service";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const getAuthToken = () => {
  const pulsyAuth = localStorage.getItem("pulsy_auth");

  if (!pulsyAuth) {
    throw new Error("Authentication token not found");
  }

  return JSON.parse(pulsyAuth).value.token;
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - Token might be expired or invalid.");

      logout();

      const navigate = useNavigate();
      navigate("/login");
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

const GET = async <T>(url: string): Promise<ApiResponse<T>> => {
  setAuthHeader();
  return await axiosInstance.get(url);
};

const POST = async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  setAuthHeader();
  return await axiosInstance.post(url, data);
};

const PUT = async <T>(url: string, data: any): Promise<ApiResponse<T>> => {
  setAuthHeader();
  return await axiosInstance.put(url, data);
};

const DELETE = async <T>(url: string): Promise<ApiResponse<T>> => {
  setAuthHeader();
  return await axiosInstance.delete(url);
};

export { DELETE, GET, POST, PUT };
