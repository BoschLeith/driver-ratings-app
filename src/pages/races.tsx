import { Pencil, Plus, Trash } from "lucide-react";

import { useRacesQuery } from "../services/query-service";
import { formatISODate, formatISODateTime } from "../utils/date-utils";

export default function Races() {
  const { data: races, isLoading, isError } = useRacesQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return <div>An error occurred while fetching races.</div>;
  }

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Races</h2>
          <button
            className="btn ml-auto"
            // onClick={() => {
            //   handleCreateClick();
            // }}
          >
            <Plus />
            Add Race
          </button>
        </div>
        {!races || races.data.length === 0 ? (
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
                {races.data.map((race) => (
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
                        // onClick={() => handleEditClick(race)}
                      >
                        <Pencil />
                      </button>
                      <button
                        className="btn btn-square"
                        // onClick={() => handleDeleteClick(race)}
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
    </div>
  );
}
