import { useQuery } from "@tanstack/react-query";

import {
  getDrivers,
  getGrandPrixRaces,
  getGrandPrixs,
  getRaces,
  getRaters,
  getRatings,
  getResults,
  getTeams,
} from "./api-service";

export const useDriversQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
  });

  return {
    drivers: data,
    isDriversLoading: isLoading,
    isDriversError: isError,
  };
};

export const useTeamsQuery = () =>
  useQuery({
    queryKey: ["teamsData"],
    queryFn: getTeams,
  });

export const useRatersQuery = () =>
  useQuery({
    queryKey: ["ratersData"],
    queryFn: getRaters,
  });

export const useResultsQuery = () =>
  useQuery({
    queryKey: ["resultsData"],
    queryFn: getResults,
  });

export const useGrandPrixsQuery = () =>
  useQuery({
    queryKey: ["grandPrixsData"],
    queryFn: getGrandPrixs,
  });

export const useGrandPrixRacesQuery = (grandPrixId: number) =>
  useQuery({
    queryKey: ["racesData", grandPrixId],
    queryFn: () => getGrandPrixRaces(grandPrixId),
  });

export const useRacesQuery = () =>
  useQuery({
    queryKey: ["racesData"],
    queryFn: getRaces,
  });

export const useRatingsQuery = () =>
  useQuery({
    queryKey: ["ratingsData"],
    queryFn: getRatings,
  });
