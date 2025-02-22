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
const Statistics = () => {
  const issues = [
    { label: "Total", value: "3318" },
    {
      label: "Math",
      value: "384",
    },
    {
      label: "Methodology",
      value: "371",
    },
    {
      label: "Logical ",
      value: "344",
    },
    {
      label: "Data ",
      value: "256",
    },
    {
      label: "Technical ",
      value: "1571",
    },
    {
      label: "Research ",
      value: "392",
    },
  ];
  const { theme } = useTheme();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [chart, setChart] = useState<"issue" | "speed" | "cost" | "paper">(
    "issue"
  );
  const [recentPapers, setRecentPapers] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/post/pagination?post_type=6&start=0&limit=7`
      );
      setRecentPapers(response.data.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
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
            <strong className="text-5xl">3,543</strong>
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
                    href={
                      "/results/" +
                      paper.title
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .toLowerCase()
                        .split(" ")
                        .join("-") +
                      "_" +
                      paper.id +
                      "/"
                    }
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
              <EChart chartType={chart} />
            </CardBody>
          </Card>
          <NewCard
            title="RECENT COMMENTS"
            className="flex-1 hidden md:flex"
            isHoverable
          >
            <div className="flex flex-col gap-2">
              {recentPapers.map((paper: any, index: number) => {
                return (
                  <Link
                    key={index}
                    className="w-full"
                    href={
                      "/results/" +
                      paper.title
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .toLowerCase()
                        .split(" ")
                        .join("-") +
                      "_" +
                      paper.id +
                      "/"
                    }
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
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 px-6 pb-4">
          <NewCard
            title="PROCESSED PAPERS"
            className="flex-1"
            isHoverable
            isPressable
          >
            <strong className="text-5xl">{commify(685)}</strong>
            <p className="mt-4">Papers Processed</p>
          </NewCard>
          <NewCard
            title="Most Common Issue"
            className="flex-1"
            isHoverable
            isPressable
          >
            <strong className="text-5xl">Technical</strong>
            <p className="mt-4">Found 1,256 Tech Presentation Issues</p>
          </NewCard>
          <NewCard title="Issue Distribution" className="w-full md:w-1/2">
            <div className="flex flex-row gap-3 w-full">
              {issues.map((issue, index: number) => {
                return (
                  <Card className="bg-transparent" isPressable isHoverable>
                    <CardBody>
                      <div
                        key={index}
                        className="flex flex-col justify-between items-center w-full"
                      >
                        <p className="font-bold text-lg">{issue.label}</p>
                        <p className="font-semibold text-md">
                          {commify(issue.value)}
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
