import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { usePulsy } from "pulsy";
import { useState } from "react";

import { logout } from "./auth-service";
import DriverSelect from "./components/driver-select";
import GrandPrixSelect from "./components/grand-prix-select";
import PositionSelect from "./components/position-select";
import RaceSelect from "./components/race-select";
import RatingsInput from "./components/ratings-input";
import TeamSelect from "./components/team-select";
import {
  ApiResponse,
  InsertedResult,
  InsertRating,
  InsertResult,
} from "./types";

const insertResult = async (
  data: InsertResult
): Promise<ApiResponse<InsertedResult>> => {
  try {
    const pulsyAuth = localStorage.getItem("pulsy_auth");

    if (!pulsyAuth) {
      logout();
      throw new Error("Authentication token not found");
    }

    const token = JSON.parse(pulsyAuth).value.token;

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
  } catch (error) {
    console.error("Error inserting result:", error);
    throw error;
  }
};

const insertRating = async (data: InsertRating[]) => {
  try {
    const pulsyAuth = localStorage.getItem("pulsy_auth");

    if (!pulsyAuth) {
      logout();
      throw new Error("Authentication token not found");
    }

    const token = JSON.parse(pulsyAuth).value.token;

    const response = await axios.post(
      "http://localhost:8080/api/ratings",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error inserting ratings:", error);
    throw error;
  }
};

export default function Dashboard() {
  const [auth] = usePulsy<{ user: string }>("auth");
  const [driverId, setDriverId] = useState<number | null>(null);
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [raceId, setRaceId] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [teamId, setTeamId] = useState<number | null>(null);

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

  const handleDriverSelect = (driverId: number | null) => {
    setDriverId(driverId);
  };

  const handleGranPrixSelect = (grandPrixId: number | null) => {
    setGrandPrixId(grandPrixId);
  };

  const handlePositionSelect = (newPosition: number | null) => {
    setPosition(newPosition);
  };

  const handleRaceSelect = (raceId: number | null) => {
    setRaceId(raceId);
  };

  const handleRatingsChange = (newRatings: { [key: number]: number }) => {
    setRatings(newRatings);
  };

  const handleTeamSelect = (teamId: number | null) => {
    setTeamId(teamId);
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
        <GrandPrixSelect onGrandPrixSelect={handleGranPrixSelect} />

        {grandPrixId && (
          <RaceSelect
            grandPrixId={grandPrixId}
            onRaceSelect={handleRaceSelect}
          />
        )}

        <PositionSelect onPositionSelect={handlePositionSelect} />
        <DriverSelect onDriverSelect={handleDriverSelect} />
        <TeamSelect onTeamSelect={handleTeamSelect} />
        <RatingsInput onRatingsChange={handleRatingsChange} />

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
