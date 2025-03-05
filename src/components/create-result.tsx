import { useState, useEffect } from "react";

import DriverSelect from "./driver-select";
import PositionSelect from "./position-select";
import RatingsInput from "./ratings-input";
import TeamSelect from "./team-select";

interface CreateResultProps {
  onChange: (result: {
    driverId: number | null;
    position: number | null;
    ratings: { [key: number]: number };
    teamId: number | null;
  }) => void;
}

export default function CreateResult({ onChange }: CreateResultProps) {
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
    <div className="card card-border">
      <div className="card-body">
        <div className="flex space-x-4">
          <PositionSelect onPositionSelect={handlePositionSelect} />
          <DriverSelect onDriverSelect={handleDriverSelect} />
          <TeamSelect onTeamSelect={handleTeamSelect} />
          <RatingsInput onRatingsChange={handleRatingsChange} />
        </div>
      </div>
    </div>
  );
}
