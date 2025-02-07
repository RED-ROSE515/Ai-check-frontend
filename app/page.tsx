"use client";
import React, { useEffect, useState, useRef } from "react";
import { Spinner, Button } from "@heroui/react";
import { Link } from "@heroui/link";
import axios from "axios";
import Pusher from "pusher-js";
import { useTheme } from "next-themes";
import LeftSider from "../components/LeftSider";
import StatisticCard from "../components/StatisticCard";
import SummaryWrapper from "../components/SummaryWrapper";
import AnalysisResult from "../components/AnalysisResult";

import SpecialSummary from "@/components/SpecialSummary";
import { usePagination } from "@/contexts/PaginationContext";

import { useToast } from "@/hooks/use-toast";
import { Chip } from "@heroui/chip";
type TriggerRefType = {
  current: (() => void) | null;
};

export default function Home() {
  const { page, setTotalPage } = usePagination();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { toast } = useToast();
  const { theme } = useTheme();
  const triggerUploadRef: TriggerRefType = useRef(null);
  const User = false;

  const getTotalResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}api/papers/get_analyzed_results/?page=${page}&sort_by=${sortBy}&order=${order}`
      );

      setTotalResults(response.data?.data);
      setTotalPage(response.data.pagination.totalPages);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Analysis Data",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      await getTotalResults();
    };
    fetchData();
  }, [page, sortBy]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Initialize Pusher
        const response = await axios.get(
          API_BASE_URL + `api/papers/get_current_paper_status/`
        );
        if (response.data.paper === undefined || response.data.paper === null) {
          setStatus("The next paper will be analysed shortly...");
        } else {
          setStatus(`Processing :  ${response.data.paper}`);
        }

        const pusher = new Pusher("0d514904adb1d8e8521e", {
          cluster: "us3",
        });

        // Subscribe to the channel
        const channel = pusher.subscribe("my-channel");
        channel.bind("my-event", function (data: any) {
          setStatus(data.message);
          if (
            data.message ===
            "Paper Check finished. Next paper will be processed momentarily..."
          ) {
            getTotalResults();
          }
        });
      } catch (error) {
        console.error("Error fetching paper status:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-start justify-center gap-4">
      {User && (
        <div className="w-full md:w-1/6">
          <LeftSider onUpload={() => triggerUploadRef.current?.()} />
        </div>
      )}
      <div className="mt-4 w-full md:w-5/6 items-center flex flex-col justify-center">
        <div className="mx-auto grid w-full flex-row flex-wrap gap-6 p-4 md:p-12 md:px-36 justify-center md:pt-0">
          <StatisticCard setSortBy={setSortBy} setOrder={setOrder} />
        </div>
        <div className="w-full">
          {status && (
            <Chip color="success" variant="bordered" radius="sm" size="lg">
              {status}
            </Chip>
          )}
          {loading ? (
            <Spinner />
          ) : (
            totalResults.length > 0 &&
            totalResults.map((result: any, index) => {
              return (
                <div key={index}>
                  <Link
                    href={
                      "/results/" +
                      result.title
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .toLowerCase()
                        .split(" ")
                        .join("-") +
                      "_" +
                      result.id +
                      "/"
                    }
                  >
                    <Chip
                      variant="bordered"
                      radius="md"
                      size="lg"
                      className={`my-4 ${theme === "dark" ? "bg-lime-400 hover:bg-lime-600" : "bg-pink-500 hover:bg-pink-600"} `}
                    >
                      <span
                        className={`${theme === "dark" ? "text-black" : "text-white"} text-2xl font-bold`}
                      >
                        Result #{result.result_id}
                      </span>
                    </Chip>
                  </Link>
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
                          link={
                            "/results/" +
                            result.title
                              .replace(/[^a-zA-Z0-9\s]/g, "")
                              .toLowerCase()
                              .split(" ")
                              .join("-") +
                            "_" +
                            result.id +
                            "/"
                          }
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
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
