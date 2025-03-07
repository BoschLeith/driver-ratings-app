import { useEffect, useState } from "react";

import { Driver, Rater, Team } from "../types";
import DriverSelect from "./driver-select";
import PositionSelect from "./position-select";
import RatingsInput from "./ratings-input";
import TeamSelect from "./team-select";
import { FaRegTrashCan } from "react-icons/fa6";

interface CreateResultProps {
  index: number;
  drivers: Driver[] | undefined;
  teams: Team[] | undefined;
  raters: Rater[] | undefined;
  onChange: (result: {
    driverId: number | null;
    position: number | null;
    ratings: { [key: number]: number };
    teamId: number | null;
  }) => void;
  onDelete: () => void;
}

export default function CreateResult({
  index,
  drivers,
  teams,
  raters,
  onChange,
  onDelete,
}: CreateResultProps) {
  const [driverId, setDriverId] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [teamId, setTeamId] = useState<number | null>(null);

  const handleDriverSelect = (driverId: number | null) => {
    setDriverId(driverId);
  };

  const handlePositionSelect = (newPosition: number | null) => {
    setPosition(newPosition);
  };

  const handleRatingsChange = (newRatings: { [key: number]: number }) => {
    setRatings(newRatings);
  };

  const handleTeamSelect = (teamId: number | null) => {
    setTeamId(teamId);
  };

  useEffect(() => {
    const result = {
      driverId,
      position,
      ratings,
      teamId,
    };
    onChange(result);
  }, [driverId, position, ratings, teamId]);

  return (
    <tr>
      <th className="min-w-3xs w-1/4">
        <PositionSelect index={index} onPositionSelect={handlePositionSelect} />
      </th>
      <th className="min-w-3xs w-1/4">
        <DriverSelect
          index={index}
          drivers={drivers}
          onDriverSelect={handleDriverSelect}
        />
      </th>
      <th className="min-w-3xs w-1/4">
        <TeamSelect
          index={index}
          teams={teams}
          onTeamSelect={handleTeamSelect}
        />
      </th>
      <th className="flex space-x-2 min-w-75">
        <RatingsInput
          index={index}
          raters={raters}
          onRatingsChange={handleRatingsChange}
        />
      </th>
      <th>
        <button className="btn btn-square" onClick={onDelete}>
          <FaRegTrashCan />
        </button>
      </th>
    </tr>
  );
}
