import { ChangeEvent, useState } from "react";

import { Driver } from "../types";

interface DriverSelectProps {
  drivers: Driver[] | undefined;
  onDriverSelect: (driverId: number | null) => void;
}

export default function DriverSelect({
  drivers,
  onDriverSelect,
}: DriverSelectProps) {
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

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
        {drivers && drivers.length > 0 ? (
          drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.firstName} {driver.lastName}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No drivers available
          </option>
        )}
      </select>
    </fieldset>
  );
}
