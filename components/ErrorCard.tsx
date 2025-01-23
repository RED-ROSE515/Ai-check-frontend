import type { ConfettiRef } from "./ui/confetti";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Chip } from "@heroui/react";

import { MagicCard } from "./ui/magic-card";
import Confetti from "./ui/confetti";

interface ErrorDetails {
  type: string;
  counts: number;
  findings: ErrorFinding[];
}

interface ErrorFinding {
  error: string;
  explanation: string;
  location: string;
  solution: string;
  severity: string;
}

interface ErrorCardProps {
  error: ErrorDetails;
  className: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, className }) => {
  // Convert findings string to array by splitting on numbered items
  const findingsList = error.findings;
  const { theme } = useTheme();
  const getBorderColorClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return "border-lime-500";
      case "medium":
        return "border-amber-500";
      case "high":
        return "border-red-500"; // Default border color
    }
  };
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    if (confettiRef.current) {
      confettiRef.current?.fire({});
    }
  }, []);

  return (
    // <MagicCard
    //   className="${className} md:shadow-x overflow-hiddenrounded-lg  relative my-1 sm:my-4 flex w-full cursor-pointer flex-col items-stretch justify-center border-2 bg-background p-6 shadow-2xl"
    //   gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
    // >
    <div>
      <div className="my-4 flex flex-row items-center justify-between">
        <h2
          className={`text-md sm:text-3xl font-bold text-start capitalize ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
        >
          {error.type} Errors
        </h2>
        {Number(error.counts) === 0 && (
          <div className="">
            <Confetti
              ref={confettiRef}
              className="absolute left-0 top-0 z-0 size-full"
              options={{
                get angle() {
                  return Math.random() * 360;
                },
              }}
              onMouseEnter={() => {
                confettiRef.current?.fire({});
              }}
            />
          </div>
        )}
        <Chip
          className={`rounded-full  px-3 py-1 text-xs sm:text-sm font-medium ${Number(error.counts) === 0 ? "bg-green-200 text-green-700" : Number(error.counts) <= 3 ? "bg-orange-200 text-orange-700" : "bg-red-100 text-red-700"} `}
          variant="shadow"
        >
          {error.counts + " Issues"}
        </Chip>
      </div>

      <div className="space-y-3">
        {findingsList.map((finding, index) => (
          <div
            key={index}
            className={`overflow-hidden relative flex w-full items-start justify-between gap-2 rounded border-2 p-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"} ${getBorderColorClass(
              finding.severity
            )}`}
          >
            <div
              className={`ribbon ribbon-top-right sm:hidden`}
              style={
                {
                  "--ribbon-border-color":
                    finding.severity.toLowerCase() === "high"
                      ? "#F31260"
                      : finding.severity.toLowerCase() === "medium"
                        ? "#F5A524"
                        : "#006FEE",
                  "--ribbon-background":
                    finding.severity.toLowerCase() === "high"
                      ? "#F31260"
                      : finding.severity.toLowerCase() === "medium"
                        ? "#F5A524"
                        : "#006FEE",
                } as React.CSSProperties
              }
            >
              <span>{finding.severity}</span>
            </div>
            <div className="flex space-x-2 ">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm text-black">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span className="mr-4 sm:mr-0">
                  <strong>Error : </strong>
                  {finding.error}
                </span>
                <span>
                  <strong>Location : </strong>
                  {finding.location}
                </span>
                <span>
                  <strong>Explanation : </strong>
                  {finding.explanation}
                </span>
                <span>
                  <strong>Solution : </strong>
                  {finding.solution}
                </span>
              </div>
            </div>
            <Chip
              className={`${finding.severity.toLowerCase() === "high" ? "bg-red-500" : finding.severity.toLowerCase() === "medium" ? "bg-yellow-500" : "bg-green-500"} hidden sm:flex`}
              variant="shadow"
            >
              {finding.severity}
            </Chip>
          </div>
        ))}
      </div>
    </div>
    // </MagicCard>
  );
};

export default ErrorCard;
