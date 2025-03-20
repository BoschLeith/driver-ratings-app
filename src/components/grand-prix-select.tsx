import { ChangeEvent, useState, useEffect } from "react";

import { useGrandPrixsQuery } from "../services/query-service";

interface GrandPrixSelectProps {
  selectedGrandPrixId: number | null;
  onGrandPrixSelect: (grandPrixId: number | null) => void;
}

export default function GrandPrixSelect({
  selectedGrandPrixId,
  onGrandPrixSelect,
}: GrandPrixSelectProps) {
  const { data: grandPrixs, isLoading, isError } = useGrandPrixsQuery();
  const [localSelectedGrandPrixId, setLocalSelectedGrandPrixId] = useState<
    number | null
  >(null);

  useEffect(() => {
    setLocalSelectedGrandPrixId(selectedGrandPrixId);
  }, [selectedGrandPrixId]);

  if (isLoading) {
    return <p>Loading grand prixs...</p>;
  }

  if (isError) {
    return <p>Error loading grand prixs.</p>;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const grandPrixId = Number(e.target.value);
    setLocalSelectedGrandPrixId(grandPrixId);
    onGrandPrixSelect(grandPrixId);
  };

  return (
    <label className="floating-label">
      <span>Grand Prix</span>
      <select
        id="grandPrix-select"
        className="select"
        value={localSelectedGrandPrixId || ""}
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
