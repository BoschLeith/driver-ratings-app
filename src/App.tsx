import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Driver {
  name: string;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
}

const getDrivers = async () => {
  const response = await axios.get("http://localhost:8080/api/drivers");
  return response.data.data;
};

function App() {
  const {
    data: drivers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["driversData"],
    queryFn: getDrivers,
  });

  if (isLoading) {
    return <div>Fetching posts...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <>
      <div>Drivers</div>
      <ul>
        {drivers.map((driver: Driver) => (
          <li key={driver.id}>{driver.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
