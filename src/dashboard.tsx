import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { usePulsy } from "pulsy";
import { ChangeEvent, useState } from "react";

interface GrandPrix {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

interface Race {
  id: number;
  date: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  driverCode: string;
  createdAt: string;
  updatedAt: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T[];
}

const getGrandPrixs = async () => {
  const response = await axios.get<ApiResponse<GrandPrix>>(
    "http://localhost:8080/api/grandPrixs"
  );
  return response.data;
};

const getGrandPrixRaces = async (grandPrixId: number) => {
  const response = await axios.get<ApiResponse<Race>>(
    `http://localhost:8080/api/grandPrixs/${grandPrixId}/races`
  );
  return response.data;
};

const getDrivers = async () => {
  const response = await axios.get<ApiResponse<Driver>>(
    "http://localhost:8080/api/drivers"
  );
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
  const [selectedGrandPrixId, setSelectedGrandPrixId] = useState<number | null>(
    null
  );
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  const {
    data: grandPrixs,
    error: grandPrixsError,
    isLoading: isLoadingGrandPrixs,
  } = useQuery({
    queryKey: ["grandPrixsData"],
    queryFn: getGrandPrixs,
  });

  const {
    data: races,
    error: racesError,
    isLoading: isLoadingRaces,
  } = useQuery({
    queryKey: ["grandPrixRaces", selectedGrandPrixId],
    queryFn: () =>
      selectedGrandPrixId
        ? getGrandPrixRaces(selectedGrandPrixId)
        : Promise.resolve({ success: false, data: [] }),
    enabled: !!selectedGrandPrixId,
  });

  const {
    data: drivers,
    error: driversError,
    isLoading: isLoadingDrivers,
  } = useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
    enabled: !!selectedGrandPrixId && !!selectedRaceId,
  });

  return (
    <>
      <div>
        <h2>Welcome, {auth.user}!</h2>
      </div>
      <div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Grand Prix</legend>
          <Select
            value={selectedGrandPrixId}
            onChange={(e) => setSelectedGrandPrixId(Number(e.target.value))}
            options={
              isLoadingGrandPrixs
                ? [{ id: -1, label: "Loading grand prixs..." }]
                : grandPrixs?.data.map((grandPrix) => ({
                    id: grandPrix.id,
                    label: grandPrix.name,
                  })) ?? []
            }
            placeholder="Pick a Grand Prix"
          />
          {grandPrixsError && (
            <div className="fieldset-label text-error">
              {grandPrixsError.message}
            </div>
          )}
        </fieldset>

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
            disabled={!selectedGrandPrixId}
          />
          {racesError && (
            <div className="fieldset-label text-error">
              {racesError.message}
            </div>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Driver</legend>
          <Select
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(Number(e.target.value))}
            options={
              isLoadingDrivers
                ? [{ id: -1, label: "Loading drivers..." }]
                : drivers?.data.map((driver) => ({
                    id: driver.id,
                    label: `${driver.firstName} ${driver.lastName}`,
                  })) ?? []
            }
            placeholder="Pick a Driver"
            disabled={!selectedGrandPrixId || !selectedRaceId}
          />
          {driversError && (
            <div className="fieldset-label text-error">
              {driversError.message}
            </div>
          )}
        </fieldset>

        {selectedGrandPrixId && <div>Grand Prix Id: {selectedGrandPrixId}</div>}
        {selectedRaceId && <div>Race Id: {selectedRaceId}</div>}
        {selectedDriverId && <div>Driver Id: {selectedDriverId}</div>}
      </div>
    </>
  );
}
