import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import { Spinner } from "@heroui/react";
import SummaryWrapper from "./SummaryWrapper";
import SpecialSummary from "./SpecialSummary";
import AnalysisResult from "./AnalysisResult";

const ResultWrapper = ({ id }: any) => {
  const { theme } = useTheme();
  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getResultById = (id: number) => {
    try {
      setSummary("");
      setAnalysisResult("");
      setIsChecking(true);
      setSummaryLoading(true);
      const resp: any = axios.get(
        API_BASE_URL + `api/papers/${id}/get_summary/`
      );

      setSummaryLoading(false);
      setSummary(resp.data.summary);
      setCheckLoading(true);
      const response: any = axios.get(
        API_BASE_URL + `api/papers/${id}/check_paper/`
      );

      setCheckLoading(false);
      setAnalysisResult(response.data.analysis);
      setTotalSummary(response.data.summary);
      // const result = await res.json();
      const result = { data: "KKK", title: id, description: "Description" };
      return result;
    } catch (error) {
      // Handle network or other errors
      console.error("Error fetching result:", error);
      return null;
    }
  };

  useEffect(() => {
    getResultById(id);
  }, []);

  return (
    <div>
      {summary && (
        <div
          className={`card mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md w-full ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"}`}
        >
          <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
            {summaryLoading && <Spinner className="my-4" color="primary" />}
            {summary && (
              <SummaryWrapper
                summary={summary}
                // input_tokens={input_tokens}
                // output_tokens={output_tokens}
                // total_cost={total_cost}
              />
            )}
          </div>

          {summary && (
            <div className="mb-0 sm:mb-2 w-full">
              <SpecialSummary summary={totalSummary} />
              <div
                className={
                  "flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-6"
                }
              >
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
  );
};

export default ResultWrapper;
