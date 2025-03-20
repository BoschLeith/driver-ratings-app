import { useResultsByYearQuery } from "../services/query-service";
import { ApiDriver } from "../types/types";

export default function Home() {
  const { data: races, isLoading, isError } = useResultsByYearQuery(2024);

  if (isLoading) {
    return <div>Fetching results...</div>;
  }

  if (isError) {
    return <div>An error occurred while fetching results.</div>;
  }

  if (!races || races.data.length === 0) {
    return <div>No data found</div>;
  }

  const getAllRaterNames = (drivers: ApiDriver[]): string[] => {
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
