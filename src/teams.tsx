import { useTeamsQuery } from "./query-service";
import { formatISODateTime } from "./utils/date-utils";

export default function Teams() {
  const { data: teams, isLoading, isError } = useTeamsQuery();

  if (isLoading) {
    return <div>Fetching teams...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching teams.</div>;
  }

  if (!teams || teams.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {teams.data.map((team) => (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.fullName}</td>
              <td>{team.name}</td>
              <td>{formatISODateTime(team.createdAt)}</td>
              <td>
                {team.updatedAt ? formatISODateTime(team.updatedAt) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
