import axios from "axios";

import { logout } from "./auth-service";
import {
  ApiResponse,
  InsertedResult,
  InsertRating,
  InsertResult,
} from "./types";

export const insertResult = async (
  data: InsertResult[]
): Promise<ApiResponse<InsertedResult>> => {
  try {
    const pulsyAuth = localStorage.getItem("pulsy_auth");

    if (!pulsyAuth) {
      logout();
      throw new Error("Authentication token not found");
    }

    const token = JSON.parse(pulsyAuth).value.token;

    const response = await axios.post<ApiResponse<InsertedResult>>(
      "http://localhost:8080/api/results",
      { results: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error inserting result:", error);
    throw error;
  }
};

export const insertRating = async (data: InsertRating[]) => {
  try {
    const pulsyAuth = localStorage.getItem("pulsy_auth");

    if (!pulsyAuth) {
      logout();
      throw new Error("Authentication token not found");
    }

    const token = JSON.parse(pulsyAuth).value.token;

    const response = await axios.post(
      "http://localhost:8080/api/ratings",
      { ratings: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error inserting ratings:", error);
    throw error;
  }
};
