import React, { useRef, useEffect } from "react";
import ShineBorder from "./ui/shine-border";
import { useTheme } from "next-themes";
import { MagicCard } from "./ui/magic-card";
import type { ConfettiRef } from "./ui/confetti";
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
              options={{
                get angle() {
                  return Math.random() * 360;
                },
              }}
              className="absolute left-0 top-0 z-0 size-full"
              onMouseEnter={() => {
                confettiRef.current?.fire({});
              }}
            />
          </div>
        )}
        <h2 className="text-3xl font-bold capitalize text-slate-800">
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
            className={`flex w-full items-start gap-2 overflow-x-auto rounded border-2 p-2 text-slate-700 ${getBorderColorClass(
              finding.severity
            )}`}
          >
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
        ))}
      </div>
    </MagicCard>
  );
};

export default ErrorCard;
