import { useMutation, useQuery } from "@tanstack/react-query";

import { InsertDriver } from "../types/types";
import {
  createDriver,
  getDriverById,
  getDrivers,
  getGrandPrixRaces,
  getGrandPrixs,
  getRaces,
  getRaters,
  getRatings,
  getResults,
  getResultsByYear,
  getTeams,
  updateDriver,
} from "./api-service";

export const useDriversQuery = () =>
  useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
  });

export const useDriverQuery = (driverId: number) => {
  return useQuery({
    queryKey: ["driver", driverId],
    queryFn: () => getDriverById(driverId),
    enabled: !!driverId,
  });
};

export const useCreateDriverMutation = () => {
  return useMutation({
    mutationFn: async (newDriver: InsertDriver) => {
      await createDriver(newDriver);
    },
  });
};

export const useUpdateDriverMutation = () => {
  return useMutation({
    mutationFn: async ({
      driverId,
      newDriver,
    }: {
      driverId: number;
      newDriver: InsertDriver;
    }) => {
      return await updateDriver(driverId, newDriver);
    },
    onSuccess: (data) => {
      console.log("Driver updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating driver:", error.message);
    },
  });
};

// export const useDeleteDriverMutation = () => {
//   return useMutation(deleteDriver);
// };

export const useTeamsQuery = () => {
  return useQuery({
    queryKey: ["teamsData"],
    queryFn: getTeams,
  });
};

export const useRatersQuery = () => {
  return useQuery({
    queryKey: ["ratersData"],
    queryFn: getRaters,
  });
};

export const useResultsQuery = () => {
  return useQuery({
    queryKey: ["resultsData"],
    queryFn: getResults,
  });
};

export const useGrandPrixsQuery = () => {
  return useQuery({
    queryKey: ["grandPrixsData"],
    queryFn: getGrandPrixs,
  });
};

export const useGrandPrixRacesQuery = (grandPrixId: number) => {
  return useQuery({
    queryKey: ["racesData", grandPrixId],
    queryFn: () => getGrandPrixRaces(grandPrixId),
  });
};

export const useRacesQuery = () => {
  return useQuery({
    queryKey: ["racesData"],
    queryFn: getRaces,
  });
};

export const useRatingsQuery = () => {
  return useQuery({
    queryKey: ["ratingsData"],
    queryFn: getRatings,
  });
};

export const useResultsByYearQuery = (year: number) => {
  return useQuery({
    queryKey: ["racesData", year],
    queryFn: () => getResultsByYear(year),
  });
};
