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
    <MagicCard
      className="${className} md:shadow-x overflow-hiddenrounded-lg  relative my-4 flex w-full cursor-pointer flex-col items-stretch justify-center border-2 bg-background p-6 shadow-2xl"
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
    >
      <div className="mb-4 flex items-center justify-between">
        {Number(error.counts) === 0 && (
          <div>
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
        <h2
          className={`text-3xl font-bold capitalize ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
        >
          {error.type} Errors
        </h2>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
          {error.counts} Issues
        </span>
      </div>

      <div className="space-y-3">
        {findingsList.map((finding, index) => (
          <div
            key={index}
            className={`flex w-full items-start justify-between gap-2 overflow-x-auto rounded border-2 p-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"} ${getBorderColorClass(
              finding.severity,
            )}`}
          >
            <div className="flex space-x-2">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm text-black">
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span>
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
              className={`${finding.severity.toLowerCase() === "high" ? "bg-red-500" : finding.severity.toLowerCase() === "medium" ? "bg-yellow-500" : "bg-green-500"}`}
              variant="shadow"
            >
              {finding.severity}
            </Chip>
          </div>
        ))}
      </div>
    </MagicCard>
  );
};

export default ErrorCard;
