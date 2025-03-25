import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { DELETE, GET } from "../api/axios-instance";
import DeleteModal from "../components/delete-modal";
import RaceModal from "../components/race-modal";
import { Race } from "../types/types";
import { formatISODate, formatISODateTime } from "../utils/date-utils";

export default function Races() {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [races, setRaces] = useState<Race[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { success, data, message } = await GET<Race[]>("/races");
        if (success) {
          setRaces(data);
        } else {
          setError(message);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("There was an unknown error.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateClick = () => {
    setSelectedRace(null);
    const modal = document.getElementById("race_modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const handleEditClick = (race: Race) => {
    setSelectedRace(race);
    const modal = document.getElementById("race_modal") as HTMLDialogElement;
    modal?.showModal();
  };

  const handleDeleteClick = (race: Race) => {
    setSelectedRace(race);
    const modal = document.getElementById(
      "delete_race_modal"
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  const handleRaceUpdate = (updatedRace: Race) => {
    setRaces((prevRaces) =>
      prevRaces
        ? prevRaces.map((r) => (r.id === updatedRace.id ? updatedRace : r))
        : []
    );
  };

  const handleRaceCreate = (updatedRace: Race) => {
    setRaces((prevRaces) =>
      prevRaces ? [...prevRaces, updatedRace] : [updatedRace]
    );
  };

  const handleRaceDelete = async () => {
    if (!selectedRace) return;

    setLoading(true);
    try {
      const { success, data, message } = await DELETE<Race>(
        `/races/${selectedRace.id}`
      );
      if (success) {
        data
          ? setRaces((prevRaces) =>
              prevRaces ? prevRaces?.filter((r) => r.id !== data.id) : []
            )
          : null;
      } else {
        setError(message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("There was an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

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
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Races</h2>
          <button className="btn ml-auto" onClick={handleCreateClick}>
            <Plus />
            Add Race
          </button>
        </div>
        {!races || races.length === 0 ? (
          <p>No races available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Grand Prix ID</th>
                  <th>Date</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {races.map((race) => (
                  <tr key={race.id}>
                    <td>{race.id}</td>
                    <td>{race.grandPrixId}</td>
                    <td>{formatISODate(race.date)}</td>
                    <td>{formatISODateTime(race.createdAt)}</td>
                    <td>
                      {race.updatedAt ? formatISODateTime(race.updatedAt) : "-"}
                    </td>
                    <td className="text-right space-x-2">
                      <button
                        className="btn btn-square"
                        onClick={() => handleEditClick(race)}
                      >
                        <Pencil />
                      </button>
                      <button
                        className="btn btn-square"
                        onClick={() => handleDeleteClick(race)}
                      >
                        <Trash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <RaceModal
        race={selectedRace}
        onRaceUpdate={handleRaceUpdate}
        onRaceCreate={handleRaceCreate}
      />
      <DeleteModal onConfirm={handleRaceDelete} />
    </div>
  );
}
