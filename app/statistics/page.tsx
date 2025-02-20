"use client";
import React from "react";
import { Card, CardBody } from "@heroui/react";
import EChart from "@/components/chart";
import NewCard from "@/components/NewCard";
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
  return (
    <div className="w-full flex flex-row justify-center">
      <div className="bg-statistics w-full">
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
            {issues.map((issue) => {
              return (
                <div className="flex flex-row justify-between">
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
