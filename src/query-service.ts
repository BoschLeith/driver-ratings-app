import { useQuery } from "@tanstack/react-query";

import { getDrivers, getGrandPrixs, getRaters, getTeams } from "./api-service";

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

export const useTeamsQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamsData"],
    queryFn: getTeams,
  });

  return {
    teams: data,
    isTeamsLoading: isLoading,
    isTeamsError: isError,
  };
};

export const useRatersQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ratersData"],
    queryFn: getRaters,
  });

  return {
    raters: data,
    isRatersLoading: isLoading,
    isRatersError: isError,
  };
};

export const useGrandPrixsQuery = () =>
  useQuery({
    queryKey: ["grandPrixsData"],
    queryFn: getGrandPrixs,
  });
