import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { usePulsy } from "pulsy";
import { ChangeEvent, useState } from "react";

import DriverSelect from "./components/driver-select";
import GrandPrixSelect from "./components/grand-prix-select";
import PositionSelect from "./components/position-select";
import TeamSelect from "./components/team-select";
import {
  ApiResponse,
  InsertedResult,
  InsertRating,
  InsertResult,
  Race,
  Rater,
} from "./types";

const getGrandPrixRaces = async (grandPrixId: number) => {
  const response = await axios.get<ApiResponse<Race>>(
    `http://localhost:8080/api/grandPrixs/${grandPrixId}/races`
  );
  return response.data;
};

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

interface SelectOption {
  id: number;
  label: string;
}

interface SelectProps {
  value: number | null;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  disabled?: boolean;
  placeholder: string;
}

const Select = ({
  value,
  onChange,
  options,
  disabled,
  placeholder,
}: SelectProps) => (
  <select
    value={value ?? ""}
    className="select"
    disabled={disabled}
    onChange={onChange}
  >
    <option disabled value="">
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.label}
      </option>
    ))}
  </select>
);

export default function Dashboard() {
  const [auth] = usePulsy<{ user: string }>("auth");
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [position, setPosition] = useState<number | undefined>(undefined);
  const [driverId, setDriverId] = useState<number | null>(null);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);

  const {
    data: races,
    error: racesError,
    isLoading: isLoadingRaces,
  } = useQuery({
    queryKey: ["grandPrixRaces", grandPrixId],
    queryFn: () =>
      grandPrixId
        ? getGrandPrixRaces(grandPrixId)
        : Promise.resolve({ success: false, data: [] }),
    enabled: !!grandPrixId,
  });

  const {
    data: raters,
    error: ratersError,
    isLoading: isLoadingRaters,
  } = useQuery({
    queryKey: ["ratersData"],
    queryFn: getRaters,
    enabled: !!grandPrixId && !!selectedRaceId,
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

  // TODO: Add Validation
  const handleClick = () => {
    const newData = {
      driverId: driverId!,
      teamId: teamId!,
      raceId: selectedRaceId!,
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

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Race</legend>
          <Select
            value={selectedRaceId}
            onChange={(e) => setSelectedRaceId(Number(e.target.value))}
            options={
              isLoadingRaces
                ? [{ id: -1, label: "Loading races..." }]
                : races?.data.length === 0
                ? [{ id: -1, label: "No races found" }]
                : races?.data.map((race) => ({
                    id: race.id,
                    label: DateTime.fromISO(race.date).toLocaleString(
                      DateTime.DATE_MED
                    ),
                  })) ?? []
            }
            placeholder="Pick a Race"
            disabled={!grandPrixId}
          />
          {racesError && (
            <div className="fieldset-label text-error">
              {racesError.message}
            </div>
          )}
        </fieldset>

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
        {selectedRaceId && <div>Race Id: {selectedRaceId}</div>}
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
