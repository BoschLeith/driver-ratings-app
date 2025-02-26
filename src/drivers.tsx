import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";

interface Driver {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

interface ApiResponse {
  success: boolean;
  data: Driver[];
}

const getDrivers = async () => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8080/api/drivers"
  );
  return response.data;
};

export default function Drivers() {
  const {
    data: drivers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
  });

  if (isLoading) return <div>Fetching drivers...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!drivers || drivers.data.length === 0) return <div>No data found</div>;

  return (
    <>
      <div>Drivers</div>
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
          {drivers.data.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>
                {DateTime.fromISO(driver.createdAt).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </td>
              <td>
                {driver.updatedAt
                  ? DateTime.fromISO(driver.updatedAt).toLocaleString(
                      DateTime.DATETIME_MED
                    )
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
