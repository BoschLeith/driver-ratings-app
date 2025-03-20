import { useRatersQuery } from "../services/query-service";
import { formatISODateTime } from "../utils/date-utils";

export default function Raters() {
  const { data: raters, isLoading, isError } = useRatersQuery();

  if (isLoading) {
    return <div>Fetching raters...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching raters.</div>;
  }

  if (!raters || raters.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {raters.data.map((rater) => (
            <tr key={rater.id}>
              <td>{rater.id}</td>
              <td>{rater.name}</td>
              <td>{formatISODateTime(rater.createdAt)}</td>
              <td>
                {rater.updatedAt ? formatISODateTime(rater.updatedAt) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
