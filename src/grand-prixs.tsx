import { useGrandPrixsQuery } from "./query-service";
import { formatISODateTime } from "./utils/date-utils";

export default function GrandPrixs() {
  const { data: grandPrixs, isLoading, isError } = useGrandPrixsQuery();

  if (isLoading) {
    return <div>Fetching grand prixs...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching grand prixs.</div>;
  }

  if (!grandPrixs || grandPrixs.data.length === 0) {
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
          {grandPrixs.data.map((grandPrix) => (
            <tr key={grandPrix.id}>
              <td>{grandPrix.id}</td>
              <td>{grandPrix.name}</td>
              <td>{formatISODateTime(grandPrix.createdAt)}</td>
              <td>
                {grandPrix.updatedAt
                  ? formatISODateTime(grandPrix.updatedAt)
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
