import React, { useState } from "react";
import { Typography, capitalize } from "@mui/material";
import { Chip } from "@heroui/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import {
  Accordion,
  AccordionItem,
  Card,
  Button,
  Divider,
  Link,
  Tooltip,
} from "@heroui/react";
import childImage from "../public/NerdBunnyUI/navy.png";
import collegeImage from "../public/NerdBunnyUI/white.png";
import phDImage from "../public/NerdBunnyUI/gold.png";
import { commify } from "@/utils/number_utils";
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

const SummaryWrapper = ({
  summary,
  input_tokens,
  output_tokens,
  total_cost,
  link,
}: any) => {
  const { theme } = useTheme();
  const [expand, setExpand] = useState(false);
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
      className="flex w-full flex-col rounded-lg p-4 md:px-4"
      style={
        theme === "dark"
          ? { backgroundColor: "#1f2a37" }
          : { backgroundColor: "#EEEEEEF0" }
      }
    >
      <div className="w-full flex flex-row justify-center">
        <span>
          <Link
            href={link}
            className="w-full mb-4 text-center font-bold text-2xl"
          >
            {summary.metadata.title}
          </Link>
        </span>
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        <div>
          <div
            className={`my-4 w-full flex flex-wrap gap-2 ${
              theme === "dark" ? `text-gray-200` : "text-slate-700"
            }`}
          >
            <strong className="font-bold text-lg md:text-xl w-full md:w-auto">
              Authors:
            </strong>
            {summary.metadata.authors.map(
              (author: string, index: number) =>
                (index < 3 || expand) && (
                  <Tooltip
                    key={index}
                    content={author.split("(")[1]}
                    placement="bottom"
                    className="max-w-[50vw]"
                    closeDelay={1000}
                  >
                    <Chip
                      className={`${theme === "dark" ? "secondary" : "primary"}`}
                      variant="dot"
                    >
                      {author.split("(")[0]}
                    </Chip>
                  </Tooltip>
                )
            )}
            {summary.metadata.authors.length > 3 && (
              <Button
                size="sm"
                variant="ghost"
                onPress={() => setExpand(!expand)}
                className="w-full md:w-auto"
              >
                {`${expand ? "Show Little..." : "Load More..."}`}
              </Button>
            )}
          </div>
          {summary.metadata.paper_link && (
            <div>
              <Link
                className={`mb-4 block hover:underline truncate w-fit ${theme === "dark" ? `text-blue-200` : "text-blue-600"}`}
                href={summary.metadata.paper_link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {summary.metadata.paper_link}
              </Link>
            </div>
          )}
        </div>

        {input_tokens && output_tokens && total_cost && (
          <div className="w-full md:w-auto">
            <Card
              className={`min-w-[120px] md:min-w-[135px] p-2 md:p-4 flex flex-col justify-start items-start ${theme === "dark" ? "bg-[#001731]" : "bg-gray-200"}`}
            >
              <p>{`IN: ${commify(input_tokens)}`}</p>
              <Divider />
              <p>{`OUT: ${commify(output_tokens)}`}</p>
              <Divider />
              <p>{`$ ${total_cost}`}</p>
            </Card>
          </div>
        )}
      </div>

      <div className="mt-4 gap-1 w-full" style={{ marginLeft: "-0.5rem" }}>
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
              title={<strong className="text-lg">{level.title}</strong>}
              value={index.toString()}
            >
              <p
                className={`text-md font-semibold ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
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
              : summary.summary.technical_assessment
          ).map(([key, value]: any) => (
            <Chip
              key={key}
              className="text-sm sm:text-md font-bold text-slate-400"
              style={{
                backgroundColor: getColorForScore(value),
                color: "white",
              }}
              variant="shadow"
            >
              {`${capitalize(key).replace("_", " ")}: ${value}`}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryWrapper;
