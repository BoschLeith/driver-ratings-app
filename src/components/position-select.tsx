import { ChangeEvent, useState } from "react";

interface PositionSelectProps {
  onPositionChange: (position: number) => void;
}

export default function PositionSelect({
  onPositionChange,
}: PositionSelectProps) {
  const [selectedPosition, setSelectedPosition] = useState<number>(1);

  const handlePositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPosition = Number(event.target.value);
    setSelectedPosition(newPosition);
    onPositionChange(newPosition);
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
        value={selectedPosition}
        onChange={handlePositionChange}
      >
        {positionOptions}
      </select>
    </fieldset>
  );
}
