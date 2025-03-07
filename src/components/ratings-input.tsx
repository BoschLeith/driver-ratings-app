import { useEffect, useState } from "react";

import { Rater } from "../types";

interface RatingsInputProps {
  raters: Rater[] | undefined;
  onRatingsChange: (ratings: { [key: number]: number }) => void;
}

export default function RatingsInput({
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
          <fieldset className="fieldset" key={rater.id}>
            <legend className="fieldset-legend">{rater.name}</legend>
            <input
              type="number"
              className="input w-20"
              placeholder="Rating"
              value={ratings[rater.id] || ""}
              onChange={(e) =>
                handleInputChange(rater.id, Number(e.target.value))
              }
            />
          </fieldset>
        ))
      ) : (
        <div>No raters available</div>
      )}
    </>
  );
}
