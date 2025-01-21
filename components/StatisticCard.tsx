import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ErrorStatistics {
  mathErrors: number;
  methdologyErrors: number;
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

const StatisticCard = ({}) => {
  const [loading, setLoading] = useState(false);
  const [cardColors, setCardColors] = useState<
    Array<{ bg: string; outline: string }>
  >([]);
  const [statistics, setStatistics] = useState<Statistics>({
    totalPapers: 0,
    totalAnalyses: 0,
    errorStatistics: {
      mathErrors: 0,
      methdologyErrors: 0,
      logicalFrameworkErrors: 0,
      dataAnalysisErrors: 0,
      technicalPresentationErrors: 0,
      researchQualityErrors: 0,
      totalErrors: 0,
    },
  });

  const colorPairs = [
    { bg: "#DBF0C4", outline: "#B7DA8E" },
    { bg: "#96ECEC", outline: "#A0DDDB" },
    { bg: "#D9E9EE", outline: "#A1B8E0" },
    { bg: "#FFE4E1", outline: "#FFA07A" },
    { bg: "#E6E6FA", outline: "#9370DB" },
    { bg: "#F0FFF0", outline: "#98FB98" },
    { bg: "#FFF0F5", outline: "#FFB6C1" },
  ];

  const getRandomColors = () => {
    const randomIndex = Math.floor(Math.random() * colorPairs.length);
    return colorPairs[randomIndex];
  };

  useEffect(() => {
    // Generate colors for all cards after mount
    const colors = Array(7)
      .fill(null)
      .map(() => getRandomColors());
    setCardColors(colors);
  }, []);

  const getStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}api/papers/get_statistics/`
      );
      setStatistics(response.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  if (cardColors.length === 0) {
    return null; // Or a loading state
  }

  return (
    <React.Fragment>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Card
          backgroundColor={cardColors[0].bg}
          outlineColor={cardColors[0].outline}
          title="Total Papers"
          count={statistics.totalPapers}
        />
        <Card
          backgroundColor={cardColors[1].bg}
          outlineColor={cardColors[1].outline}
          title="Mathematical And Calculation  Errors"
          count={statistics.errorStatistics.mathErrors}
        />
        <Card
          backgroundColor={cardColors[2].bg}
          outlineColor={cardColors[2].outline}
          title="Methodological Errors"
          count={statistics.errorStatistics.methdologyErrors}
        />
        <Card
          backgroundColor={cardColors[3].bg}
          outlineColor={cardColors[3].outline}
          title="Logical Framework Errors"
          count={statistics.errorStatistics.logicalFrameworkErrors}
        />
        <Card
          backgroundColor={cardColors[4].bg}
          outlineColor={cardColors[4].outline}
          title="Data Analysis Errors"
          count={statistics.errorStatistics.dataAnalysisErrors}
        />
        <Card
          backgroundColor={cardColors[5].bg}
          outlineColor={cardColors[5].outline}
          title="Technical Presentation Errors"
          count={statistics.errorStatistics.technicalPresentationErrors}
        />
        <Card
          backgroundColor={cardColors[6].bg}
          outlineColor={cardColors[6].outline}
          title="Research Quality Errors"
          count={statistics.errorStatistics.researchQualityErrors}
        />
      </div>
    </React.Fragment>
  );
};

export default StatisticCard;
