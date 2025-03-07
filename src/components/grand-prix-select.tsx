import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";

import { ApiResponse, GrandPrix } from "../types";

const getGrandPrixs = async () => {
  const response = await axios.get<ApiResponse<GrandPrix>>(
    "http://localhost:8080/api/grandPrixs"
  );
  return response.data;
};

interface GrandPrixSelectProps {
  onGrandPrixSelect: (grandPrixId: number | null) => void;
}

export default function GrandPrixSelect({
  onGrandPrixSelect,
}: GrandPrixSelectProps) {
  const [selectedGrandPrixId, setSelectedGrandPrixId] = useState<number | null>(
    null
  );

  const {
    data: grandPrixs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["grandPrixsData"],
    queryFn: getGrandPrixs,
  });

  if (isLoading) {
    return <p>Loading grand prixs...</p>;
  }

  if (isError) {
    return <p>Error loading grand prixs.</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const grandPrixId = Number(e.target.value);
    setSelectedGrandPrixId(grandPrixId);
    onGrandPrixSelect(grandPrixId);
  };

  return (
    <label className="floating-label">
      <span>Grand Prix</span>
      <select
        id="grandPrix-select"
        className="select"
        value={selectedGrandPrixId || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a grand prix
        </option>
        {grandPrixs?.data.map((grandPrix) => (
          <option key={grandPrix.id} value={grandPrix.id}>
            {grandPrix.name}
          </option>
        ))}
      </select>
    </label>
  );
}
