import { useState } from "react";

import ResultsList from "../pages/public/results-list";
import { Link } from "react-router";

const tabItems = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
];

export default function PublicLayout() {
  const [selectedYear, setSelectedYear] = useState<string>("2024");

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Driver Ratings</h1>
          <Link to={"/login"} className="btn ml-auto">
            Login
          </Link>
        </div>
        <div className="tabs tabs-box">
          {tabItems.map((item) => (
            <input
              type="radio"
              name="year_tabs"
              className="tab"
              aria-label={item.label}
              defaultChecked={selectedYear === item.value}
              onClick={() => setSelectedYear(item.value)}
              key={item.value}
            />
          ))}
        </div>
        <ResultsList year={selectedYear} />
      </main>
    </div>
  );
}
