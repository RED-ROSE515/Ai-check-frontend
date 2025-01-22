import React from "react";
import { Typography, Chip, Link, capitalize } from "@mui/material";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Accordion, AccordionItem } from "@heroui/react";

import childImage from "../public/child.jpg";
import collegeImage from "../public/college.jpg";
import phDImage from "../public/phd.jpg";

import { TextAnimate } from "./ui/text-animate";
import AnimatedGradientText from "./ui/animated-gradient-text";
const getColorForScore = (score: number) => {
  switch (true) {
    case score >= 9:
      return "#2E7D32"; // Dark green
    case score >= 8:
      return "#4CAF50"; // Green
    case score >= 7:
      return "#8BC34A"; // Light green
    case score >= 6:
      return "#673AB7"; // Deep purple
    case score >= 5:
      return "#9C27B0"; // Purple
    case score >= 4:
      return "#FF9800"; // Orange
    case score >= 3:
      return "#FF5722"; // Deep orange
    case score >= 2:
      return "#F44336"; // Red
    default:
      return "#D32F2F"; // Dark red
  }
};

const SummaryWrapper = ({ summary }: any) => {
  const { theme } = useTheme();
  const summaryLevels = [
    {
      title: "Child Summary",
      content: summary.summary.child,
      image: childImage,
    },
    {
      title: "College Summary",
      content: summary.summary.college,
      image: collegeImage,
    },
    { title: "PhD Summary", content: summary.summary.phd, image: phDImage },
  ];

  return (
    <div
      className="flex w-full flex-col rounded-lg p-0 md:p-6"
      style={
        theme === "dark"
          ? { backgroundColor: "#1f2a37" }
          : { backgroundColor: "#EEEEEEF0" }
      }
    >
      <Typography className="mb-4 text-center" component="h2" variant="h5">
        <AnimatedGradientText>
          <TextAnimate
            animation="slideLeft"
            by="character"
            className="animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-2xl font-bold text-transparent"
          >
            {summary.metadata.title}
          </TextAnimate>
        </AnimatedGradientText>
      </Typography>

      <div
        className={`my-4 flex flex-wrap gap-2 ${theme === "dark" ? `text-gray-200` : "text-slate-700"}`}
      >
        <strong className="font-bold text-xl">Authors: </strong>
        {summary.metadata.authors.map((author: string, index: number) => (
          <Chip
            key={index}
            color={`${theme === "dark" ? "secondary" : "primary"}`}
            label={
              author.length > 75 ? author.substring(0, 70) + "..." : author
            }
            variant="outlined"
          />
        ))}
      </div>

      {summary.metadata.paper_link && (
        <Link
          className={`mb-4 block hover:underline ${theme === "dark" ? `text-blue-200` : "text-blue-600"}`}
          href={summary.metadata.paper_link}
          rel="noopener noreferrer"
          target="_blank"
        >
          View Original Paper
        </Link>
      )}
      <div className="mt-4 gap-1">
        <Accordion
          className="w-full"
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                overflowY: "unset",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                overflowY: "hidden",
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
          variant="splitted"
        >
          {summaryLevels.map((level, index) => (
            <AccordionItem
              key={index}
              startContent={
                <Image
                  priority
                  alt="NERDBUNNY LOGO"
                  className="rounded-lg"
                  height="45"
                  src={level.image}
                  width="45"
                />
              }
              title={level.title}
              value={index.toString()}
            >
              <p
                className={`text-md font-semibold ${theme === "dark" ? "text-gray-200" : "text-slate-600"}`}
              >
                {level.content}
              </p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-4">
        <span
          className={`text-xl font-bold ${theme === "dark" ? `text-gray-200` : "text-slate-700"}`}
        >
          Publication Info
        </span>
        <div className="flex flex-wrap gap-2">
          <Typography
            className={`${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
            variant="body1"
          >
            <strong>Date: </strong>{" "}
            {summary.metadata.publication_info.date || "Unknown"}
          </Typography>
          <Typography
            className={`${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
            variant="body1"
          >
            <strong>Journal: </strong>
            {summary.metadata?.publication_info?.journal || "Unknown"}
          </Typography>
          <Typography
            className={`${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
            variant="body1"
          >
            <strong>Keywords: </strong>
            {summary.metadata.publication_info.keywords
              ? summary.metadata.publication_info.keywords.join(", ")
              : "Unknown"}
          </Typography>
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`text-xl font-bold ${theme === "dark" ? `text-gray-200` : "text-slate-700"}`}
        >
          Technical Assessment
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(
            summary.technical_assessment
              ? summary.technical_assessment
              : summary.summary.technical_assessment,
          ).map(([key, value]: any) => (
            <Chip
              key={key}
              className="text-lg font-bold text-slate-400"
              label={`${capitalize(key).replace("_", " ")}: ${value}`}
              style={{
                backgroundColor: getColorForScore(value),
                color: "white",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryWrapper;
