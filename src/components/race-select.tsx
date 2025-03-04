import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { ChangeEvent, useEffect, useState } from "react";

import { ApiResponse, Race } from "../types";

const getGrandPrixRaces = async (grandPrixId: number) => {
  const response = await axios.get<ApiResponse<Race>>(
    `http://localhost:8080/api/grandPrixs/${grandPrixId}/races`
  );
  return response.data;
};

interface RaceSelectProps {
  grandPrixId: number;
  onRaceSelect: (raceId: number | null) => void;
}

export default function RaceSelect({
  grandPrixId,
  onRaceSelect,
}: RaceSelectProps) {
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);

  const {
    data: races,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["racesData", grandPrixId],
    queryFn: () => getGrandPrixRaces(grandPrixId),
  });

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
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Race</legend>
      <select
        className="select"
        value={selectedRaceId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a race
        </option>
        {races?.data.map((race) => (
          <option key={race.id} value={race.id}>
            {DateTime.fromISO(race.date).toLocaleString(DateTime.DATE_MED)}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
