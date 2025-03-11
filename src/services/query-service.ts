import { useQuery } from "@tanstack/react-query";

import {
  getDrivers,
  getGrandPrixRaces,
  getGrandPrixs,
  getRaces,
  getRaters,
  getRatings,
  getResults,
  getResultsByYear,
  getTeams,
} from "./api-service";

export const useDriversQuery = () =>
  useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
  });

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

export const useResultsByYearQuery = (year: number) =>
  useQuery({
    queryKey: ["racesData", year],
    queryFn: () => getResultsByYear(year),
  });
