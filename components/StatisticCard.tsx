import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { Marquee } from "./ui/marquee";
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

const StatisticCard = ({ setSortBy, setOrder }: any) => {
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
      sort: "total_errors",
      img: PaperImage,
      // back: "from-[#fbed96] to-[#abecd6]",
      back: "bg-[#fbed96] ",
      counts: statistics.totalPapers,
    },
    {
      title: "Mathematical  Errors",
      img: MathImage,
      sort: "math_errors",
      // back: "from-[#acb6e5] to-[#86fde8]",
      back: "bg-[#FFD2A6]",
      counts: statistics.errorStatistics.mathErrors,
    },
    {
      title: "Methodological Errors",
      img: MethodologyImage,
      sort: "methodology_errors",
      // back: "from-[#5433FF] via-[#20BDFF] to-[#A5FECB]",
      back: "bg-[#FFEAB0]",
      counts: statistics.errorStatistics.methdologyErrors,
    },
    {
      title: "Logical Framework Errors",
      img: LogicalImage,
      sort: "logical_framework_errors",
      // back: "from-[#EFEFBB] to-[#D4D3DD]",
      back: "bg-[#ABCAED]",
      counts: statistics.errorStatistics.dataAnalysisErrors,
    },
    {
      title: "Data Analysis Errors",
      img: DataImage,
      sort: "data_analysis_errors",
      // back: "from-[#FDFC47] to-[#24FE41]",
      back: "bg-[#B1F1D7]",
      counts: statistics.errorStatistics.dataAnalysisErrors,
    },
    {
      title: "Technical Presentation Errors",
      img: TechnicalImage,
      sort: "technical_presentation_errors",
      // back: "from-[#BA5370] to-[#F4E2D8]",
      back: "bg-[#BA5370]",
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
    {
      title: "Research Quality Errors",
      img: ResearchImage,
      sort: "research_quality_errors",
      // back: "from-[#0099F7] to-[#F11712]",
      back: "bg-[#F4E2D8]",
      counts: statistics.errorStatistics.researchQualityErrors,
    },
    {
      title: "Figure Errors",
      img: FigureImage,
      sort: "technical_presentation_errors",
      // back: "from-[#70e1f5] to-[#ffd194]",
      back: "bg-[#20BDFF]",
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
    {
      title: "Writing Errors",
      img: FormatImage,
      sort: "research_quality_errors",
      // back: "from-[#FFB457] to-[#FF705B]",
      back: "bg-[#A5FECB]",
      counts: statistics.errorStatistics.technicalPresentationErrors,
    },
  ];

  return (
    <React.Fragment>
      <div className="mb-8 sm:grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4 hidden">
        {list.map((item, index) => (
          <Card
            isPressable
            isHoverable
            isBlurred
            shadow="md"
            key={index}
            onPress={() => setSortBy(item.sort)}
          >
            <CardBody
              className={`overflow-visible bg-gradient-to-tr w-full h-[140px] flex justify-start items-end p-4 ${item.back}`}
            >
              <b className="text-6xl text-slate-900 font-bold">{item.counts}</b>
            </CardBody>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 text-slate-800">
              <strong className="font-bold text-md">{item.title}</strong>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Marquee pauseOnHover className="[--duration:30s] sm:hidden">
        {list.map((item, index) => (
          <Card
            isPressable
            isHoverable
            isBlurred
            className="min-w-[225px]"
            shadow="md"
            key={index}
            onPress={() => setSortBy(item.sort)}
          >
            <CardBody
              className={`overflow-visible bg-gradient-to-tr w-full h-[140px] flex justify-start items-end p-4 ${item.back}`}
            >
              <b className="text-6xl text-slate-900 font-bold">{item.counts}</b>
            </CardBody>
            <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 text-slate-800">
              <strong className="font-bold text-md">{item.title}</strong>
            </CardFooter>
          </Card>
        ))}
      </Marquee>
    </React.Fragment>
  );
};

export default StatisticCard;
