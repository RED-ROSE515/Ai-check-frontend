"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Image as HeroImage,
  Button,
  Skeleton,
  Accordion,
  AccordionItem,
  Tooltip,
} from "@heroui/react";

import childImage from "../public/NerdBunnyUI/child.png";
import collegeImage from "../public/NerdBunnyUI/college.png";
import phDImage from "../public/NerdBunnyUI/PhD.png";
import errorImage from "../public/NerdBunnyUI/Error.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSpeech } from "@/contexts/SpeechContext";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api";
import ReactMarkdown from "react-markdown";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { ShineBorder } from "./ui/shine-border";
import { AuroraText } from "@/src/components/magicui/aurora-text";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import useGetData from "@/app/service/get-data";

export default function AudioPostDetail({}) {
  const { theme } = useTheme();
  const router = useRouter();
  const {
    isPlaying,
    speechUrl,
    currentPostId,
    listenedSpeeches,
    setSpeechList,
    setSpeechUrl,
    setSpeechType,
    setIsPlaying,
    setPercentage,
  } = useSpeech();
  const [auditDetailPending, startAuditDetailTransition] = useTransition();
  const [summaryData, setSummaryData] = useState<any>({});
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { data: postData, isLoading: postLoading } = useGetData(
    `post/${currentPostId}`
  );
  const { data: speechData, isLoading: speechLoading } = useGetData(
    `post/speech?post_id=${currentPostId}`
  );
  useEffect(() => {
    if (postData) {
      setSummaryData({ ...JSON.parse(postData.description) });
    }
  }, [postData]);

  useEffect(() => {
    if (speechData) {
      const initialSpeech = speechData[0];
      setSpeechType(initialSpeech.speech_type);
      setSpeechUrl(initialSpeech.audio_url);
      setIsPlaying(false);
      const speechTypes = [
        "ChildSummary",
        "CollegeSummary",
        "PhDSummary",
        "ErrorSummary",
      ];
      const speechList = speechTypes.map((type) => {
        return {
          speech_url: speechData?.find(
            (speech: any) => speech.speech_type === type
          )?.audio_url,
          speech_type: type,
        };
      });
      setSpeechList(speechList);
    }
  }, [speechData]);

  const summaryTypes = [
    {
      key: "child",
      title: "Child Summary",
      type: "ChildSummary",
      image: childImage,
      content: summaryData?.summary?.child,
      speech_url: speechData?.find(
        (speech: any) => speech.speech_type === "ChildSummary"
      )?.audio_url,
    },
    {
      key: "college",
      title: "College Summary",
      type: "CollegeSummary",
      image: collegeImage,
      content: summaryData?.summary?.college,
      speech_url: speechData?.find(
        (speech: any) => speech.speech_type === "CollegeSummary"
      )?.audio_url,
    },
    {
      key: "phd",
      title: "PhD Summary",
      type: "PhDSummary",
      image: phDImage,
      content: summaryData?.summary?.phd,
      speech_url: speechData?.find(
        (speech: any) => speech.speech_type === "PhDSummary"
      )?.audio_url,
    },
    {
      key: "error",
      title: "Error Summary",
      type: "ErrorSummary",
      image: errorImage,
      content: summaryData?.summary?.error,
      speech_url: speechData?.find(
        (speech: any) => speech.speech_type === "ErrorSummary"
      )?.audio_url,
    },
  ];

  return (
    <Card
      isBlurred
      className={`h-full ${theme === "dark" ? "bg-[#050506]" : "bg-[#F6F6F6]"} w-full h-full`}
      classNames={{
        base: "overflow-hidden border-none p-0",
        body: "p-1",
      }}
      shadow="lg"
    >
      <CardHeader>
        <div className="w-full flex flex-row justify-between items-center">
          <p className="text-md text-foreground/80">Post Detail</p>
          <Button
            variant="bordered"
            className="text-xs"
            size="sm"
            isLoading={auditDetailPending}
            onPress={() =>
              startAuditDetailTransition(() =>
                router.push(DOMAIN + "/results/" + currentPostId)
              )
            }
          >
            View Audit Result
          </Button>
        </div>
      </CardHeader>
      <CardBody className="h-full w-full flex flex-col justify-start items-start overflow-auto">
        {postLoading || speechLoading ? (
          <div className="w-full">
            <div className="p-4 rounded-lg border border-default-200 flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-full h-10 rounded" />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <Accordion
              className="w-full px-0 overflow-hidden"
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
              itemClasses={{ base: "px-2" }}
              variant="bordered"
            >
              {summaryTypes.map((summaryType, index) => (
                <AccordionItem
                  key={index}
                  textValue={summaryType.title}
                  startContent={
                    <Image
                      priority
                      alt="NERDBUNNY LOGO"
                      className="rounded-lg"
                      height="30"
                      src={summaryType.image}
                      width="30"
                    />
                  }
                  indicator={({ isOpen }) =>
                    isOpen ? <IoIosArrowForward /> : <IoIosArrowDown />
                  }
                  className={`w-full md:min-h-[68px] h-full items-center overflow-hidden`}
                  title={
                    <div className="flex flex-row justify-between w-full items-center">
                      {speechUrl === summaryType.speech_url ? (
                        <AnimatedGradientText
                          speed={2}
                          colorFrom="#4ade80"
                          colorTo="#06b6d4"
                          className="text-xl font-bold tracking-tight"
                        >
                          {currentPostId &&
                          listenedSpeeches.includes(
                            currentPostId + " - " + summaryType.type
                          )
                            ? summaryType.title + " (Listened)"
                            : summaryType.title}
                        </AnimatedGradientText>
                      ) : (
                        <span
                          className={`text-lg  ${currentPostId && listenedSpeeches.includes(currentPostId + " - " + summaryType.type) ? "text-gray-500" : ""}`}
                          style={{ fontWeight: "500" }}
                        >
                          {currentPostId &&
                          listenedSpeeches.includes(
                            currentPostId + " - " + summaryType.type
                          )
                            ? summaryType.title + " (Listened)"
                            : summaryType.title}
                        </span>
                      )}
                      {summaryType.speech_url && (
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
                            onPress={() => {
                              // setCurrentSummary(level);
                              // onOpen();
                              const prevSpeechUrl = speechUrl;
                              setSpeechType(summaryType.type);
                              setSpeechUrl(summaryType.speech_url);

                              if (prevSpeechUrl !== summaryType.speech_url) {
                                setPercentage(0);
                                setIsPlaying(true);
                              } else {
                                setIsPlaying(!isPlaying);
                              }
                            }}
                            className={`hover:bg-transparent hover:text-pink-600  ${currentPostId && listenedSpeeches.includes(currentPostId + " - " + summaryType.type) ? "text-gray-500" : ""}`}
                          >
                            {isPlaying &&
                            speechUrl === summaryType.speech_url ? (
                              <FaPause
                                className="w-full p-2"
                                style={{ height: "fit-content" }}
                              />
                            ) : (
                              <FaPlay
                                className="w-full p-2"
                                style={{ height: "fit-content" }}
                              />
                            )}
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  }
                  value={index.toString()}
                >
                  {summaryType.key === "error" ? (
                    <div key={index}>
                      <ReactMarkdown
                        components={{
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-6 text-lg font-bold">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="mb-2 mt-4 text-md font-semibold">
                              {children}
                            </h4>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4 text-sm">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-4 ml-6 list-disc text-sm">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="mb-2 text-sm">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-sm">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-sm">{children}</em>
                          ),
                          hr: () => <hr className="my-6 border-gray-200" />,
                        }}
                      >
                        {summaryType.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div>
                      <p
                        className={`text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
                      >
                        {summaryType.content}
                      </p>
                    </div>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
