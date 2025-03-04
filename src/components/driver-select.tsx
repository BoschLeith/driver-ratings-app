import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";

import { ApiResponse, Driver } from "../types";

const getDrivers = async () => {
  const response = await axios.get<ApiResponse<Driver>>(
    "http://localhost:8080/api/drivers"
  );
  return response.data;
};

interface DriverSelectProps {
  onDriverSelect: (driverId: number | null) => void;
}

export default function DriverSelect({ onDriverSelect }: DriverSelectProps) {
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  const {
    data: drivers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
  });

  if (isLoading) {
    return <p>Loading drivers...</p>;
  }

  if (isError) {
    return <p>Error loading drivers.</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const driverId = Number(e.target.value);
    setSelectedDriverId(driverId);
    onDriverSelect(driverId);
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Driver</legend>
      <select
        className="select"
        value={selectedDriverId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a driver
        </option>
        {drivers?.data.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.firstName} {driver.lastName}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
