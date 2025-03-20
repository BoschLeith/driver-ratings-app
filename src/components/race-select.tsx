import { ChangeEvent, useEffect, useState } from "react";

import { formatISODate } from "../utils/date-utils";
import { useGrandPrixRacesQuery } from "../services/query-service";

interface RaceSelectProps {
  grandPrixId: number;
  onRaceSelect: (raceId: number | null) => void;
}

export default function RaceSelect({
  grandPrixId,
  onRaceSelect,
}: RaceSelectProps) {
  const {
    data: races,
    isLoading,
    isError,
  } = useGrandPrixRacesQuery(grandPrixId);
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedRaceId(null);
    onRaceSelect(null);
  }, [races]);

  if (isLoading) {
    return <p>Loading races...</p>;
  }

  if (isError) {
    return <p>Error loading races.</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const raceId = Number(e.target.value);
    setSelectedRaceId(raceId);
    onRaceSelect(raceId);
  };

  return (
    <label className="floating-label">
      <span>Race</span>
      <select
        id="race-select"
        className="select"
        value={selectedRaceId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a race
        </option>
        {races?.data.map((race) => (
          <option key={race.id} value={race.id}>
            {formatISODate(race.date)}
          </option>
        ))}
      </select>
    </label>
  );
}
