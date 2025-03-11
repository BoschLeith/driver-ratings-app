import { useRatingsQuery } from "../services/query-service";
import { formatISODateTime } from "../utils/date-utils";

export default function Ratings() {
  const { data: ratings, isLoading, isError } = useRatingsQuery();

  if (isLoading) {
    return <div>Fetching ratings...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching ratings.</div>;
  }

  if (!ratings || ratings.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Result ID</th>
            <th>Rater ID</th>
            <th>Rating</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {ratings.data.map((rating) => (
            <tr key={rating.id}>
              <td>{rating.id}</td>
              <td>{rating.resultId}</td>
              <td>{rating.raterId}</td>
              <td>{rating.rating}</td>
              <td>{formatISODateTime(rating.createdAt)}</td>
              <td>
                {rating.updatedAt ? formatISODateTime(rating.updatedAt) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
