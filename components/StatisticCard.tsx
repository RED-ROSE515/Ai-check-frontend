import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";
import PaperImage from "../public/Papers.png";
import MathImage from "../public/Math.png";
import ResearchImage from "../public/Research.png";
import FigureImage from "../public/Figure.png";
import FormatImage from "../public/Format.png";
import LogicalImage from "../public/Logical.png";
import MethodologyImage from "../public/Methdology.png";
import TechnicalImage from "../public/Technical.png";
import DataImage from "../public/Data.png";
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

  const list = [
    {
      title: "Total Papers",
      img: PaperImage,
      counts: statistics.totalPapers,
    },
    {
      title: "Mathematical And Calculation  Errors",
      img: MathImage,
      counts: statistics.errorStatistics.mathErrors,
    },
    {
      title: "Methodological Errors",
      img: MethodologyImage,
      counts: statistics.errorStatistics.methdologyErrors,
    },
    {
      title: "Logical Framework Errors",
      img: LogicalImage,
      counts: statistics.errorStatistics.dataAnalysisErrors,
    },
    {
      title: "Data Analysis Errors",
      img: DataImage,
      counts: statistics.errorStatistics.dataAnalysisErrors,
    },
    {
      title: "Technical Presentation Errors",
      img: TechnicalImage,
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
    {
      title: "Research Quality Errors",
      img: ResearchImage,
      counts: statistics.errorStatistics.researchQualityErrors,
    },
    {
      title: "Figure Errors",
      img: FigureImage,
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
    {
      title: "Writing Errors",
      img: FormatImage,
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
  ];

  return (
    <React.Fragment>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4">
        {list.map((item, index) => (
          <Card isPressable shadow="sm" key={index}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt={"Total Papers"}
                className="w-full object-cover h-[140px] shadow-sm"
                width={500}
                height={500}
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.counts}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );
};

export default StatisticCard;
