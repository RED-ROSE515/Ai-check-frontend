import React, { useState } from "react";
import { Tabs, Tab, Chip, Divider } from "@heroui/react";
import { useTheme } from "next-themes";
import { MagicCard } from "./ui/magic-card";
import ErrorCard from "./ErrorCard";

const AnalysisResult = ({ results, total_summary }: any) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { theme } = useTheme();
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Tabs
        aria-label="Options"
        className="overflow-x-auto mt-4 w-full"
        style={{ maxWidth: "100vw" }}
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b ",
          cursor: "w-full bg-[#C8E600]",
          tabContent: ` group-data-[selected=true]:text-black ${theme === "dark" ? "text-gray-200" : "text-black"}`,
        }}
        selectedKey={String(currentTab)}
        variant="light"
        onSelectionChange={(key) => setCurrentTab(Number(key))}
      >
        <Tab
          key={0}
          title={
            <div className="flex items-center space-x-2">
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
                <div className="flex items-center font-bold text-md space-x-2">
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
      <div className="flex w-full flex-col gap-4 rounded-lg md:flex-row ">
        <div className="w-full">
          <MagicCard
            background={theme === "dark" ? "bg-[#1E2A36]" : "bg-[#F7F7F7]"}
            className={`md:shadow-x overflow-hidden relative my-1 sm:my-4 flex w-full cursor-pointer flex-col items-stretch justify-center border-2 bg-background p-6 shadow-2xl`}
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            {results.map((result: any, index: number) => (
              <div key={index}>
                {currentTab === 0 ? (
                  <div>
                    <ErrorCard
                      key={index}
                      className="mb-2 sm:mb-4"
                      error={result}
                    />
                  </div>
                ) : (
                  currentTab - 1 === index && (
                    <ErrorCard
                      key={index}
                      className="mb-2 sm:mb-4"
                      error={result}
                    />
                  )
                )}
                {index !== 0 && <Divider />}
              </div>
            ))}
          </MagicCard>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
