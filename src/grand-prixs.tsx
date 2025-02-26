import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";

interface GrandPrixs {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string | null;
}

interface ApiResponse {
  success: boolean;
  data: GrandPrixs[];
}

const getGrandPrixs = async () => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8080/api/grandPrixs"
  );
  return response.data;
};

export default function GrandPrixs() {
  const {
    data: grandPrixs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["grandPrixsData"],
    queryFn: getGrandPrixs,
  });

  if (isLoading) return <div>Fetching grand prixs...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!grandPrixs || grandPrixs.data.length === 0)
    return <div>No data found</div>;

  return (
    <>
      <div>Grand Prixs</div>
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
              <td>
                {DateTime.fromISO(grandPrix.createdAt).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </td>
              <td>
                {grandPrix.updatedAt
                  ? DateTime.fromISO(grandPrix.updatedAt).toLocaleString(
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
