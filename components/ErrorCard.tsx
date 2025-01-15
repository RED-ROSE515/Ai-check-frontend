import React from "react";
import ReactMarkdown from "react-markdown";

interface ErrorDetails {
  type: string;
  error_count: number;
  findings: string;
}

interface ErrorCardProps {
  error: ErrorDetails;
  className: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, className }) => {
  // Convert findings string to array by splitting on numbered items
  const findingsList = error.findings
    .split(/\d+\.\s/)
    .filter((item) => item.trim().length > 0);

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
          {error.error_count} Issues
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
            <ReactMarkdown
              components={{
                h3: ({ children }) => (
                  <h3 className="mb-2 mt-6 text-xl font-bold">{children}</h3>
                ),
                h4: ({ children }) => (
                  <h4 className="mb-2 mt-4 text-lg font-semibold">
                    {children}
                  </h4>
                ),
                p: ({ children }) => <p className="mb-4">{children}</p>,
                ul: ({ children }) => (
                  <ul className="mb-4 ml-6 list-disc">{children}</ul>
                ),
                li: ({ children }) => <li className="mb-2">{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-bold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                hr: () => <hr className="my-6 border-gray-200" />,
              }}
            >
              {finding}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorCard;
