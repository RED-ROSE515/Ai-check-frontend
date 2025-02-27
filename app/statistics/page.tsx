"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Link, Avatar } from "@heroui/react";
import EChart from "@/components/chart";
import NewCard from "@/components/NewCard";
import { ShinyButton } from "@/components/ui/shiny-button";
import api from "@/utils/api";
import _ from "lodash";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { commify } from "@/utils/number_utils";
import { useSearch } from "@/contexts/SearchContext";
import Loader from "@/components/Loader";

interface ErrorStatistics {
  mathErrors: number;
  methodologyErrors: number;
  logicalFrameworkErrors: number;
  dataAnalysisErrors: number;
  technicalPresentationErrors: number;
  researchQualityErrors: number;
  totalErrors: number;
}

interface Statistics {
  totalPapers: number;
  totalAnalyses: number;
  errorStatistics: ErrorStatistics;
}

const Statistics = () => {
  const { setSortBy } = useSearch();
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState<Statistics>({
    totalPapers: 0,
    totalAnalyses: 0,
    errorStatistics: {
      mathErrors: 0,
      methodologyErrors: 0,
      logicalFrameworkErrors: 0,
      dataAnalysisErrors: 0,
      technicalPresentationErrors: 0,
      researchQualityErrors: 0,
      totalErrors: 0,
    },
  });
  const issues = [
    {
      category: "Total",
      sort: "total_errors",
      type: "",
      // back: "from-[#fbed96] to-[#abecd6]",
      back: "hover:bg-[#338EF7] ",
      whiteback: "hover:bg-[#001731] ",
      count: statistics?.errorStatistics?.totalErrors,
    },
    {
      category: "Math",
      type: "MathError",
      sort: "math_errors",
      // back: "from-[#acb6e5] to-[#86fde8]",
      whiteback: "hover:bg-[#095028] ",
      back: "hover:bg-[#AE7EDE]",
      count: statistics?.errorStatistics?.mathErrors,
    },
    {
      category: "Methodology",
      type: "MethodologyError",
      sort: "methodology_errors",
      // back: "from-[#5433FF] via-[#20BDFF] to-[#A5FECB]",
      whiteback: "hover:bg-[#610726] ",
      back: "hover:bg-[#45D483]",
      count: statistics?.errorStatistics?.methodologyErrors,
    },
    {
      category: "Logical",
      type: "LogicalFrameworkError",
      sort: "logical_framework_errors",
      // back: "from-[#EFEFBB] to-[#D4D3DD]",
      whiteback: "hover:bg-[#661F52] ",
      back: "hover:bg-[#F54180]",
      count: statistics?.errorStatistics?.dataAnalysisErrors,
    },
    {
      category: "Data",
      sort: "data_analysis_errors",
      type: "DataAnalysisError",
      // back: "from-[#FDFC47] to-[#24FE41]",
      whiteback: "hover:bg-[#001731] ",
      back: "hover:bg-[#661F52]",
      count: statistics?.errorStatistics?.dataAnalysisErrors,
    },
    {
      category: "Technical",
      sort: "technical_presentation_errors",
      type: "TechnicalPresentationError",
      // back: "from-[#BA5370] to-[#F4E2D8]",
      whiteback: "hover:bg-[#62420E] ",
      back: "hover:bg-[#F5A524]",
      count: statistics?.errorStatistics?.technicalPresentationErrors,
    },
    {
      category: "Research",
      sort: "research_quality_errors",
      type: "ResearchQualityError",
      // back: "from-[#0099F7] to-[#F11712]",
      back: "hover:bg-[#7EE7FC]",
      whiteback: "hover:bg-[#0E8AAA]",
      count: statistics?.errorStatistics?.researchQualityErrors,
    },
  ];
  const { theme } = useTheme();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [chart, setChart] = useState<"issue" | "speed" | "cost" | "paper">(
    "issue"
  );
  const [recentPapers, setRecentPapers] = useState<any>([]);
  const [recentComments, setRecentComments] = useState<any>([]);
  const getStatistics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/papers/statistics`);
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getRecentPapers = async () => {
    const response = await api.get(
      `/post/pagination?post_type=6&start=0&limit=7`
    );
    setRecentPapers(response.data.data);
  };
  const getRecentComments = async () => {
    const response = await api.get(`/post/recent_comments?start=0&limit=7`);
    setRecentComments(response.data);
  };
  useEffect(() => {
    getStatistics();
    getRecentPapers();
    getRecentComments();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return loading ? (
    <Loader />
  ) : (
    <div className="w-full flex flex-row justify-center">
      <div className="w-full bg-statistics md:w-5/6">
        <div className="flex flex-col justify-start items-start gap-4 px-6 py-6">
          <h1 className="text-3xl font-bold">
            Spot and Correct Research Errors
          </h1>
          <p className="text-lg">
            Leverage advanced AI technology to identify and address potential
            issues in scientific papers. Our Research Audit tool enhances
            research integrity by systematically analyzing papers for writing
            inconsistencies, methodological discrepancies, and more—ensuring
            accurate and reliable scientific knowledge.
          </p>
          <ShinyButton
            className={`${theme === "dark" ? "bg-[#C8E600]" : "bg-[#EE43DE]"}`}
            onClick={() => router.push("/check")}
          >
            <strong
              className={`${theme === "dark" ? "text-black" : "text-white"} font-bold`}
            >
              {"Research Audit"}
            </strong>
          </ShinyButton>
          <div className="mt-4">
            <strong className="block text-xl mb-2">
              Our Research Audit Impact
            </strong>
            <span>
              Our Research Audit tool has rigorously analyzed 28,635 papers,
              uncovering 3,543 potential issues, ranging from writing
              inconsistencies to complex methodological discrepancies. By
              identifying and addressing these challenges, we contribute to
              maintaining the highest standards of research integrity, ensuring
              that every verification strengthens the credibility of scientific
              knowledge.
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 px-6 py-4">
          <NewCard
            title="RESEARCH PAPERS"
            isHoverable
            isPressable
            onPress={() => setChart("paper")}
          >
            <strong className="text-5xl">90M+</strong>
            <p className="mt-4">Published Worldwide</p>
          </NewCard>
          <NewCard
            title="ANALYSIS SPEED"
            isHoverable
            isPressable
            onPress={() => setChart("speed")}
          >
            <strong className="text-5xl">160s</strong>
            <p className="mt-4">Average Time per Paper</p>
          </NewCard>
          <NewCard
            title="COST EFFICIENCY"
            isHoverable
            isPressable
            onPress={() => setChart("cost")}
          >
            <strong className="text-5xl">$0.80</strong>
            <p className="mt-4">Average Cost per Analysis</p>
          </NewCard>

          <NewCard
            title="Total Issues"
            isHoverable
            isPressable
            onPress={() => setChart("issue")}
          >
            <strong className="text-5xl">
              {commify(statistics?.errorStatistics?.totalErrors)}
            </strong>
            <p className="mt-4">Issues Identified</p>
          </NewCard>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 px-6 pb-4">
          <NewCard
            title="RECENT PAPERS"
            className="flex-1 hidden md:flex"
            isHoverable
          >
            <div className="flex flex-col gap-2">
              {recentPapers.map((paper: any, index: number) => {
                return (
                  <Link
                    key={index}
                    className="w-full"
                    href={"/results/" + paper.id}
                  >
                    <Card
                      isHoverable
                      shadow="sm"
                      className="cursor-pointer w-full"
                    >
                      <CardBody>
                        <div className="flex flex-row justify-start items-center w-full max-w-full">
                          <Avatar
                            isBordered
                            radius="sm"
                            size="sm"
                            src={paper.user.avatar}
                          />
                          <p className="ml-3 truncate w-full">{paper.title}</p>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </NewCard>
          <Card className="flex-2 w-full md:w-1/2 bg-transparent">
            <CardBody>
              <EChart
                chartType={chart}
                data={issues.filter((issue) => issue.category !== "Total")}
              />
            </CardBody>
          </Card>
          <NewCard
            title="RECENT COMMENTS"
            className="flex-1 hidden md:flex"
            isHoverable
          >
            <div className="flex flex-col gap-2">
              {recentComments.map((comment: any, index: number) => {
                return (
                  <Link
                    key={index}
                    className="w-full"
                    href={"/results/" + comment.parent_id}
                  >
                    <Card
                      isHoverable
                      shadow="sm"
                      className="cursor-pointer w-full"
                    >
                      <CardBody>
                        <div className="flex flex-row justify-start items-center w-full max-w-full">
                          <Avatar
                            isBordered
                            radius="full"
                            size="sm"
                            src={comment.user.avatar}
                          />
                          <p className="ml-3 truncate w-full">
                            {comment.description}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </NewCard>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 px-6 pb-4">
          <NewCard
            title="PROCESSED PAPERS"
            className="flex-1 md:w-1/4"
            isHoverable
            isPressable
          >
            <strong className="text-5xl">
              {commify(statistics.totalPapers)}
            </strong>
            <p className="mt-4">Papers Processed</p>
          </NewCard>
          {/* <NewCard
            title="Most Common Issue"
            className="flex-1"
            isHoverable
            isPressable
          >
            <strong className="text-5xl">Technical</strong>
            <p className="mt-4">Found 1,256 Tech Presentation Issues</p>
          </NewCard> */}
          <NewCard title="Issue Distribution" className="w-full  md:w-fit">
            <div className="flex flex-wrap gap-3 w-full">
              {issues.map((issue, index: number) => {
                return (
                  <Card
                    className="bg-transparent"
                    isPressable
                    isHoverable
                    onPress={async () => {
                      router.push("/");
                      setSortBy(issue.type || "");
                    }}
                  >
                    <CardBody>
                      <div
                        key={index}
                        className="flex flex-col justify-between items-center w-full"
                      >
                        <p className="font-bold text-lg">{issue.category}</p>
                        <p className="font-semibold text-md">
                          {commify(issue.count)}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          </NewCard>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
