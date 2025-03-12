import { useNavigate } from "react-router";

import { useDriversQuery } from "../services/query-service";
import { formatISODateTime } from "../utils/date-utils";

export default function Drivers() {
  const { data: drivers, isLoading, isError } = useDriversQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Fetching drivers...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching drivers.</div>;
  }

  if (!drivers || drivers.data.length === 0) {
    return <div>No data found</div>;
  }

  const handleCreate = () => {
    navigate("create");
  };

  const handleEdit = (driverId: number) => {
    navigate(`${driverId}/edit`);
  };

  return (
    <>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg">Drivers</h2>
        <button onClick={() => handleCreate()} className="btn">
          Create
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Driver Code</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
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
                <td>{formatISODateTime(driver.createdAt)}</td>
                <td>
                  {driver.updatedAt ? formatISODateTime(driver.updatedAt) : "-"}
                </td>
                <td>
                  <button onClick={() => handleEdit(driver.id)} className="btn">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
