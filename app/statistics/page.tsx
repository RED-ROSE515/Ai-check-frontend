"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import EChart from "@/components/chart";
import NewCard from "@/components/NewCard";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
const Statistics = () => {
  const issues = [
    { label: "Total", value: "3,543" },
    {
      label: "Writing check",
      value: "1,256",
    },
    {
      label: "Discrepancy check",
      value: "532",
    },
    {
      label: "Methodology check",
      value: "388",
    },
    {
      label: "Interpretation check",
      value: "241",
    },
    {
      label: "Math check",
      value: "180",
    },
    {
      label: "Figure check",
      value: "17",
    },
  ];
  const { theme } = useTheme();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full flex flex-row justify-center">
      <div className="bg-statistics w-5/6">
        <div className="flex flex-col justify-start items-start gap-4 px-12 py-6">
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
        <div className=" w-full flex flex-row gap-4 px-12 py-4">
          <NewCard title="RESEARCH PAPERS">
            <strong className="text-5xl">90M+</strong>
            <p className="mt-4">Published Worldwide</p>
          </NewCard>
          <NewCard title="ANALYSIS SPEED">
            <strong className="text-5xl">120s</strong>
            <p className="mt-4">Average Time per Paper</p>
          </NewCard>
          <NewCard title="COST EFFICIENCY">
            <strong className="text-5xl">$0.80</strong>
            <p className="mt-4">Average Cost per Analysis</p>
          </NewCard>
          <NewCard title="PAPER PROCESSING">
            <strong className="text-5xl">28,635</strong>
            <p className="mt-4">Papers Processed</p>
          </NewCard>
        </div>
        <div className="w-full flex flex-row gap-4 px-12 pb-4">
          <NewCard title="RECENT COMMENTS" className="flex-1">
            <strong className="text-5xl">28,635</strong>
            <p className="mt-4">Papers Processed</p>
          </NewCard>
          <Card className="flex-2 w-1/2 bg-transparent">
            <CardBody>
              <EChart />
            </CardBody>
          </Card>
          <NewCard title="Issue Distribution" className="flex-1">
            {issues.map((issue, index: number) => {
              return (
                <div key={index} className="flex flex-row justify-between">
                  <p>{issue.label}</p>
                  <p>{issue.value}</p>
                </div>
              );
            })}
          </NewCard>
        </div>
        <div className="w-full flex flex-row gap-4 px-12 pb-4">
          <NewCard title="TEXT PROCESSING">
            <strong className="text-5xl">28,635</strong>
            <p className="mt-4">Papers Processed</p>
          </NewCard>
          <NewCard title="Total Issues">
            <strong className="text-5xl">3,543</strong>
            <p className="mt-4">Issues Identified</p>
          </NewCard>
          <NewCard title="Most Common Issue">
            <strong className="text-5xl">Writing check</strong>
            <p className="mt-4">Found in 1,256 papers</p>
          </NewCard>
          <NewCard title="Issue Distribution">
            <strong className="text-5xl">3,543</strong>
            <p className="mt-4">Issues Identified</p>
          </NewCard>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Statistics;
