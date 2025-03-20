import { useMutation } from "@tanstack/react-query";
import { usePulsy } from "pulsy";
import { useState } from "react";

import CreateResult from "../components/create-result";
import GrandPrixSelect from "../components/grand-prix-select";
import RaceSelect from "../components/race-select";
import { insertRating, insertResult } from "../services/api-service";
import {
  useDriversQuery,
  useRatersQuery,
  useTeamsQuery,
} from "../services/query-service";
import { InsertRating } from "../types/types";

export default function Dashboard() {
  const [auth] = usePulsy<{ user: string }>("auth");
  const [grandPrixId, setGrandPrixId] = useState<number | null>(null);
  const [raceId, setRaceId] = useState<number | null>(null);
  const [results, setResults] = useState<
    {
      driverId: number | null;
      position: number | null;
      ratings: { [key: number]: number };
      teamId: number | null;
    }[]
  >([{ driverId: null, position: null, ratings: {}, teamId: null }]);
  const [createResultCount, setCreateResultCount] = useState(0);
  const { data: drivers } = useDriversQuery();
  const { data: teams } = useTeamsQuery();
  const { data: raters } = useRatersQuery();

  const mutation = useMutation({
    mutationFn: insertResult,
    onSuccess: ({ data }) => {
      const allRatings: InsertRating[] = [];

      data.forEach((result) => {
        const correspondingResult = results.find(
          (r) => r.driverId === result.driverId
        );

        if (correspondingResult) {
          const ratingsArray: InsertRating[] = Object.entries(
            correspondingResult.ratings
          ).map(([raterId, rating]) => ({
            resultId: result.id,
            raterId: Number(raterId),
            rating,
          }));

          allRatings.push(...ratingsArray);
        }
      });

      if (allRatings.length > 0) {
        insertRating(allRatings);
      }
    },
    onError: (error: any) => {
      console.error("Error inserting data:", error);
    },
  });

  const handleGranPrixSelect = (grandPrixId: number | null) => {
    setGrandPrixId(grandPrixId);
  };

  const handleRaceSelect = (raceId: number | null) => {
    setRaceId(raceId);
  };

  // TODO: Add Validation
  const handleClick = () => {
    const dataToSend = results.map((result) => ({
      driverId: result.driverId!,
      teamId: result.teamId!,
      raceId: raceId!,
      position: result.position!,
    }));

    mutation.mutate(dataToSend);
  };

  const handleResultChange =
    (index: number) =>
    (result: {
      driverId: number | null;
      position: number | null;
      ratings: { [key: number]: number };
      teamId: number | null;
    }) => {
      const newResults = [...results];
      newResults[index] = result;
      setResults(newResults);
    };

  const addCreateResult = () => {
    setResults([
      ...results,
      { driverId: null, position: null, ratings: {}, teamId: null },
    ]);
    setCreateResultCount(createResultCount + 1);
  };

  const deleteCreateResult = (index: number) => {
    const newResults = results.filter((_, i) => i !== index);
    setResults(newResults);
  };

  return (
    <>
      <div>
        <h2 className="pb-6">Welcome, {auth.user}!</h2>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <GrandPrixSelect onGrandPrixSelect={handleGranPrixSelect} />
          {grandPrixId && (
            <RaceSelect
              grandPrixId={grandPrixId}
              onRaceSelect={handleRaceSelect}
            />
          )}
        </div>

        {grandPrixId && raceId && (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Ratings</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((_result, index) => (
                    <CreateResult
                      key={index}
                      index={index}
                      onChange={handleResultChange(index)}
                      onDelete={() => deleteCreateResult(index)}
                      drivers={drivers ? drivers.data : []}
                      teams={teams ? teams.data : []}
                      raters={raters ? raters.data : []}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn" onClick={addCreateResult}>
              Add Result
            </button>
          </>
        )}

        <button
          className="btn"
          onClick={handleClick}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Inserting..." : "Insert Data"}
        </button>

        <div className="collapse collapse-arrow bg-base-100 border-base-300 border">
          <input type="checkbox" />
          <div className="collapse-title font-semibold">Dev Tools</div>
          <div className="collapse-content text-sm">
            {grandPrixId && <div>"grandPrixId": {grandPrixId}</div>}
            {raceId && <div>"raceId": {raceId}</div>}
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
