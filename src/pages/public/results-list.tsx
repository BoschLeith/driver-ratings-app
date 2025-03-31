import { useResultsByYearQuery } from "../../services/query-service";
import { ApiDriver } from "../../types/types";

export default function Results({ year }: { year: string }) {
  const {
    data: races,
    isLoading,
    isError,
  } = useResultsByYearQuery(Number(year));

  if (isLoading) {
    return <article aria-busy="true"></article>;
  }

  if (isError) {
    return (
      <div role="alert" className="alert alert-danger">
        <p>An error occurred while fetching results. Please try again later.</p>
      </div>
    );
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
      <section>
        <h1>{`${year} Race Results`}</h1>
      </section>
      <main>
        {!races || races.data.length === 0 ? (
          <p>No race data found for {year}.</p>
        ) : (
          races.data.map((race) => {
            const raterNames = getAllRaterNames(race.drivers);
            return (
              <article key={race.raceId}>
                <h2>Race {race.raceId}</h2>
                <table className="mb-0" aria-labelledby={`race-${race.raceId}`}>
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
              </article>
            );
          })
        )}
      </main>
    </>
  );
}
