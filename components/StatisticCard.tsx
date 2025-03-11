import React, { useState, useEffect } from "react";
import api from "@/utils/api";
import { Card, Chip, CardBody, Divider } from "@heroui/react";
import { useTheme } from "next-themes";
import PaperImage from "../public/Papers.png";
import MathImage from "../public/Math.png";
import ResearchImage from "../public/Research.png";
import FigureImage from "../public/Figure.png";
import FormatImage from "../public/Format.png";
import LogicalImage from "../public/Logical.png";
import MethodologyImage from "../public/Methdology.png";
import TechnicalImage from "../public/Technical.png";
import DataImage from "../public/Data.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearch } from "@/contexts/SearchContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface ErrorStatistics {
  mathErrors: number;
  methodologyErrors: number;
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

const StatisticCard = () => {
  const { sortBy, setSortBy, setKeyword } = useSearch();
  const [loading, setLoading] = useState(false);
  const [cardColors, setCardColors] = useState<
    Array<{ bg: string; outline: string }>
  >([]);
  const { theme } = useTheme();
  const [statistics, setStatistics] = useState<Statistics>({
    totalPapers: 0,
    totalAnalyses: 0,
    errorStatistics: {
      mathErrors: 0,
      methodologyErrors: 0,
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
      const response = await api.get(`/papers/statistics`);
      setStatistics(response.data);
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

  const issues = [
    {
      title: "Total",
      sort: "total_errors",
      type: "",
      img: PaperImage,
      // back: "from-[#fbed96] to-[#abecd6]",
      back: "hover:bg-[#338EF7] ",
      whiteback: "hover:bg-[#001731] ",
      counts: statistics?.errorStatistics?.totalErrors,
    },
    {
      title: "Math",
      img: MathImage,
      type: "MathError",
      sort: "math_errors",
      // back: "from-[#acb6e5] to-[#86fde8]",
      whiteback: "hover:bg-[#095028] ",
      back: "hover:bg-[#AE7EDE]",
      counts: statistics?.errorStatistics?.mathErrors,
    },
    {
      title: "Methodology",
      img: MethodologyImage,
      type: "MethodologyError",
      sort: "methodology_errors",
      // back: "from-[#5433FF] via-[#20BDFF] to-[#A5FECB]",
      whiteback: "hover:bg-[#610726] ",
      back: "hover:bg-[#45D483]",
      counts: statistics?.errorStatistics?.methodologyErrors,
    },
    {
      title: "Logical",
      img: LogicalImage,
      type: "LogicalFrameworkError",
      sort: "logical_framework_errors",
      // back: "from-[#EFEFBB] to-[#D4D3DD]",
      whiteback: "hover:bg-[#661F52] ",
      back: "hover:bg-[#F54180]",
      counts: statistics?.errorStatistics?.dataAnalysisErrors,
    },
    {
      title: "Data",
      img: DataImage,
      sort: "data_analysis_errors",
      type: "DataAnalysisError",
      // back: "from-[#FDFC47] to-[#24FE41]",
      whiteback: "hover:bg-[#001731] ",
      back: "hover:bg-[#661F52]",
      counts: statistics?.errorStatistics?.dataAnalysisErrors,
    },
    {
      title: "Technical",
      img: TechnicalImage,
      sort: "technical_presentation_errors",
      type: "TechnicalPresentationError",
      // back: "from-[#BA5370] to-[#F4E2D8]",
      whiteback: "hover:bg-[#62420E] ",
      back: "hover:bg-[#F5A524]",
      counts: statistics?.errorStatistics?.technicalPresentationErrors,
    },
    {
      title: "Research",
      img: ResearchImage,
      sort: "research_quality_errors",
      type: "ResearchQualityError",
      // back: "from-[#0099F7] to-[#F11712]",
      back: "hover:bg-[#7EE7FC]",
      whiteback: "hover:bg-[#0E8AAA]",
      counts: statistics?.errorStatistics?.researchQualityErrors,
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[50vw] md:max-w-[55vw]"
        >
          <CarouselContent>
            {issues.map((issue, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card
                  key={index + 1}
                  isHoverable
                  isPressable
                  radius="lg"
                  onPress={() => {
                    setSortBy(issue.type || "");
                    setKeyword("");
                  }}
                  className={`w-full rounded-full`}
                >
                  <CardBody
                    className={`w-full rounded-full ${theme === "dark" ? `bg-slate-700 ${issue.whiteback}` : `bg-gray-200 ${issue.back}`} ${issue.type === sortBy ? `border-2 ${theme === "dark" ? "border-[#C8E600]" : "border-[#24016A]"} rounded-full` : ``}`}
                  >
                    <div className="flex flex-row justify-center gap-3 items-center text-sm md:text-md">
                      <span className="text-lg md:text-lg font-semibold">
                        {issue.title}
                      </span>
                      <Chip size="md" variant="faded">
                        <span className="text-medium md:text-lg font-semibold">
                          {issue.counts}
                        </span>
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </React.Fragment>
  );
};

export default StatisticCard;
