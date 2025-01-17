import React, { useState, useMemo } from "react";
import ErrorCard from "./ErrorCard";
import Card from "./Card";
import { capitalize, Divider, Tabs, Tab } from "@mui/material";
import { getRandomColorPair } from "../utils/random";
import { NeonGradientCard } from "./ui/neon-gradient-card";

const AnalysisResult = ({ results, total_summary }) => {
  // Generate random colors once when results change
  const cardColors = useMemo(() => {
    return results.map(() => getRandomColorPair());
  }, [results]);
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs
        value={currentTab}
        onChange={(e, tab) => setCurrentTab(tab)}
        variant="scrollable"
        scrollButtons
        textColor="secondary"
        indicatorColor="secondary"
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="All" />
        {results.map((result, index: number) => (
          <Tab label={capitalize(result.type)} />
        ))}
      </Tabs>
      <div className="flex w-full flex-col rounded-lg p-4 md:flex-row">
        <div className="mt-4 w-full md:w-1/5">
          <NeonGradientCard className="mb-4  max-h-32 max-w-md items-center justify-center text-start">
            <h2 className="mb-2 text-4xl font-bold text-slate-700">
              {total_summary.total_errors}
            </h2>
            <strong>{capitalize("Total Errors")}</strong>
          </NeonGradientCard>
          {results.map((result, index: number) => (
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
          {results.map((result, index: number) => (
            <div>
              {currentTab === 0 ? (
                <div>
                  {index !== 0 && <Divider textAlign="left"></Divider>}
                  <ErrorCard key={index} error={result} className="mb-4" />
                </div>
              ) : (
                currentTab - 1 === index && (
                  <ErrorCard key={index} error={result} className="mb-4" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
