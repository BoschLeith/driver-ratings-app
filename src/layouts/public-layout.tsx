import { ChangeEvent, useState } from "react";
import { Link } from "react-router";

import ResultsList from "../pages/public/results-list";

const years = ["2024", "2025"];

export default function PublicLayout() {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <strong>Driver Ratings</strong>
            </li>
          </ul>
          <ul>
            <li>
              <select name="year" id="year-select" onChange={handleYearChange}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <button>
                <Link to={"/login"} className="contrast">
                  Login
                </Link>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <ResultsList year={selectedYear} />
        </section>
      </main>
    </>
  );
}
