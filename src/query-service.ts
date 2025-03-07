import { useQuery } from "@tanstack/react-query";

import { getDrivers, getTeams } from "./api-service";

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
