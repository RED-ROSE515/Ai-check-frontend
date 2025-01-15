import React from "react";
import {
  Paper,
  Typography,
  Link,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SummaryWrapper = ({ summary }) => {
  const summaryLevels = [
    { title: "Simple Summary", text: summary.summary.child },
    { title: "Intermediate Summary", text: summary.summary.college },
    { title: "Technical Summary", text: summary.summary.phd },
  ];

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
        {summary.title}
      </Typography>

      <div className="mb-4 flex flex-wrap gap-2">
        {summary.authors.map((author, index) => (
          <Chip key={index} label={author} variant="outlined" color="primary" />
        ))}
      </div>

      {summary.paper_link && (
        <Link
          href={summary.paper_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 block text-blue-600 hover:underline"
        >
          View Original Paper
        </Link>
      )}

      <div className="mt-4">
        {summaryLevels.map((level, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{level.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                {level.text}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SummaryWrapper;
