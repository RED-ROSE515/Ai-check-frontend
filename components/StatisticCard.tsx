import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Chip,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@heroui/react";
import { Marquee } from "./ui/marquee";
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

const StatisticCard = ({ setSortBy, setOrder }: any) => {
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
    // getStatistics();
  }, []);

  if (cardColors.length === 0) {
    return null; // Or a loading state
  }

  const list = [
    {
      title: "Total Papers",
      sort: "total_errors",
      img: PaperImage,
      // back: "from-[#fbed96] to-[#abecd6]",
      back: "hover:bg-[#338EF7] ",
      whiteback: "hover:bg-[#001731] ",
      counts: statistics.totalPapers,
    },
    {
      title: "Mathematical  Errors",
      img: MathImage,
      sort: "math_errors",
      // back: "from-[#acb6e5] to-[#86fde8]",
      whiteback: "hover:bg-[#095028] ",
      back: "hover:bg-[#AE7EDE]",
      counts: statistics.errorStatistics.mathErrors,
    },
    {
      title: "Methodological Errors",
      img: MethodologyImage,
      sort: "methodology_errors",
      // back: "from-[#5433FF] via-[#20BDFF] to-[#A5FECB]",
      whiteback: "hover:bg-[#610726] ",
      back: "hover:bg-[#45D483]",
      counts: statistics.errorStatistics.methdologyErrors,
    },
    {
      title: "Logical Framework Errors",
      img: LogicalImage,
      sort: "logical_framework_errors",
      // back: "from-[#EFEFBB] to-[#D4D3DD]",
      whiteback: "hover:bg-[#661F52] ",
      back: "hover:bg-[#F54180]",
      counts: statistics.errorStatistics.dataAnalysisErrors,
    },
    {
      title: "Data Analysis Errors",
      img: DataImage,
      sort: "data_analysis_errors",
      // back: "from-[#FDFC47] to-[#24FE41]",
      whiteback: "hover:bg-[#001731] ",
      back: "hover:bg-[#661F52]",
      counts: statistics.errorStatistics.dataAnalysisErrors,
    },
    {
      title: "Technical Presentation Errors",
      img: TechnicalImage,
      sort: "technical_presentation_errors",
      // back: "from-[#BA5370] to-[#F4E2D8]",
      whiteback: "hover:bg-[#62420E] ",
      back: "hover:bg-[#F5A524]",
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
    {
      title: "Research Quality Errors",
      img: ResearchImage,
      sort: "research_quality_errors",
      // back: "from-[#0099F7] to-[#F11712]",
      back: "hover:bg-[#7EE7FC]",
      whiteback: "hover:bg-[#0E8AAA]",
      counts: statistics.errorStatistics.researchQualityErrors,
    },
    {
      title: "Figure Errors",
      img: FigureImage,
      sort: "technical_presentation_errors",
      // back: "from-[#70e1f5] to-[#ffd194]",
      whiteback: "hover:bg-[#095028] ",
      back: "hover:bg-[#20BDFF]",
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
    {
      title: "Writing Errors",
      img: FormatImage,
      sort: "research_quality_errors",
      // back: "from-[#FFB457] to-[#FF705B]",
      whiteback: "hover:bg-[#001731] ",
      back: "hover:bg-[#A5FECB]",
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
  ];

  const issues = [
    {
      label: "Total",
      value: "3318",
      back: "hover:bg-[#338EF7] ",
      whiteback: "hover:bg-[#001731] ",
    },
    {
      label: "Math",
      value: "384",
      whiteback: "hover:bg-[#095028] ",
      back: "hover:bg-[#AE7EDE]",
    },
    {
      label: "Methodology",
      value: "371",
      whiteback: "hover:bg-[#610726] ",
      back: "hover:bg-[#45D483]",
    },
    {
      label: "Logical ",
      value: "344",
      whiteback: "hover:bg-[#661F52] ",
      back: "hover:bg-[#F54180]",
    },
    {
      label: "Data ",
      value: "256",
      whiteback: "hover:bg-[#001731] ",
      back: "hover:bg-[#661F52]",
    },
    {
      label: "Technical ",
      value: "1571",
      whiteback: "hover:bg-[#62420E] ",
      back: "hover:bg-[#F5A524]",
    },
    {
      label: "Research ",
      value: "392",
      back: "hover:bg-[#7EE7FC]",
      whiteback: "hover:bg-[#0E8AAA]",
    },
  ];

  return (
    <React.Fragment>
      <div className="flex flex-col justify-center items-center">
        <span className="sm:font-semibold text-md sm:text-xl text-center mb-2">
          An AI agent for DeSci that detects errors in research papers, makes
          complex studies <br className="hidden lg:block" /> easier to
          understand, and brings a fun meme culture to science. 🧬🐇
        </span>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-[70vw]"
        >
          <CarouselContent>
            {issues.map((issue, index) => (
              <CarouselItem key={index} className=" md:basis-1/4 lg:basis-1/5">
                <Card
                  key={index + 1}
                  isHoverable
                  isPressable
                  className={`w-full`}
                >
                  <CardBody
                    className={`w-full ${theme === "dark" ? `bg-slate-700 ${issue.whiteback}` : `bg-gray-200 ${issue.back}`} `}
                  >
                    <div className="flex flex-row justify-between items-center font-bold text-md space-x-2">
                      <span>{issue.label}</span>
                      <Chip size="sm" variant="faded">
                        {issue.value}
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
