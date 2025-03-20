import { useEffect, useRef, useState } from "react";

import { Race } from "../types/types";
import GrandPrixSelect from "./grand-prix-select";

interface RaceModalProps {
  race?: Race | null;
}

export default function RaceModal({ race }: RaceModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);
  const [raceDate, setRaceDate] = useState<string>("");

  const isFormValid = raceDate.trim() !== "" && grandPrixId !== null;

  useEffect(() => {
    if (race) {
      setGrandPrixId(race.grandPrixId ?? null);
      setRaceDate(race.date ?? "");
    }
  }, [race]);

  const resetState = () => {
    setGrandPrixId(null);
    setRaceDate("");
  };

  const handleSave = () => {
    if (!grandPrixId || !raceDate) return;

    if (race) {
      console.log("Updating race:", { ...race, grandPrixId, date: raceDate });
      // Call update race API
    } else {
      console.log("Creating new race:", { grandPrixId, date: raceDate });
      // Call create race API
    }

    modalRef.current?.close();
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
            value={raceDate}
            onChange={(e) => setRaceDate(e.target.value)}
          />
        </div>

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
              disabled={!isFormValid}
            >
              {race ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
