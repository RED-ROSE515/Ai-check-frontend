import React, { useState, useMemo } from "react";
import ErrorCard from "./ErrorCard";
import Card from "./Card";
import { capitalize } from "@mui/material";
import { getRandomColorPair } from "../utils/random";

const AnalysisResult = ({ results }) => {
  // Generate random colors once when results change
  const cardColors = useMemo(() => {
    return results.map(() => getRandomColorPair());
  }, [results]);

  return (
    <div className="flex w-full flex-col rounded-lg p-4 md:flex-row">
      <div className="mt-4 w-full md:w-1/5">
        {results.map((result, index) => (
          <Card
            key={index}
            backgroundColor={cardColors[index].backgroundColor}
            outlineColor={cardColors[index].outlineColor}
            title={capitalize(result.type + " Errors")}
            className="mx-2 mb-4"
            count={result.counts}
          />
        ))}
      </div>
      <div className="mx-2 w-full md:w-4/5">
        {results.map((result, index) => (
          <ErrorCard key={index} error={result} className="mb-4" />
        ))}
      </div>
    </div>
  );
};

export default AnalysisResult;
