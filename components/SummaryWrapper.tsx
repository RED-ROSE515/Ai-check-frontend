import React, { useState } from "react";
import { Typography, capitalize } from "@mui/material";

import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import { useSpeech } from "@/contexts/SpeechContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  Chip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Accordion,
  AccordionItem,
  Card,
  Button,
  Divider,
  Link,
  Select,
  SelectItem,
  Tooltip,
} from "@heroui/react";
import childImage from "../public/NerdBunnyUI/child.png";
import collegeImage from "../public/NerdBunnyUI/college.png";
import phDImage from "../public/NerdBunnyUI/PhD.png";
import { commify } from "@/utils/number_utils";
import { RiVoiceAiLine } from "react-icons/ri";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import SpeechPlayer from "./SpeechPlayer";
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

export const voices = [
  { key: "alloy", label: "Alloy" },
  { key: "ash", label: "Ash" },
  { key: "coral", label: "Coral" },
  { key: "echo", label: "Echo" },
  { key: "fable", label: "Fable" },
  { key: "onyx", label: "Onyx" },
  { key: "nova", label: "Nova" },
  { key: "sage", label: "Sage" },
  { key: "shimmer", label: "Shimmer" },
];

interface SummaryType {
  title: string;
  content: string;
  value: string;
  audio_url: string;
  image: StaticImageData;
}
const SummaryWrapper = ({
  summary,
  isResult,
  input_tokens,
  output_tokens,
  total_cost,
  link,
}: any) => {
  const { theme } = useTheme();
  const [expand, setExpand] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummaryType>();
  const { setSpeechUrl, setShowSpeech } = useSpeech();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [voice, setVoice] = useState("alloy");
  const [loading, setLoading] = useState(false);
  const { isMobile } = useDeviceCheck();
  const { toast } = useToast();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const summaryLevels = [
    {
      title: "Child Summary",
      content: summary.summary.child,
      value: "child_summary",
      audio_url: "",
      image: childImage,
    },
    {
      title: "College Summary",
      content: summary.summary.college,
      value: "college_summary",
      audio_url: "",
      image: collegeImage,
    },
    {
      title: "PhD Summary",
      content: summary.summary.phd,
      value: "phd_summary",
      audio_url: "",
      image: phDImage,
    },
  ];

  const generateSpeech = async () => {
    try {
      setLoading(true);
      const paperId = link.split("_")[1].split("/")[0];
      const response = await axios.get(
        API_BASE_URL +
          `api/papers/${paperId}/generate_speech/?voice_type=${voice}&speech_type=${currentSummary?.value}&text=${currentSummary?.content}`
      );
      setLoading(false);
      onClose();
      toast({
        title: "Speech Generation",
        description: (
          <div className="flex flex-col">
            <span>Speech generated successfully! </span>
            <span className="text-md font-bold text-pink-500">
              Cost : ${response.data.cost.toFixed(6)}
            </span>
          </div>
        ),
      });
      setSpeechUrl(response.data.audio_url);
      setShowSpeech(true);
    } catch (error) {
      toast({
        title: "Speech Generation",
        description: "Uh! Something went wrong!",
      });
    }
  };

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
        <span className="w-full mb-4 text-center font-bold text-2xl">
          {isResult ? (
            <span className="text-md md:text-2xl font-bold text-center">
              {`AI Error Detection Report for : `}
              <span className="text-md md:text-3xl italic">
                {summary.metadata.title}
              </span>
              <Tooltip
                content={
                  <div
                    className="flex flex-col cursor-pointer"
                    onClick={() => {}}
                  >
                    <strong className="text-md font-bold text-center">
                      This AI-generated report analyzes the paper’s structure,
                      methodology, and technical accuracy. Click to learn more.
                    </strong>
                  </div>
                }
                placement="bottom"
                className="max-w-[300px] min-h-[75px]"
                closeDelay={1000}
              >
                <span className="ml-4"> ℹ️</span>
              </Tooltip>
            </span>
          ) : (
            <Link href={link}>{summary.metadata.title}</Link>
          )}
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
            {summary.metadata.authors?.map(
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
            {summary.metadata.authors?.length > 3 && (
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
          {summary.metadata.paper_link ? (
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
          ) : (
            <Link
              href="#"
              className={`mb-4 block hover:underline truncate w-fit ${theme === "dark" ? `text-blue-200` : "text-blue-600"}`}
            >
              Unknown
            </Link>
          )}
        </div>

        {input_tokens && output_tokens && total_cost && (
          <div className="w-full md:w-auto">
            <Card
              className={`min-w-[120px] md:min-w-[135px] p-2 md:p-4 flex flex-col justify-start items-start ${theme === "dark" ? "bg-[#242F3C]" : "bg-gray-200"}`}
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
              className="w-full"
              title={
                <div className="flex flex-row justify-between w-full items-center">
                  <strong className="text-lg">{level.title}</strong>
                  {link && (
                    <Button
                      isIconOnly
                      onPress={async (e) => {
                        setCurrentSummary(level);
                        onOpen();
                      }}
                      className="hover:bg-transparent hover:border-2 hover:text-pink-600"
                    >
                      {/* <FaPlay /> */}
                      <RiVoiceAiLine
                        className="w-full p-2"
                        style={{ height: "fit-content" }}
                      />
                    </Button>
                  )}
                </div>
              }
              value={index.toString()}
            >
              <div>
                <p
                  className={`text-md font-semibold ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
                >
                  {level.content}
                </p>
              </div>
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

      <Drawer
        backdrop={isMobile ? "transparent" : "blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-4xl">
                Voice Generation
              </DrawerHeader>
              <DrawerBody>
                <div className="flex flex-col gap-4 mt-8">
                  <Select
                    isRequired
                    className="max-w-sm"
                    defaultSelectedKeys={["alloy"]}
                    label="Favorite Voice"
                    placeholder="Select a voice you want"
                  >
                    {voices.map((voice) => (
                      <SelectItem
                        onPress={() => setVoice(voice.key)}
                        key={voice.key}
                      >
                        {voice.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="mt-4">
                    <SpeechPlayer
                      audio_url={`https://cdn.openai.com/API/docs/audio/${voice}.wav`}
                    />
                  </div>
                  <div className="mt-4">
                    <span>{currentSummary?.content}</span>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={generateSpeech}
                  isLoading={loading}
                >
                  Generate
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SummaryWrapper;
