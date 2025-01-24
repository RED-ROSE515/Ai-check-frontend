"use client";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "@heroui/spinner";
import axios from "axios";
import { useTheme } from "next-themes";
import { Pagination } from "@heroui/pagination";
import { useAnalysis } from "@/contexts/AnalysisContext";
import LeftSider from "../components/LeftSider";
import StatisticCard from "../components/StatisticCard";
import FileUpload from "../components/file-upload";
import ShineBorder from "../components/ui/shine-border";
import SummaryWrapper from "../components/SummaryWrapper";
import AnalysisResult from "../components/AnalysisResult";

import SpecialSummary from "@/components/SpecialSummary";
import { usePagination } from "@/contexts/PaginationContext";

import { useToast } from "@/hooks/use-toast";

type TriggerRefType = {
  current: (() => void) | null;
};

export default function Home() {
  const { isAnalyzing } = useAnalysis();
  const { page, setTotalPage } = usePagination();
  const [pdfList, setPdfList] = useState([]);
  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState("");
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [isGettingList, setIsGettingList] = useState(false);
  const [streamData, setStreamData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { toast } = useToast();
  const { theme } = useTheme();
  const triggerUploadRef: TriggerRefType = useRef(null);
  const User = false;

  const getPdfList = async () => {
    try {
      setIsGettingList(true);
      const response = await axios.get(API_BASE_URL + "api/papers/");

      setPdfList(response.data);
      toast({
        title: "Paper Fetch",
        description: "Load Pdfs successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Paper Fetch",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    } finally {
      setIsGettingList(false);
    }
  };

  const getTotalResults = async () => {
    try {
      setLoading(true);
      setSummary("");
      setAnalysisResult("");
      const response = await axios.get(
        `${API_BASE_URL}api/papers/get_analyzed_results/?page=${page}&sort_by=${sortBy}&order=${order}`
      );

      setTotalResults(response.data?.data);
      setTotalPage(response.data.pagination.totalPages);
      toast({
        title: "Analysis Data",
        description: "Load Analyzed Papers!",
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Analysis Data",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeStream = async (id: number) => {
    setAnalyzingId(id);
    setStreamData("");
    setIsStreaming(true);

    const evtSource = new EventSource(
      API_BASE_URL + `api/papers/${id}/check_paper_fully/`,
      {
        withCredentials: true,
      }
    );

    evtSource.onmessage = (event) => {
      if (event.data === "[$Analysis Done.$]") {
        evtSource.close();
        setAnalyzingId(null);
      } else {
        setStreamData((prev) => prev + event.data + "\n");
      }
    };
  };

  const handleAnalyze = async (id: number) => {
    setSummary("");
    setAnalysisResult("");
    setIsChecking(true);
    setAnalyzingId(id);
    setSummaryLoading(true);
    const resp = await axios.get(
      API_BASE_URL + `api/papers/${id}/get_summary/`
    );

    setSummaryLoading(false);
    setSummary(resp.data.summary);
    setCheckLoading(true);
    const response = await axios.get(
      API_BASE_URL + `api/papers/${id}/check_paper/`
    );

    setCheckLoading(false);
    setAnalysisResult(response.data.analysis);
    setTotalSummary(response.data.summary);
    setAnalyzingId(null);
  };

  useEffect(() => {
    getPdfList();
    getTotalResults();
  }, [page, sortBy]);

  return (
    <section className="flex flex-col md:flex-row items-start justify-center gap-4">
      {User && (
        <div className="w-full md:w-1/6">
          <LeftSider onUpload={() => triggerUploadRef.current?.()} />
        </div>
      )}
      {isAnalyzing && (
        <div>
          <strong>Analyzing</strong>
        </div>
      )}
      <div className="mt-8 w-full md:w-5/6 items-center flex flex-col justify-center">
        <div className="mx-auto grid w-full flex-row flex-wrap gap-6 p-4 md:p-12 md:px-36">
          <StatisticCard setSortBy={setSortBy} setOrder={setOrder} />
        </div>
        {User && (
          <div className="mb-4 w-full">
            <FileUpload
              AnalyzePaper={(id: number) => handleAnalyze(id)}
              getPdfList={() => getPdfList()}
              onTriggerRef={triggerUploadRef}
            />
          </div>
        )}
        {isChecking && (
          <div className="card mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md w-full">
            <ShineBorder
              borderWidth={3}
              className="relative flex w-full flex-col items-stretch overflow-hidden rounded-lg border-2 bg-[#EEEEEEF0] p-6 shadow-xl md:shadow-xl"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-4">
                {summaryLoading && <Spinner className="my-4" color="primary" />}
                {summary && <SummaryWrapper summary={summary} />}
              </div>

              {summary && (
                <div className="mb-6 md:mb-12">
                  <SpecialSummary summary={totalSummary} />
                  <div
                    className={
                      "flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-6"
                    }
                  >
                    {checkLoading && (
                      <Spinner className="my-4" color="primary" />
                    )}
                    {analysisResult && (
                      <AnalysisResult
                        results={analysisResult}
                        total_summary={totalSummary}
                      />
                    )}
                  </div>
                </div>
              )}
            </ShineBorder>
          </div>
        )}
        {totalResults.length > 0 &&
          totalResults.map((result: any, index) => {
            return (
              <div
                key={index}
                className={`card mb-8 md:mb-16 flex flex-col items-center justify-center rounded border-2 shadow-md w-full ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"}`}
              >
                <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
                  {result?.paperSummary && (
                    <SummaryWrapper
                      summary={result.paperSummary}
                      input_tokens={result.input_tokens}
                      output_tokens={result.output_tokens}
                      total_cost={result.total_cost}
                    />
                  )}
                </div>

                <div className="mb-0 sm:mb-2 w-full">
                  <SpecialSummary summary={result.paperAnalysis.summary} />
                  <div
                    className={
                      "flex flex-col items-center justify-center rounded-md p-0 md:flex-row"
                    }
                  >
                    {result.paperAnalysis?.analysis && (
                      <AnalysisResult
                        results={result.paperAnalysis.analysis}
                        total_summary={result.paperAnalysis.summary}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        <span>
          | All Rights Reserved | Terms and Conditions | Privacy Policy
        </span>
      </div>
    </section>
  );
}
