import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Rating {
  rating: number;
  raterName: string;
}

interface Driver {
  id: number;
  driverCode: string;
  ratings: Rating[];
}

interface Race {
  raceId: number;
  drivers: Driver[];
}

interface ApiResponse {
  success: boolean;
  data: Race[];
}

const getResults = async () => {
  const response = await axios.get<ApiResponse>(
    "http://localhost:8080/api/races/2024/results"
  );
  return response.data;
};

function Home() {
  const {
    data: races,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["resultsData"],
    queryFn: getResults,
  });

  if (isLoading) return <div>Fetching results...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;
  if (!races || races.data.length === 0) return <div>No data found</div>;

  const getAllRaterNames = (drivers: Driver[]): string[] => {
    const raterNames = new Set<string>();
    drivers.forEach((driver) => {
      driver.ratings.forEach((rating) => raterNames.add(rating.raterName));
    });
    return Array.from(raterNames);
  };

  return (
    <>
      <div>2024 Results</div>
      {races.data.map((race) => {
        const raterNames = getAllRaterNames(race.drivers);
        return (
          <div key={race.raceId}>
            <h2>Race {race.raceId}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Driver</th>
                  {raterNames.map((raterName) => (
                    <th key={raterName}>{raterName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {race.drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.driverCode}</td>
                    {raterNames.map((raterName) => {
                      const rating = driver.ratings.find(
                        (r) => r.raterName === raterName
                      );
                      return (
                        <td key={`${driver.id}-${raterName}`}>
                          {rating ? rating.rating : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export default Home;
