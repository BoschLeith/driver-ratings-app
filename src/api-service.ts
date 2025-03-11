import axios from "axios";

import { logout } from "./auth-service";
import {
  ApiResponse,
  Driver,
  GrandPrix,
  InsertedResult,
  InsertRating,
  InsertResult,
  Race,
  Rater,
  Team,
} from "./types";

export const getDrivers = async () => {
  const response = await axios.get<ApiResponse<Driver>>(
    "http://localhost:8080/api/drivers"
  );
  return response.data;
};

export const getTeams = async () => {
  const response = await axios.get<ApiResponse<Team>>(
    "http://localhost:8080/api/teams"
  );
  return response.data;
};

export const getRaters = async () => {
  const response = await axios.get<ApiResponse<Rater>>(
    "http://localhost:8080/api/raters"
  );
  return response.data;
};

export const getGrandPrixs = async () => {
  const response = await axios.get<ApiResponse<GrandPrix>>(
    "http://localhost:8080/api/grandPrixs"
  );
  return response.data;
};

export const getRaces = async () => {
  const response = await axios.get<ApiResponse<Race>>(
    "http://localhost:8080/api/races"
  );
  return response.data;
};

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
