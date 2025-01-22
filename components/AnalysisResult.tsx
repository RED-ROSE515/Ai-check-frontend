import React, { useState } from "react";
import { Divider } from "@mui/material";
import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";

import ErrorCard from "./ErrorCard";

export const AllIcon = () => {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 64 64"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32"
        cy="32"
        fill="#4A90E2"
        r="30"
        stroke="#333"
        strokeWidth="2"
      />
      <path
        d="M32 10L48 32L32 54L16 32L32 10Z"
        fill="white"
        stroke="#333"
        strokeWidth="2"
      />
      <text
        alignmentBaseline="middle"
        fill="white"
        fontFamily="Arial"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
        x="32"
        y="36"
      >
        ALL
      </text>
    </svg>
  );
};
export const ErrorIcon = ({ type }: any) => {
  return (
    <div>
      {type === "Mathematical and Calculation Analysis" && (
        <svg
          fill="none"
          height="32"
          viewBox="0 0 64 64"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8Z"
            fill="#FF4444"
            stroke="#D80000"
            strokeWidth="2"
          />
          <path
            d="M20 25L44 39M20 39L44 25"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path d="M28 16H36L34 22H30L28 16Z" fill="white" />
          <path d="M28 48H36L34 42H30L28 48Z" fill="white" />
          <circle cx="32" cy="32" fill="white" r="3" />
        </svg>
      )}
      {type === "Methodological Issues" && (
        <svg
          fill="none"
          height="32"
          viewBox="0 0 64 64"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12C10 10.8954 10.8954 10 12 10H52C53.1046 10 54 10.8954 54 12V52C54 53.1046 53.1046 54 52 54H12C10.8954 54 10 53.1046 10 52V12Z"
            fill="#4A90E2"
          />
          <path
            d="M20 20H44M20 32H44M20 44H44"
            stroke="white"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle cx="26" cy="20" fill="#FF6B6B" r="4" />
          <circle cx="38" cy="32" fill="#FF6B6B" r="4" />
          <circle cx="32" cy="44" fill="#FF6B6B" r="4" />
          <path d="M26 20L38 32L32 44" stroke="#FF6B6B" strokeWidth="2" />
        </svg>
      )}
      {type === "Logical Framework" && (
        <svg
          fill="none"
          height="32"
          viewBox="0 0 64 64"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="#FFD700"
            height="48"
            rx="4"
            stroke="#B8860B"
            strokeWidth="2"
            width="48"
            x="8"
            y="8"
          />
          <path
            d="M16 16H48M16 32H48M16 48H48"
            stroke="#B8860B"
            strokeWidth="3"
          />
          <path
            d="M24 24L40 40M40 24L24 40"
            stroke="#FF0000"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle
            cx="32"
            cy="32"
            fill="none"
            r="12"
            stroke="#FF0000"
            strokeWidth="2"
          />
        </svg>
      )}
      {type === "Data Analysis " && (
        <svg
          fill="none"
          height="64"
          viewBox="0 0 64 64"
          width="64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 56V8H56V56H8Z"
            fill="#E8E8E8"
            stroke="#333"
            strokeWidth="2"
          />
          <path d="M8 44L20 32L32 44L56 20" stroke="#4CAF50" strokeWidth="3" />
          <path d="M8 20L20 32L32 20L56 44" stroke="#FF4444" strokeWidth="3" />
          <circle cx="20" cy="32" fill="#333" r="4" />
          <circle cx="32" cy="32" fill="#333" r="4" />
          <circle cx="44" cy="32" fill="#333" r="4" />
        </svg>
      )}
      {type === "Technical Presentation" && (
        <svg
          fill="none"
          height="32"
          viewBox="0 0 64 64"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            fill="#F5F5F5"
            height="48"
            rx="4"
            stroke="#333"
            strokeWidth="2"
            width="48"
            x="8"
            y="8"
          />
          <path d="M16 16H48M16 32H48M16 48H48" stroke="#333" strokeWidth="3" />
          <path
            d="M24 24L40 40M40 24L24 40"
            stroke="#FF0000"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <rect
            fill="none"
            height="24"
            rx="2"
            stroke="#FF0000"
            strokeWidth="2"
            width="24"
            x="20"
            y="20"
          />
          <circle
            cx="32"
            cy="32"
            fill="none"
            r="8"
            stroke="#FF0000"
            strokeWidth="2"
          />
        </svg>
      )}
      {type === "Research Quality" && (
        <svg
          fill="none"
          height="32"
          viewBox="0 0 64 64"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="32"
            cy="32"
            fill="#E8E8E8"
            r="24"
            stroke="#333"
            strokeWidth="2"
          />
          <path d="M32 16V48M16 32H48" stroke="#333" strokeWidth="3" />
          <path
            d="M24 24L40 40M40 24L24 40"
            stroke="#FF0000"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle
            cx="32"
            cy="32"
            fill="none"
            r="12"
            stroke="#FF0000"
            strokeWidth="2"
          />
          <path d="M32 20L36 28H28L32 20Z" fill="#FF0000" />
        </svg>
      )}
    </div>
  );
};
const AnalysisResult = ({ results, total_summary }: any) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="flex w-full flex-col items-center justify-center px-2 md:px-4">
      <div className="max-w-full overflow-visible overflow-x-scroll">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider ",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-[#06b6d4]",
          }}
          color="primary"
          selectedKey={String(currentTab)}
          variant="underlined"
          onSelectionChange={(key) => setCurrentTab(Number(key))}
        >
          <Tab
            key={0}
            title={
              <div className="flex items-center space-x-2">
                <AllIcon />
                <span>All</span>
                <Chip size="sm" variant="faded">
                  {total_summary.total_errors}
                </Chip>
              </div>
            }
          />
          {results.map((result: any, index: number) => {
            return (
              <Tab
                key={index + 1}
                title={
                  <div className="flex items-center space-x-2">
                    <ErrorIcon type={result.type} />
                    <span>{result.type}</span>
                    <Chip size="sm" variant="faded">
                      {result.counts}
                    </Chip>
                  </div>
                }
              />
            );
          })}
        </Tabs>
      </div>
      <div className="flex w-full flex-col gap-4 rounded-lg p-2 sm:p-4 md:flex-row">
        <div className="w-full">
          {results.map((result: any, index: number) => (
            <div key={index}>
              {currentTab === 0 ? (
                <div>
                  {index !== 0 && <Divider textAlign="left" />}
                  <ErrorCard key={index} className="mb-4" error={result} />
                </div>
              ) : (
                currentTab - 1 === index && (
                  <ErrorCard key={index} className="mb-4" error={result} />
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
