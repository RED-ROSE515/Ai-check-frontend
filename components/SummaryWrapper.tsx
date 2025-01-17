import React, { useState } from "react";
import {
  Typography,
  Chip,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  capitalize,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const getColorForScore = (score) => {
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

const SummaryWrapper = ({ summary }) => {
  const summaryLevels = [
    { title: "Child Summary", content: summary.summary.child },
    { title: "College Summary", content: summary.summary.college },
    { title: "PhD Summary", content: summary.summary.phd },
  ];

  const [panel, setPanel] = useState(0);
  return (
    <div
      className="flex w-full flex-col rounded-lg p-6"
      style={{ backgroundColor: "#EEEEEEF0" }}
    >
      <Typography
        variant="h5"
        component="h2"
        className="mb-4 text-center font-bold text-slate-700"
      >
        {summary.metadata.title}
      </Typography>

      <div className="mb-4 flex flex-wrap gap-2 text-slate-700">
        <strong>Authors: </strong>
        {summary.metadata.authors.map((author: string, index: number) => (
          <Chip
            key={index}
            label={
              author.length > 75 ? author.substring(0, 70) + "..." : author
            }
            variant="outlined"
            color="primary"
          />
        ))}
      </div>

      {summary.metadata.paper_link && (
        <Link
          href={summary.metadata.paper_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 block text-blue-600 hover:underline"
        >
          View Original Paper
        </Link>
      )}

      <div className="mt-4">
        {summaryLevels.map((level, index) => (
          <Accordion
            key={index}
            defaultExpanded={index === 0}
            expanded={panel === index}
            onChange={() => setPanel(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{level.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{level.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <div className="mt-4">
        <Typography variant="h6" className="font-bold text-slate-700">
          Publication Info
        </Typography>
        <div className="flex flex-wrap gap-2">
          <Typography variant="body1" className="text-slate-600">
            <strong>Date: </strong>{" "}
            {summary.metadata.publication_info.date || "Unknown"}
          </Typography>
          <Typography variant="body1" className="text-slate-600">
            <strong>Journal: </strong>
            {summary.metadata?.publication_info?.journal || "Unknown"}
          </Typography>
          <Typography variant="body1" className="text-slate-600">
            <strong>Keywords: </strong>
            {summary.metadata.publication_info.keywords
              ? summary.metadata.publication_info.keywords.join(", ")
              : "Unknown"}
          </Typography>
        </div>
      </div>

      <div className="mt-4">
        <Typography variant="h6" className="font-bold text-slate-700">
          Technical Assessment
        </Typography>
        <div className="flex flex-wrap gap-2">
          {Object.entries(
            summary.technical_assessment
              ? summary.technical_assessment
              : summary.summary.technical_assessment
          ).map(([key, value]) => (
            <Chip
              key={key}
              label={`${capitalize(key).replace("_", " ")}: ${value}`}
              className="text-lg font-bold text-slate-400"
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
