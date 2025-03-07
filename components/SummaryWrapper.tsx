import React, { useState } from "react";
import { Typography, capitalize } from "@mui/material";
import ReactMarkdown from "react-markdown";
import Image, { StaticImageData } from "next/image";
import { useTheme } from "next-themes";
import { useSpeech } from "@/contexts/SpeechContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api";
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
import errorImage from "../public/NerdBunnyUI/Error.png";
import { commify } from "@/utils/number_utils";
import { RiVoiceAiLine } from "react-icons/ri";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import SpeechPlayer from "./SpeechPlayer";
import UserCard from "./UserCard";
import { useSearch } from "@/contexts/SearchContext";
import { useAuth } from "@/contexts/AuthContext";
import { FaClock, FaGlobe, FaLink, FaMinus, FaPlus } from "react-icons/fa";
import { SiSharp } from "react-icons/si";
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
  totalData,
  postDate,
  userData,
  reportPost,
  showSignInModal,
  input_tokens,
  output_tokens,
  total_cost,
  link,
}: any) => {
  const { theme } = useTheme();

  const { keyword, setKeyword, setSortBy } = useSearch();
  const [expand, setExpand] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummaryType>();
  const { setSpeechUrl, setShowSpeech, setSpeechId, setSpeechTitle } =
    useSpeech();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [voice, setVoice] = useState("alloy");
  const [loading, setLoading] = useState(false);
  const { isMobile } = useDeviceCheck();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const summaryLevels = [
    {
      title: "Child Summary",
      content: summary.summary?.child,
      value: "ChildSummary",
      audio_url: "",
      image: childImage,
    },
    {
      title: "College Summary",
      content: summary.summary?.college,
      value: "CollegeSummary",
      audio_url: "",
      image: collegeImage,
    },
    {
      title: "PhD Summary",
      content: summary.summary?.phd,
      value: "PhDSummary",
      audio_url: "",
      image: phDImage,
    },
    {
      title: "Error Summary",
      content: summary.summary?.error,
      value: "ErrorSummary",
      audio_url: "",
      image: errorImage,
    },
  ];
  const generateSpeech = async () => {
    try {
      setLoading(true);
      const paperId = link.split("results/")[1];
      const response = await api.post(`post/generate_voice`, {
        post_id: paperId,
        speech_type: currentSummary?.value,
        voice_type: voice,
      });
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
      setSpeechId(response.data.id);
      setSpeechTitle(summary.metadata.title);
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
          ? { backgroundColor: "#1E2A36" }
          : { backgroundColor: "#EEEEEEF0" }
      }
    >
      <div className="w-full flex flex-col justify-center text-center font-bold text-2xl gap-4">
        {/* <span className="text-md md:text-2xl font-bold text-center md:min-w-fit md:flex hidden">
          {`AI Error Detection Report for`}
          <Tooltip
            content={
              <div className="flex flex-col cursor-pointer" onClick={() => {}}>
                <strong className="text-md font-bold text-center">
                  This AI-generated report analyzes the paper’s structure,
                  methodology, and technical accuracy.
                  <Link className="ml-4 text-blue-700"> Learn more.</Link>
                </strong>
              </div>
            }
            placement="top"
            className="max-w-[300px] min-h-[75px]"
            closeDelay={1000}
          >
            <span className="">ℹ️</span>
          </Tooltip>
          {` : `}
        </span> */}
        {isResult ? (
          <span className="text-md md:text-3xl flex-1 items-center gap-1 px-2">
            {summary.metadata.title}
          </span>
        ) : (
          <Link href={link}>
            <span className="text-md md:text-3xl px-2">
              {summary.metadata.title}
            </span>
          </Link>
        )}
        <UserCard
          userData={userData}
          postDate={postDate}
          link={link}
          reportPost={reportPost}
          showSignInModal={showSignInModal}
          totalData={totalData}
          className="max-w-fit"
        />
        {input_tokens && output_tokens && total_cost && (
          <div className="w-full md:w-auto">
            <Card
              className={`text-sm md:text-lg w-full items-center space-x-4 p-2 md:p-4 flex flex-row justify-center  ${theme === "dark" ? "bg-[#242F3C]" : "bg-gray-200"}`}
            >
              <p>{`IN: ${commify(input_tokens)}`}</p>
              <p>|</p>
              <p>{`OUT: ${commify(output_tokens)}`}</p>
              <p>|</p>
              <p>{`$ ${total_cost}`}</p>
            </Card>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
        <div className="flex flex-row justify-center items-center gap-10 w-full">
          <div className={`my-4 w-1/2`}>
            <span
              className={`font-bold text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-slate-700"}`}
            >
              Authors:
            </span>
            <div className="flex flex-wrap gap-2">
              {summary.metadata.authors?.map(
                (author: string, index: number) =>
                  (index < 3 || expand) && (
                    <Tooltip
                      key={index}
                      content={"(" + author.split("(")[1]}
                      placement="bottom"
                      className="max-w-[50vw]"
                    >
                      <Chip
                        // className={`${theme === "dark" ? "secondary" : "primary"}`}
                        variant="dot"
                        className={`cursor-pointer hover:scale-105 ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
                      >
                        {author.split("(")[0]}
                      </Chip>
                    </Tooltip>
                  ),
              )}
              {summary.metadata.authors?.length > 3 && (
                <Button
                  size="sm"
                  variant="ghost"
                  endContent={expand ? <FaMinus /> : <FaPlus />}
                  onPress={() => setExpand(!expand)}
                  className={`w-full h-auto md:w-auto ${theme === "dark" ? "bg-slate-700 text-white" : "bg-gray-300 text-black"}`}
                >
                  {`${expand ? "Show Less " : "Load More "}`}
                </Button>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <span
              className={`font-bold text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-slate-700"}`}
            >
              Paper Link :
            </span>
            {summary.metadata.paper_link ? (
              <div>
                <Link
                  className={`mb-4 block hover:underline truncate w-fit ${theme === "dark" ? `text-blue-200` : "text-blue-600"}`}
                  href={summary.metadata.paper_link}
                  style={{ maxWidth: "-webkit-fill-available" }}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Chip
                    startContent={<FaLink className="ml-2" />}
                    variant="dot"
                  >
                    {summary.metadata.paper_link}
                  </Chip>
                </Link>
              </div>
            ) : (
              <Link
                href="#"
                className={`mb-4 block hover:underline truncate w-fit ${theme === "dark" ? `text-blue-200` : "text-blue-600"}`}
              >
                <Chip startContent={<FaLink className="ml-2" />} variant="dot">
                  Unknown
                </Chip>
              </Link>
            )}
          </div>
        </div>
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
                    <Tooltip
                      content={
                        <strong className="text-md font-bold text-center">
                          Voice Generator
                        </strong>
                      }
                      placement="top"
                      closeDelay={1000}
                    >
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
                    </Tooltip>
                  )}
                </div>
              }
              value={index.toString()}
            >
              {level.value === "ErrorSummary" ? (
                <div key={index}>
                  <ReactMarkdown
                    components={{
                      h3: ({ children }) => (
                        <h3 className="mb-2 mt-6 text-xl font-bold">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="mb-2 mt-4 text-lg font-semibold">
                          {children}
                        </h4>
                      ),
                      p: ({ children }) => <p className="mb-4">{children}</p>,
                      ul: ({ children }) => (
                        <ul className="mb-4 ml-6 list-disc">{children}</ul>
                      ),
                      li: ({ children }) => (
                        <li className="mb-2">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold">{children}</strong>
                      ),
                      em: ({ children }) => (
                        <em className="italic">{children}</em>
                      ),
                      hr: () => <hr className="my-6 border-gray-200" />,
                    }}
                  >
                    {level.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div>
                  <p
                    className={`text-md font-semibold ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
                  >
                    {level.content}
                  </p>
                </div>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-4">
        <span
          className={`font-bold text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-slate-700"}`}
        >
          Information:
        </span>
        <div className="flex flex-wrap gap-10 mb-2">
          <Typography
            className={`flex flex-row justify-center items-center gap-1 ${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
            variant="body1"
          >
            <span
              className={`${theme === "dark" ? "text-[#495D72]" : "text-slate-700"} mr-1`}
            >
              <FaClock />
            </span>
            <span>Date: </span>
            {summary.metadata.publication_info.date || "Unknown"}
          </Typography>
          <Typography
            className={`flex flex-row justify-center items-center ml-8 gap-1 ${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
            variant="body1"
          >
            <span
              className={`${theme === "dark" ? "text-[#495D72]" : "text-slate-700"} mr-1`}
            >
              <FaGlobe />
            </span>
            <strong>Source: </strong>
            {summary.metadata?.publication_info?.journal || "Unknown"}
          </Typography>
        </div>
        <div
          className={`w-full ${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
        >
          <div className="flex flex-col justify-start gap-2">
            <span
              className={`font-bold text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-slate-700"}`}
            >
              Keywords:
            </span>
            <div className="flex flex-wrap justify-start gap-2">
              {summary.metadata.publication_info.keywords
                ? summary.metadata.publication_info.keywords.map(
                    (label: string, index: number) => {
                      return (
                        <Chip
                          variant="dot"
                          key={index}
                          onClick={() => {
                            setKeyword(label === keyword ? "" : label);
                            setSortBy("");
                          }}
                          startContent={<SiSharp className="ml-1" />}
                          className={`cursor-pointer hover:scale-105 ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-300"} ${label === keyword ? `${theme === "dark" ? "bg-[#C8E600] text-black" : "bg-[#EE43DE] text-white"}` : ""}`}
                        >
                          {label}
                        </Chip>
                      );
                    },
                  )
                : "Unknown"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`font-bold text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-slate-700"}`}
        >
          Technical Assessment:
        </span>
        <div className="flex flex-wrap gap-2">
          {Object.entries(
            summary.technical_assessment
              ? summary.technical_assessment
              : summary.summary.technical_assessment,
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
                      isSpeech={false}
                      audio_url={`https://cdn.openai.com/API/docs/audio/${voice}.wav`}
                    />
                  </div>
                  <div className="mt-4">
                    {currentSummary?.value === "ErrorSummary" ? (
                      <ReactMarkdown
                        components={{
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-6 text-xl font-bold">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="mb-2 mt-4 text-lg font-semibold">
                              {children}
                            </h4>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-4 ml-6 list-disc">{children}</ul>
                          ),
                          li: ({ children }) => (
                            <li className="mb-2">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold">{children}</strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),
                          hr: () => <hr className="my-6 border-gray-200" />,
                        }}
                      >
                        {currentSummary?.content}
                      </ReactMarkdown>
                    ) : (
                      <span>{currentSummary?.content}</span>
                    )}
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    isAuthenticated
                      ? generateSpeech()
                      : showSignInModal("You need to sign in to continue.")
                  }
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
