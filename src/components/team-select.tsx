import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import axios from "axios";

import { ApiResponse, Team } from "../types";

const getTeams = async () => {
  const response = await axios.get<ApiResponse<Team>>(
    "http://localhost:8080/api/teams"
  );
  return response.data;
};

interface TeamSelectProps {
  onTeamSelect: (teamId: number | null) => void;
}

export default function TeamSelect({ onTeamSelect }: TeamSelectProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teamsData"],
    queryFn: getTeams,
  });

  if (isLoading) {
    return <p>Loading teams...</p>;
  }

  if (isError) {
    return <p>Error loading teams.</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const teamId = Number(e.target.value);
    setSelectedTeamId(teamId);
    onTeamSelect(teamId);
  };

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Team</legend>
      <select
        className="select"
        value={selectedTeamId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a team
        </option>
        {teams?.data.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
