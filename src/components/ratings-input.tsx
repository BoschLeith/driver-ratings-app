import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

import { ApiResponse, Rater } from "../types";

const getRaters = async () => {
  const response = await axios.get<ApiResponse<Rater>>(
    "http://localhost:8080/api/raters"
  );
  return response.data;
};

interface RatingsInputProps {
  onRatingsChange: (ratings: { [key: number]: number }) => void;
}

export default function RatingsInput({ onRatingsChange }: RatingsInputProps) {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const {
    data: raters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ratersData"],
    queryFn: getRaters,
  });

  useEffect(() => {
    onRatingsChange(ratings);
  }, [ratings, onRatingsChange]);

  if (isLoading) {
    return <p>Loading raters...</p>;
  }

  if (isError) {
    return <p>Error loading raters.</p>;
  }

  const handleInputChange = (raterId: number, value: number) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [raterId]: value,
    }));
  };

  return (
    <>
      {raters?.data.map((rater) => (
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
      ))}
    </>
  );
}
