import { ChangeEvent, useState } from "react";

interface PositionSelectProps {
  onPositionSelect: (position: number | null) => void;
}

export default function PositionSelect({
  onPositionSelect,
}: PositionSelectProps) {
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const handlePositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPosition = Number(event.target.value);
    setSelectedPosition(newPosition);
    onPositionSelect(newPosition);
  };

  const positionOptions = [];
  for (let i = 1; i <= 20; i++) {
    positionOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">Position</legend>
      <select
        className="select"
        value={selectedPosition || ""}
        onChange={handlePositionChange}
      >
        <option value="" disabled>
          Select a position
        </option>
        {positionOptions}
      </select>
    </fieldset>
  );
}
