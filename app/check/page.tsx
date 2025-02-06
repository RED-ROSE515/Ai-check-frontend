"use client";
import React, { useRef } from "react";
import { Spinner } from "@heroui/react";
import SummaryWrapper from "../../components/SummaryWrapper";
import AnalysisResult from "../../components/AnalysisResult";
import FileUpload from "../../components/file-upload";
import SpecialSummary from "@/components/SpecialSummary";
import { useTheme } from "next-themes";
import { useAnalyze } from "@/contexts/AnalyzeContext";

type TriggerRefType = {
  current: (() => void) | null;
};

export default function App() {
  const { theme } = useTheme();
  const {
    analysisResult,
    summary,
    totalSummary,
    summaryLoading,
    checkLoading,
    isChecking,
    handleAnalyze,
  } = useAnalyze();

  const triggerUploadRef: TriggerRefType = useRef(null);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-5/6">
        <div className="my-4 w-full">
          <FileUpload
            AnalyzePaper={handleAnalyze}
            getPdfList={() => {}}
            onTriggerRef={triggerUploadRef}
          />
        </div>
        {isChecking && (
          <div
            className={`card mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md w-full ${
              theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"
            }`}
          >
            <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
              {summaryLoading && <Spinner className="my-4" color="primary" />}
              {summary && (
                <SummaryWrapper
                  summary={summary}
                  link={
                    "/results/" +
                    summary.metadata.title
                      .replace(/[^a-zA-Z0-9\s]/g, "")
                      .toLowerCase()
                      .split(" ")
                      .join("-") +
                    "_" +
                    summary.metadata.paper_id +
                    "/"
                  }
                />
              )}
            </div>

            {summary && (
              <div className="mb-0 sm:mb-2 w-full">
                {totalSummary && <SpecialSummary summary={totalSummary} />}
                <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-6">
                  {checkLoading && <Spinner className="my-4" color="primary" />}
                  {analysisResult && (
                    <AnalysisResult
                      results={analysisResult}
                      total_summary={totalSummary}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
