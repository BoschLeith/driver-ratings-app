import { useRacesQuery } from "../services/query-service";
import { formatISODate, formatISODateTime } from "../utils/date-utils";

export default function Races() {
  const { data: races, isLoading, isError } = useRacesQuery();

  if (isLoading) {
    return <div>Fetching races...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching races.</div>;
  }

  if (!races || races.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Grand Prix ID</th>
            <th>Date</th>
            <th>Created At</th>
            <th>Updated At</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
