import { useEffect, useState } from "react";

import { Rater } from "../types/types";

interface RatingsInputProps {
  index: number;
  raters: Rater[] | undefined;
  onRatingsChange: (ratings: { [key: number]: number }) => void;
}

export default function RatingsInput({
  index,
  raters,
  onRatingsChange,
}: RatingsInputProps) {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    onRatingsChange(ratings);
  }, [ratings, onRatingsChange]);

  const handleInputChange = (raterId: number, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [raterId]: value,
    }));
  };

  return (
    <>
      {raters && raters.length > 0 ? (
        raters.map((rater) => (
          <label className="floating-label" key={rater.id}>
            <span>{rater.name}</span>
            <input
              id={`${rater.name.toLocaleLowerCase()}-input-${index}`}
              type="number"
              className="input"
              placeholder={rater.name}
              value={ratings[rater.id] || ""}
              onChange={(e) =>
                handleInputChange(rater.id, Number(e.target.value))
              }
            />
          </label>
        ))
      ) : (
        <div>No raters available</div>
      )}
    </>
  );
}
