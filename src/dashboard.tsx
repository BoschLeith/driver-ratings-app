import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePulsy } from "pulsy";
import { useState } from "react";

import DriverSelect from "./components/driver-select";
import GrandPrixSelect from "./components/grand-prix-select";
import PositionSelect from "./components/position-select";
import RaceSelect from "./components/race-select";
import TeamSelect from "./components/team-select";
import {
  ApiResponse,
  InsertedResult,
  InsertRating,
  InsertResult,
  Rater,
} from "./types";

const getRaters = async () => {
  const response = await axios.get<ApiResponse<Rater>>(
    "http://localhost:8080/api/raters"
  );
  return response.data;
};

// TODO: Check if pulsyAuth is null
const insertResult = async (data: InsertResult) => {
  const pulsyAuth = localStorage.getItem("pulsy_auth");
  const parsedAuth = JSON.parse(pulsyAuth!);

  const token = parsedAuth.value.token;

  console.log(token);

  const response = await axios.post<ApiResponse<InsertedResult>>(
    "http://localhost:8080/api/results",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const insertRating = async (data: InsertRating[]) => {
  const pulsyAuth = localStorage.getItem("pulsy_auth");
  const parsedAuth = JSON.parse(pulsyAuth!);

  const token = parsedAuth.value.token;

  console.log(token);

  const response = await axios.post("http://localhost:8080/api/ratings", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default function Dashboard() {
  const [auth] = usePulsy<{ user: string }>("auth");
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);
  const [raceId, setRaceId] = useState<number | null>(null);

  const {
    data: raters,
    error: ratersError,
    isLoading: isLoadingRaters,
  } = useQuery({
    queryKey: ["ratersData"],
    queryFn: getRaters,
    enabled: !!grandPrixId && !!raceId,
  });

  const mutation = useMutation({
    mutationFn: insertResult,
    onSuccess: (data) => {
      data.data.map((result) => {
        const ratingsArray: InsertRating[] = Object.entries(ratings).map(
          ([raterId, rating]) => ({
            resultId: result.id,
            raterId: Number(raterId),
            rating,
          })
        );
        insertRating(ratingsArray);
      });
    },
    onError: (error: any) => {
      console.error("Error inserting data:", error);
    },
  });

  const handleInputChange = (raterId: number, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [raterId]: value,
    }));
  };

  const handleGrandPrixChange = (grandPrixId: number | null) => {
    setGrandPrixId(grandPrixId);
  };

  const handlePositionChange = (newPosition: number) => {
    setPosition(newPosition);
  };

  const handleDriverSelect = (driverId: number | null) => {
    setDriverId(driverId);
  };

  const handleTeamSelect = (teamId: number | null) => {
    setTeamId(teamId);
  };

  const handleRaceSelect = (raceId: number | null) => {
    setRaceId(raceId);
  };

  // TODO: Add Validation
  const handleClick = () => {
    const newData = {
      driverId: driverId!,
      teamId: teamId!,
      raceId: raceId!,
      position: position!,
    };
    mutation.mutate(newData);
  };

  return (
    <>
      <div>
        <h2>Welcome, {auth.user}!</h2>
      </div>
      <div>
        <GrandPrixSelect onGrandPrixSelect={handleGrandPrixChange} />

        {grandPrixId && (
          <RaceSelect
            grandPrixId={grandPrixId}
            onRaceSelect={handleRaceSelect}
          />
        )}

        <PositionSelect onPositionChange={handlePositionChange} />
        <DriverSelect onDriverSelect={handleDriverSelect} />
        <TeamSelect onTeamSelect={handleTeamSelect} />
        {ratersError && (
          <div className="fieldset-label text-error">{ratersError.message}</div>
        )}
        {isLoadingRaters && (
          <div className="fieldset-label">Loading raters...</div>
        )}
        {raters?.data.map((rater) => (
          <fieldset className="fieldset" key={rater.id}>
            <legend className="fieldset-legend">{rater.name}</legend>
            <input
              type="number"
              className="input"
              placeholder="Rating"
              value={ratings[rater.id] || ""}
              onChange={(e) =>
                handleInputChange(rater.id, Number(e.target.value))
              }
            />
          </fieldset>
        ))}
        {grandPrixId && <div>Grand Prix Id: {grandPrixId}</div>}
        {raceId && <div>Race Id: {raceId}</div>}
        {position && <div>Position: {position}</div>}
        {driverId && <div>Driver Id: {driverId}</div>}
        {teamId && <div>Team Id: {teamId}</div>}
        {Object.entries(ratings).map(([raterId, rating]) => (
          <div key={raterId}>
            Rater ID: {raterId}, Rating: {rating}
          </div>
        ))}
        <button
          className="btn"
          onClick={handleClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Inserting..." : "Insert Data"}
        </button>
      </div>
    </>
  );
}
