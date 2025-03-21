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
import {
  FaClock,
  FaGlobe,
  FaLink,
  FaMinus,
  FaPlus,
  FaUser,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import { SiSharp } from "react-icons/si";
import { useRouter } from "next/navigation";
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

export const UserSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M7.99984 1.33331C6.34298 1.33331 4.99984 2.67646 4.99984 4.33331C4.99984 5.99017 6.34298 7.33331 7.99984 7.33331C9.65669 7.33331 10.9998 5.99017 10.9998 4.33331C10.9998 2.67646 9.65669 1.33331 7.99984 1.33331Z"
        fill="#737E88"
      />
      <path
        d="M8.00034 7.99998C4.82849 7.99998 2.61144 10.3474 2.3366 13.2709L2.26807 14H13.7326L13.6641 13.2709C13.3892 10.3474 11.1722 7.99998 8.00034 7.99998Z"
        fill="#737E88"
      />
    </svg>
  );
};

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
  const router = useRouter();
  const { keyword, setKeyword, setSortBy } = useSearch();
  const [expand, setExpand] = useState(false);
  const [keywordExpand, setKeywordExpand] = useState(false);
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
      className="flex w-full flex-col rounded-lg p-4 md:px-4 gap-5"
      style={
        theme === "dark"
          ? { backgroundColor: "#1E2A36" }
          : { backgroundColor: "#F7F7F7" }
      }
    >
      <div className="w-full flex flex-col justify-center text-center font-bold text-2xl gap-5">
        {isResult ? (
          <span className="text-md md:text-2xl flex-1 items-center px-2">
            {summary.metadata.title}
          </span>
        ) : (
          <Link href={link}>
            <span className="text-md md:text-2xl px-2">
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
          input_tokens={input_tokens}
          output_tokens={output_tokens}
          totalData={totalData}
          className="max-w-fit"
        />
        <Divider
          className={`${theme === "dark" ? "bg-[#2E3E4E]" : "bg-[#E2E2E2]"}`}
        />
        {/* {input_tokens && output_tokens && total_cost && (
          <div className="flex flex-row justify-center">
            <div className="w-full md:w-fit">
              <Card
                className={`text-sm md:text-md w-full items-center space-x-4 p-2 md:p-4 flex flex-row justify-center  ${theme === "dark" ? "bg-[#242F3C]" : "bg-gray-200"}`}
              >
                <p>{`IN: ${commify(input_tokens)}`}</p>
                <p>|</p>
                <p>{`OUT: ${commify(output_tokens)}`}</p>
              </Card>
            </div>
          </div>
        )} */}
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row justify-center items-start gap-10 w-full">
          <div className="w-full md:w-2/3">
            <span
              className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
            >
              Authors:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
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
                        startContent={
                          <span
                            className={`${theme === "dark" ? "bg-[#2E3E4E]" : "bg-[#FFF]"} ml-1 rounded-full`}
                          >
                            <FaUser color="#737E88" className="m-1" />
                          </span>
                        }
                        className={`cursor-pointer hover:scale-105 border-none ${theme === "dark" ? "hover:bg-gray-600 bg-[#273340]" : "hover:bg-gray-300 bg-[#EAEAEA]"}`}
                      >
                        <span className="m-1">{author.split("(")[0]}</span>
                      </Chip>
                    </Tooltip>
                  )
              )}
              {summary.metadata.authors?.length > 3 && (
                <Chip
                  variant="bordered"
                  endContent={
                    expand ? (
                      <FaMinus className="mx-1" />
                    ) : (
                      <FaPlus className="mx-1" />
                    )
                  }
                  onClick={() => setExpand(!expand)}
                  className={`cursor-pointer hover:scale-105 border-none  ${theme === "dark" ? "hover:bg-gray-600 bg-[#273340] text-[#8696AF]" : "hover:bg-gray-300 bg-[#EAEAEA] text-[#828489]"}`}
                >
                  {`${expand ? "Show Less " : "Load More "}`}
                </Chip>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <span
              className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
            >
              Paper Link :
            </span>
            {summary.metadata.paper_link ? (
              <div className="mt-2">
                <Tooltip content={summary.metadata.paper_link}>
                  <Chip
                    variant="dot"
                    onClick={() => router.push(summary.metadata.paper_link)}
                    startContent={
                      <span
                        className={`${theme === "dark" ? "bg-[#2E3E4E]" : "bg-[#FFF]"} ml-1 rounded-full`}
                      >
                        <FaLink color="#737E88" className="m-1" />
                      </span>
                    }
                    className={`cursor-pointer min-w-[100px] max-w-full truncate hover:scale-105 border-none bg-[#273340] ${theme === "dark" ? "hover:bg-gray-600 bg-[#273340]" : "hover:bg-gray-300 bg-[#EAEAEA]"}`}
                  >
                    <span className="m-1 truncate w-full">
                      {summary.metadata.paper_link}
                    </span>
                  </Chip>
                </Tooltip>
                {/* </Link> */}
              </div>
            ) : (
              <div className="mt-2 ">
                <Chip
                  // className={`${theme === "dark" ? "secondary" : "primary"}`}
                  variant="dot"
                  startContent={
                    <span className="bg-[#2E3E4E] ml-1 rounded-full">
                      <FaLink color="#737E88" className="m-1" />
                    </span>
                  }
                  className={`cursor-pointer hover:scale-105 border-none bg-[#273340] ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-300"}`}
                >
                  <span className="m-1">{`Unknown`}</span>
                </Chip>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Accordion
          className="w-full px-0"
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
          // itemClasses={{ base: "px-0" }}
          variant="splitted"
        >
          {summaryLevels.map((level, index) => (
            <AccordionItem
              key={index}
              textValue={level.title}
              startContent={
                <Image
                  priority
                  alt="NERDBUNNY LOGO"
                  className="rounded-lg"
                  height="30"
                  src={level.image}
                  width="30"
                />
              }
              indicator={({ isOpen }) =>
                isOpen ? <IoIosArrowForward /> : <IoIosArrowDown />
              }
              className={`w-full ${theme === "dark" ? "bg-[#2E3E4E]" : "bg-[#FFF]"} md:min-h-[68px] items-center`}
              title={
                <div className="flex flex-row justify-between w-full items-center">
                  <span className="text-lg" style={{ fontWeight: "500" }}>
                    {level.title}
                  </span>
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
                        variant="bordered"
                        onPress={async (e) => {
                          setCurrentSummary(level);
                          onOpen();
                        }}
                        className={`hover:bg-transparent border-1 border-[#DEE5EB] w-[38px] h-[30px] hover:text-pink-600  ${index === 0 && "bg-[#EE43DE] border-none"}`}
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

      <div>
        <span
          className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
        >
          Publication Info:
        </span>
        <div className="flex flex-wrap gap-2 mb:gap-10 mb-2">
          <Typography
            className={`flex flex-row justify-center items-center gap-1 ${theme === "dark" ? `text-gray-100` : "text-[#252629]"}`}
            variant="body1"
          >
            <span
              className={`${theme === "dark" ? "text-[#495D72]" : "text-[#828489]"} mr-1`}
            >
              <FaClock />
            </span>
            <span>Date: </span>
            {summary.metadata.publication_info.date || "Unknown"}
          </Typography>
          <Typography
            className={`flex flex-row justify-center items-start mb:items-center ml-8 gap-1 ${theme === "dark" ? `text-gray-100` : "text-[#252629]"}`}
            variant="body1"
          >
            <span className="flex flex-row justify-center items-center">
              <span
                className={`${theme === "dark" ? "text-[#495D72]" : "text-[#828489]"} mr-1`}
              >
                <FaGlobe />
              </span>
              <span>Source: </span>
            </span>
            <span>
              {summary.metadata?.publication_info?.journal || "Unknown"}
            </span>
          </Typography>
        </div>
      </div>

      <div
        className={`w-full ${theme === "dark" ? `text-gray-100` : "text-slate-600"}`}
      >
        <div className="flex flex-col justify-start gap-2">
          <span
            className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
          >
            Keywords:
          </span>
          <div className="flex flex-wrap justify-start gap-2">
            {summary.metadata.publication_info.keywords
              ? summary.metadata.publication_info.keywords.map(
                  (label: string, index: number) =>
                    (index < 2 || keywordExpand) && (
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
                    )
                )
              : "Unknown"}
            {summary.metadata.publication_info.keywords?.length > 3 && (
              <Chip
                variant="bordered"
                endContent={
                  keywordExpand ? (
                    <FaMinus className="mx-1" />
                  ) : (
                    <FaPlus className="mx-1" />
                  )
                }
                onClick={() => setKeywordExpand(!keywordExpand)}
                className={`cursor-pointer hover:scale-105 border-none  ${theme === "dark" ? "hover:bg-gray-600 bg-[#273340] text-[#8696AF]" : "hover:bg-gray-300 bg-[#EAEAEA] text-[#828489]"}`}
              >
                {`${keywordExpand ? "Show Less " : "Load More "}`}
              </Chip>
            )}
          </div>
        </div>
      </div>

      <div>
        <span
          className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
        >
          Technical Assessment:
        </span>
        <div className="flex flex-wrap gap-2 mt-2">
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
