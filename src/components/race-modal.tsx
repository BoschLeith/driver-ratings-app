import { useEffect, useState } from "react";

import { POST, PUT } from "../api/axios-instance";
import { Race } from "../types/types";
import GrandPrixSelect from "./grand-prix-select";

interface RaceModalProps {
  race?: Race | null;
  onRaceUpdate: (savedRace: Race) => void;
  onRaceCreate: (savedRace: Race) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function RaceModal({
  race,
  onRaceUpdate,
  onRaceCreate,
  isOpen,
  onClose,
}: RaceModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");

  const isFormValid = date.trim() !== "" && grandPrixId !== null;

  useEffect(() => {
    if (race) {
      setGrandPrixId(race.grandPrixId);
      setDate(race.date);
    } else {
      setGrandPrixId(null);
      setDate("");
    }
  }, [race, isOpen]);

  const handleSave = async () => {
    if (grandPrixId === null || date.trim() === "") return;

    setLoading(true);
    setError(null);

    const raceData = { grandPrixId, date };

    try {
      const { success, data, message } = race
        ? await PUT<Race>(`/races/${race.id}`, raceData)
        : await POST<Race>("/races", raceData);

      if (!success || !data) {
        throw new Error(message || "Failed to save race data.");
      }

      race ? onRaceUpdate(data) : onRaceCreate(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{race ? "Edit Race" : "Add Race"}</h3>
        <p className="pb-4">Fill in the race details below.</p>

        <div className="flex flex-col gap-3">
          <GrandPrixSelect
            selectedGrandPrixId={grandPrixId}
            onGrandPrixSelect={setGrandPrixId}
          />
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="modal-action">
          <button className="btn" type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary ml-2"
            type="button"
            onClick={handleSave}
            disabled={!isFormValid || loading}
          >
            {loading ? "Saving..." : race ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
