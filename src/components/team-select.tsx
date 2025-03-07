import { ChangeEvent, useState } from "react";

import { Team } from "../types";

interface TeamSelectProps {
  teams: Team[] | undefined;
  onTeamSelect: (teamId: number | null) => void;
}

export default function TeamSelect({ teams, onTeamSelect }: TeamSelectProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);

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
        {teams && teams.length > 0 ? (
          teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No teams available
          </option>
        )}
      </select>
    </fieldset>
  );
}
