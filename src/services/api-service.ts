import axios from "axios";

import {
  ApiRace,
  ApiResponse,
  Driver,
  GrandPrix,
  InsertDriver,
  InsertedResult,
  InsertRating,
  InsertResult,
  Race,
  Rater,
  Rating,
  Result,
  Team,
} from "../types/types";
import { logout } from "./auth-service";

export const getDrivers = async () => {
  const response = await axios.get<ApiResponse<Driver[]>>(
    "http://localhost:8080/api/drivers"
  );
  return response.data;
};

export const getDriverById = async (driverId: number) => {
  const response = await axios.get<ApiResponse<Driver>>(
    `http://localhost:8080/api/drivers/${driverId}`
  );
  return response.data;
};

export const createDriver = async (newDriver: InsertDriver) => {
  try {
    const pulsyAuth = localStorage.getItem("pulsy_auth");

    if (!pulsyAuth) {
      logout();
      throw new Error("Authentication token not found");
    }

    const token = JSON.parse(pulsyAuth).value.token;

    const response = await axios.post(
      "http://localhost:8080/api/drivers",
      newDriver,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

export const updateDriver = async (
  driverId: number,
  newDriver: InsertDriver
) => {
  try {
    const pulsyAuth = localStorage.getItem("pulsy_auth");

    if (!pulsyAuth) {
      logout();
      throw new Error("Authentication token not found");
    }

    const token = JSON.parse(pulsyAuth).value.token;

    const response = await axios.put(
      `http://localhost:8080/api/drivers/${driverId}`,
      newDriver,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    throw error;
  }
};

export const getTeams = async () => {
  const response = await axios.get<ApiResponse<Team[]>>(
    "http://localhost:8080/api/teams"
  );
  return response.data;
};

export const getRaters = async () => {
  const response = await axios.get<ApiResponse<Rater[]>>(
    "http://localhost:8080/api/raters"
  );
  return response.data;
};

export const getGrandPrixs = async () => {
  const response = await axios.get<ApiResponse<GrandPrix[]>>(
    "http://localhost:8080/api/grandPrixs"
  );
  return response.data;
};

export const getGrandPrixRaces = async (grandPrixId: number) => {
  const response = await axios.get<ApiResponse<Race[]>>(
    `http://localhost:8080/api/grandPrixs/${grandPrixId}/races`
  );
  return response.data;
};

export const getRaces = async () => {
  const response = await axios.get<ApiResponse<Race[]>>(
    "http://localhost:8080/api/races"
  );
  return response.data;
};

export const getRatings = async () => {
  const response = await axios.get<ApiResponse<Rating[]>>(
    "http://localhost:8080/api/ratings"
  );
  return response.data;
};

export const getResults = async () => {
  const response = await axios.get<ApiResponse<Result[]>>(
    "http://localhost:8080/api/results"
  );
  return response.data;
};

export const getResultsByYear = async (year: number) => {
  const response = await axios.get<ApiResponse<ApiRace[]>>(
    `http://localhost:8080/api/races/${year}/results`
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
