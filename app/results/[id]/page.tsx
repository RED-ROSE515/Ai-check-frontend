"use client";
import React, { useState, useEffect, use } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import axios from "axios";
import { Spinner } from "@heroui/react";
import SummaryWrapper from "@/components/SummaryWrapper";
import SpecialSummary from "@/components/SpecialSummary";
import AnalysisResult from "@/components/AnalysisResult";

const ResultPage = ({ params }: any) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const [pageTitle, setPageTitle] = useState("AI Error Detector Result: ");
  const [pageDescription, setpageDescription] = useState(
    "Check out this AI error detection result: "
  );
  const [pageUrl, setPageUrl] = useState(
    `https://devai1.nobleblocks.com/results/${id}`
  );
  const pageImage = "https:/nobleblocks.com/nerdbunny.png";
  const { theme } = useTheme();
  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState<any>();
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getResultById = async (paperId: number) => {
    try {
      setAnalysisResult("");
      setIsChecking(true);
      setSummaryLoading(true);
      const resp = await axios.get(
        API_BASE_URL + `api/papers/${paperId}/get_summary/`
      );

      setSummaryLoading(false);
      setSummary(resp.data.summary);
      setCheckLoading(true);
      const response = await axios.get(
        API_BASE_URL + `api/papers/${paperId}/check_paper/`
      );

      setCheckLoading(false);
      setAnalysisResult(response.data.analysis);
      setTotalSummary(response.data.summary);
      setPageTitle(
        `AI Error Detector Result: ${resp.data.summary.metadata.title}`
      );
      setpageDescription(
        `Check out this AI error detection result: ${resp.data.summary.summary.child + summary.summary.college + summary.summary.phd}`
      );
      setPageUrl(`https://devai1.nobleblocks.com/results/${id}`);
      // const result = await res.json();
      const result = { data: "KKK", title: id, description: "Description" };
      return result;
    } catch (error) {
      // Handle network or other errors
      // console.error("Error fetching result:", error);
      return null;
    }
  };

  useEffect(() => {
    const newId = id.split("_")[1];
    getResultById(newId);
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Head>
      <div className="flex flex-row justify-center mt-16">
        {summary && (
          <div
            className={`card w-5/6 mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"}`}
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
    </>
  );
};

export default ResultPage;
