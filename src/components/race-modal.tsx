import { useEffect, useRef, useState } from "react";

import { POST, PUT } from "../api/axios-instance";
import { Race } from "../types/types";
import GrandPrixSelect from "./grand-prix-select";

interface RaceModalProps {
  race?: Race | null;
  onRaceUpdate: (savedRace: Race) => void;
  onRaceCreate: (savedRace: Race) => void;
}

export default function RaceModal({
  race,
  onRaceUpdate,
  onRaceCreate,
}: RaceModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");

  const isFormValid = date.trim() !== "" && grandPrixId !== null;

  useEffect(() => {
    if (race) {
      setGrandPrixId(race.grandPrixId ?? null);
      setDate(race.date ?? "");
    }
  }, [race]);

  const resetState = () => {
    setGrandPrixId(null);
    setDate("");
  };

  const handleSave = async () => {
    if (!grandPrixId || !date) return;

    setLoading(true);
    setError(null);

    const raceData = { grandPrixId, date };

    try {
      let savedRace: Race | null = null;

      if (race) {
        const { success, data, message } = await PUT<Race>(
          `/races/${race.id}`,
          raceData
        );

        if (success) {
          savedRace = data;
        } else {
          setError(message);
        }
      } else {
        // Create new race
        const { success, data, message } = await POST<Race>("/races", raceData);

        if (success) {
          savedRace = data;
        } else {
          setError(message);
        }
      }

      if (savedRace) {
        resetState();

        if (race) {
          onRaceUpdate(savedRace);
        } else {
          onRaceCreate(savedRace);
        }

        modalRef.current?.close();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("There was an unknown error saving the race data.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={modalRef}
      id="race_modal"
      className="modal"
      onClose={() => resetState()}
    >
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
          <form method="dialog">
            <button
              className="btn"
              type="button"
              onClick={() => modalRef.current?.close()}
            >
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
          </form>
        </div>
      </div>
    </dialog>
  );
}
