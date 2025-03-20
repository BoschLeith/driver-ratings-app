import { ChangeEvent, useState } from "react";

interface PositionSelectProps {
  index: number;
  onPositionSelect: (position: number | null) => void;
}

export default function PositionSelect({
  index,
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
    <select
      id={`position-select-${index}`}
      className="select"
      value={selectedPosition || ""}
      onChange={handlePositionChange}
    >
      <option value="" disabled>
        Select a position
      </option>
      {positionOptions}
    </select>
  );
}
