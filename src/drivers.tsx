import { useDriversQuery } from "./query-service";
import { formatISODate } from "./utils/date-utils";

export default function Drivers() {
  const { drivers, isDriversError, isDriversLoading } = useDriversQuery();

  if (isDriversLoading) {
    return <div>Fetching drivers...</div>;
  }

  if (isDriversError) {
    return <div>An error occurred while fetching drivers.</div>;
  }

  if (!drivers || drivers.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Driver Code</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {drivers.data.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>
                {driver.firstName} {driver.lastName}
              </td>
              <td>{driver.driverCode}</td>
              <td>{formatISODate(driver.createdAt)}</td>
              <td>
                {driver.updatedAt ? formatISODate(driver.updatedAt) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
