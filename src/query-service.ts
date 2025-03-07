import { useQuery } from "@tanstack/react-query";

import { getDrivers } from "./api-service";

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
