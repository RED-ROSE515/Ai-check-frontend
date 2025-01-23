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
} from "@heroui/react";
import { MagicCard } from "./ui/magic-card";
import { ShinyButton } from "./ui/shiny-button";
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
      className="flex w-full flex-col rounded-lg p-4 md:p-0"
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
            className={`animate-gradient bg-gradient-to-r  bg-[length:var(--bg-size)_100%] bg-clip-text text-2xl font-bold text-transparent ${theme === "dark" ? "from-[#000000] via-[#1304279f] to-[#000000]" : "from-[#ffaa40] via-[#9c40ff] to-[#ffaa40]"}`}
          >
            {summary.metadata.title}
          </TextAnimate>
        </AnimatedGradientText>
      </Typography>

      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        <div
          className={`my-4 w-full flex flex-wrap gap-2 ${
            theme === "dark" ? `text-gray-200` : "text-slate-700"
          }`}
        >
          <strong className="font-bold text-lg md:text-xl w-full md:w-auto">
            Authors:{" "}
          </strong>
          {summary.metadata.authors.map(
            (author: string, index: number) =>
              (index < 3 || expand) && (
                <Chip
                  key={index}
                  className={`${theme === "dark" ? "secondary" : "primary"}`}
                  variant="dot"
                >
                  {author.length > 40
                    ? author.substring(0, 40) + "..."
                    : author}
                </Chip>
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
        {input_tokens && output_tokens && total_cost && (
          <div className="w-full md:w-auto">
            <Card
              className={`min-w-[125px] md:min-w-[150px] p-2 md:p-4 flex flex-col justify-center items-center ${theme === "dark" ? "bg-[#001731]" : "bg-[#B1F1D7]"}`}
            >
              <strong>{`IN: ${commify(input_tokens)}`}</strong>
              <Divider />
              <strong>{`OUT: ${commify(output_tokens)}`}</strong>
              <Divider />
              <strong>{`$ ${total_cost}`}</strong>
            </Card>
          </div>
        )}
      </div>
      {summary.metadata.paper_link && (
        <div>
          <Link
            className={`mb-4 block hover:underline truncate ${theme === "dark" ? `text-blue-200` : "text-blue-600"}`}
            href={summary.metadata.paper_link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {summary.metadata.paper_link}
          </Link>
        </div>
      )}
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
                className={`text-md ${theme === "dark" ? "text-gray-200" : "text-slate-600"}`}
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
