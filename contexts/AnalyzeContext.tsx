"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { sleep } from "@/components/file-upload";
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/contexts/ProgressContext";
import { ToastAction } from "@/components/ui/toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AnalyzeContextType {
  analysisResult: string;
  summary: any;
  totalSummary: string;
  summaryLoading: boolean;
  checkLoading: boolean;
  isChecking: boolean;
  handleAnalyze: (id: number) => Promise<void>;
  resetState: () => void;
}

const AnalyzeContext = createContext<AnalyzeContextType>({
  analysisResult: "",
  summary: "",
  totalSummary: "",
  summaryLoading: false,
  checkLoading: false,
  isChecking: false,
  handleAnalyze: async () => {},
  resetState: () => {},
});

export const AnalyzeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState("");

  const { setLoading, setProgress } = useLoading();
  const { toast } = useToast();

  const resetState = () => {
    setAnalysisResult("");
    setSummary("");
    setTotalSummary("");
    setSummaryLoading(false);
    setCheckLoading(false);
    setIsChecking(false);
  };

  const handleAnalyze = async (id: number) => {
    try {
      setLoading(true);
      setProgress(0);
      await toast({
        title: "Queued for Processing",
        description:
          "Your file has been uploaded and is now in the queue for AI analysis.",
        duration: 2000,
      });
      await sleep(2000);
      await toast({
        title: "Processing Started",
        description: "Processing now... This may take up to 5 minutes.",
        duration: 2000,
      });
      await sleep(2000);

      setSummary("");
      setAnalysisResult("");
      setIsChecking(true);
      setSummaryLoading(true);

      let totalDuration = 200000;
      let interval = 200;
      let currentProgress = 0;

      const intervalId = setInterval(() => {
        currentProgress += (interval / totalDuration) * 100;
        setProgress(Math.min(currentProgress, 99));

        if (currentProgress.toFixed(1) === "25.0") {
          toast({
            title: "Processing at 25%",
            description: "Analyzing text and structure of paper.",
            duration: 5000,
          });
        }
        if (currentProgress.toFixed(1) === "75.0") {
          toast({
            title: "Processing at 75%",
            description:
              "Verifying results and generating final report for paper.",
            duration: 5000,
          });
        }
      }, interval);

      const resp = await axios.get(
        API_BASE_URL + `api/papers/${id}/get_summary/`
      );
      totalDuration = (currentProgress / 50) * totalDuration;

      await toast({
        title: "Processing at 50%",
        description:
          "Checking for inconsistencies and potential errors in paper.",
        duration: 5000,
      });

      setSummaryLoading(false);
      setSummary(resp.data.summary);
      setCheckLoading(true);

      const response = await axios.get(
        API_BASE_URL + `api/papers/${id}/check_paper/`
      );
      clearInterval(intervalId);
      setProgress(100);
      setCheckLoading(false);
      setAnalysisResult(response.data.analysis);
      setTotalSummary(response.data.summary);

      await toast({
        title: "Processing Complete",
        description:
          "Analysis complete for uploaded paper! Click here to view results.",
        action: (
          <ToastAction
            altText="View Paper"
            onClick={() =>
              window.open(
                "/results/" +
                  response.data.metadata.title
                    .replace(/[^a-zA-Z0-9\s]/g, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") +
                  "_" +
                  response.data.metadata.paper_id +
                  "/",
                "_blank"
              )
            }
          >
            View
          </ToastAction>
        ),
        duration: 5000,
      });
      await sleep(5000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message || "Something went wrong!",
          duration: 1000,
        });
      }
    }
  };

  return (
    <AnalyzeContext.Provider
      value={{
        analysisResult,
        summary,
        totalSummary,
        summaryLoading,
        checkLoading,
        isChecking,
        handleAnalyze,
        resetState,
      }}
    >
      {children}
    </AnalyzeContext.Provider>
  );
};

export const useAnalyze = () => useContext(AnalyzeContext);
