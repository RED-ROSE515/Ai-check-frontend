import React, { useEffect, useState } from "react"
import { Typography, capitalize } from "@mui/material"
import ReactMarkdown from "react-markdown"
import Image, { StaticImageData } from "next/image"
import { useTheme } from "next-themes"
import { useSpeech } from "@/contexts/SpeechContext"
import { useToast } from "@/hooks/use-toast"
import api from "@/utils/api"
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
} from "@heroui/react"
import childImage from "../public/NerdBunnyUI/child.png"
import collegeImage from "../public/NerdBunnyUI/college.png"
import phDImage from "../public/NerdBunnyUI/PhD.png"
import errorImage from "../public/NerdBunnyUI/Error.png"
import { RiVoiceAiLine } from "react-icons/ri"
import useDeviceCheck from "@/hooks/useDeviceCheck"
import SpeechPlayer from "./SpeechPlayer"
import UserCard from "./UserCard"
import { useSearch } from "@/contexts/SearchContext"
import { useAuth } from "@/contexts/AuthContext"
import {
  FaClock,
  FaGlobe,
  FaLink,
  FaMinus,
  FaPlay,
  FaPlayCircle,
  FaPlus,
  FaUser,
} from "react-icons/fa"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"

import { SiSharp } from "react-icons/si"
import { useRouter } from "next/navigation"
import useGetData from "@/app/service/get-data"
import ErrorContent from "./ErrorContent"
const getColorForScore = (score: number) => {
  switch (true) {
    case score >= 9:
      return "#2E7D32" // Dark green
    case score >= 8:
      return "#4CAF50" // Green
    case score >= 7:
      return "#8BC34A" // Light green
    case score >= 6:
      return "#673AB7" // Deep purple
    case score >= 5:
      return "#9C27B0" // Purple
    case score >= 4:
      return "#FF9800" // Orange
    case score >= 3:
      return "#FF5722" // Deep orange
    case score >= 2:
      return "#F44336" // Red
    default:
      return "#D32F2F" // Dark red
  }
}

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
]

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
  )
}

export interface SummaryType {
  title: string
  content: string
  value: string
  type?: string
  audio_url?: string
  speech_url?: string
  image: StaticImageData
}
const ArticleWrapper = ({
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
  articleData,
}: any) => {
  const { theme } = useTheme()
  const router = useRouter()
  const { keyword, setKeyword, setSortBy } = useSearch()
  const [expand, setExpand] = useState(false)
  const [keywordExpand, setKeywordExpand] = useState(false)
  const [currentSummary, setCurrentSummary] = useState<SummaryType>()
  const { setSpeechUrl, setShowSpeech, setSpeechId, setSpeechTitle } =
    useSpeech()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [voice, setVoice] = useState("alloy")
  const [loading, setLoading] = useState(false)
  const { isMobile } = useDeviceCheck()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()
  const { data: speechData, isLoading: speechLoading } = useGetData(
    totalData?.id ? `post/speech?post_id=${totalData?.id}` : ""
  )
  const generateSpeech = async () => {
    try {
      setLoading(true)
      const paperId = link.split("results/discrepancies/")[1]
      const response = await api.post(`post/generate_voice`, {
        post_id: paperId,
        speech_type: currentSummary?.value,
        voice_type: voice,
      })
      setLoading(false)
      onClose()
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
      })
      setSpeechUrl(response.data.audio_url)
      setSpeechId(response.data.id)
      setSpeechTitle(summary.metadata.title)
      setShowSpeech(true)
    } catch (error) {
      toast({
        title: "Speech Generation",
        description: "Uh! Something went wrong!",
      })
    }
  }

  useEffect(() => {}, [speechData])
  return (
    <div
      className="flex w-full flex-col rounded-lg p-4 md:px-4 gap-5 overflow-hidden relative"
      style={
        theme === "dark"
          ? { backgroundColor: "#1E2A36" }
          : { backgroundColor: "#F7F7F7" }
      }
    >
      <div
        className={`summary-ribbon summary-ribbon-top-right`}
        style={
          {
            "--ribbon-border-color": "#17C964",
            "--ribbon-background": "#17C964",
          } as React.CSSProperties
        }
      >
        <span>{"Article Generation"}</span>
      </div>
      <div className="w-full flex flex-col justify-center text-center font-bold text-2xl gap-5 md:pr-16">
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
              </div>
            ) : (
              <div className="mt-2 ">
                <Chip
                  // className={`${theme === "dark" ? "secondary" : "primary"}`}
                  variant="dot"
                  startContent={
                    <span
                      className={`${theme === "dark" ? "bg-[#2E3E4E]" : "bg-[#FFF]"} ml-1 rounded-full`}
                    >
                      <FaLink color="#737E88" className="m-1" />
                    </span>
                  }
                  className={`cursor-pointer hover:scale-105 border-none bg-[#273340] ${theme === "dark" ? "hover:bg-gray-600 bg-[#273340]" : "hover:bg-gray-300 bg-[#EAEAEA]"}`}
                >
                  <span className="m-1">{`Unknown`}</span>
                </Chip>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full">
        {articleData?.conclusion && (
          <React.Fragment>
            <span
              className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
            >
              Summary:
            </span>
            <div
              className={`flex flex-wrap gap-2 mb:gap-10 mb-2 p-4 rounded-xl shadow-md ${theme === "dark" ? "bg-[rgba(39,39,42,0.96)]" : "bg-[#ece9e9]"}`}
            >
              <span>{articleData?.conclusion}</span>
            </div>
          </React.Fragment>
        )}
        {articleData?.article && (
          <React.Fragment>
            <span
              className={`text-md md:text-lg w-full md:w-auto ${theme === "dark" ? "text-[#AAB5C7]" : "text-[#828489]"}`}
            >
              Article:
            </span>
            <div
              className={`flex flex-wrap gap-2 mb:gap-10 mb-2 p-4 rounded-xl shadow-md ${theme === "dark" ? "bg-[rgba(39,39,42,0.96)]" : "bg-[#ece9e9]"}`}
            >
              <ReactMarkdown>{articleData?.article}</ReactMarkdown>
            </div>
          </React.Fragment>
        )}
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
                          setKeyword(label === keyword ? "" : label)
                          setSortBy("")
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
                      <ErrorContent content={currentSummary?.content} />
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
  )
}

export default ArticleWrapper
