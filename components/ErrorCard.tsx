import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { Chip } from "@heroui/react";

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
        return "border-[#00A13A]";
      case "medium":
        return "border-[#E2B53F]";
      case "high":
        return "border-[#B13C3E]"; // Default border color
    }
  };
  const getBackgroundColorClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "low":
        return theme === "dark" ? "bg-[#152D25]" : "bg-[#F0F6F0]";
      case "medium":
        return theme === "dark" ? "bg-[#2D2D25]" : "bg-[#F9F6F0]";
      case "high":
        return theme === "dark" ? "bg-[#28252D]" : "bg-[#F9F0F0]"; // Default border color
    }
  };

  return (
    <div>
      <div className="my-4 flex flex-row items-center justify-between">
        <h2
          className={`text-md sm:text-3xl font-bold text-start capitalize ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
        >
          {error.type} Errors
        </h2>
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
            className={`overflow-hidden relative flex w-full items-start justify-between gap-2 rounded border-1 p-2 ${theme === "dark" ? "text-gray-300" : "text-slate-700"} ${getBorderColorClass(
              finding.severity
            )} ${getBackgroundColorClass(finding.severity)}`}
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
                        : "#17C964",
                  "--ribbon-background":
                    finding.severity.toLowerCase() === "high"
                      ? "#F31260"
                      : finding.severity.toLowerCase() === "medium"
                        ? "#F5A524"
                        : "#17C964",
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
                <span className="mr-6 sm:mr-0">
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
  );
};

export default ErrorCard;
