import { useResultsQuery } from "../services/query-service";
import { formatISODateTime } from "../utils/date-utils";

export default function Results() {
  const { data: results, isLoading, isError } = useResultsQuery();

  if (isLoading) {
    return <div>Fetching results...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching results.</div>;
  }

  if (!results || results.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver ID</th>
            <th>Team ID</th>
            <th>Race ID</th>
            <th>Position</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {results.data.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.driverId}</td>
              <td>{result.teamId}</td>
              <td>{result.raceId}</td>
              <td>{result.position}</td>
              <td>{formatISODateTime(result.createdAt)}</td>
              <td>
                {result.updatedAt ? formatISODateTime(result.updatedAt) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
