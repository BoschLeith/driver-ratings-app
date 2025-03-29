import { ChangeEvent, useEffect, useState } from "react";
import { GrandPrix, Race } from "../types/types";
import { GET } from "../api/axios-instance";
import { formatISODate } from "../utils/date-utils";

export default function Dashboard() {
  const [grandPrixs, setGrandPrixs] = useState<GrandPrix[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGrandPrix, setSelectedGrandPrix] = useState<GrandPrix | null>(
    null
  );
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [grandPrixResponse, raceResponse] = await Promise.all([
          GET<GrandPrix[]>("/grandPrixs"),
          GET<Race[]>("/races"),
        ]);

        if (!grandPrixResponse.success || !grandPrixResponse.data) {
          throw new Error(
            grandPrixResponse.message || "Failed to fetch Grand Prix data."
          );
        }

        if (!raceResponse.success || !raceResponse.data) {
          throw new Error(raceResponse.message || "Failed to fetch race data.");
        }

        setGrandPrixs(grandPrixResponse.data);
        setRaces(raceResponse.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGrandPrixChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const grandPrixId = Number(e.target.value);
    const selectedGrandPrixObj =
      grandPrixs.find((gp) => gp.id === grandPrixId) || null;
    setSelectedGrandPrix(selectedGrandPrixObj);
    setSelectedRace(null);
  };

  const handleRaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const raceId = Number(e.target.value);
    const selectedRaceObj = races.find((race) => race.id === raceId) || null;
    setSelectedRace(selectedRaceObj);
  };

  const filteredRaces = selectedGrandPrix
    ? races.filter((race) => race.grandPrixId === selectedGrandPrix.id)
    : [];

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <div className="card card-border bg-base-100 shadow-sm flex-1">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Select Grand Prix & Race</h2>
          </div>
          <div>
            <label className="select">
              <span className="label">Grand Prix</span>
              <select defaultValue="" onChange={handleGrandPrixChange}>
                <option value="" disabled>
                  Pick a Grand Prix
                </option>
                {grandPrixs.map((grandPrix) => (
                  <option key={grandPrix.id} value={grandPrix.id}>
                    {grandPrix.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="select">
              <span className="label">Race</span>
              <select
                id="race-select"
                className="select"
                value={selectedRace?.id || ""}
                onChange={handleRaceChange}
                disabled={!selectedGrandPrix}
              >
                <option value="" disabled>
                  Select a race
                </option>
                {filteredRaces.map((race) => (
                  <option key={race.id} value={race.id}>
                    {formatISODate(race.date)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
