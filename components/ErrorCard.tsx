import React from "react";
import ReactMarkdown from "react-markdown";

interface ErrorDetails {
  type: string;
  counts: number;
  findings: ErrorFinding[];
}

interface ErrorFinding {
  error: string;
  explanation: string;
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

  return (
    <div
      className={`my-4 rounded-lg border-2 bg-white p-6 shadow-xl ${className}`}
      style={{
        borderColor: "#9D59EF",
        backgroundColor: "transparent",
      }}
    >
      <div className="mb-4 flex items-center justify-between">
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
            className="flex w-full items-start gap-2 overflow-x-auto text-slate-700"
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
    </div>
  );
};

export default ErrorCard;
