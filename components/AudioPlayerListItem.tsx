"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, Button, CardHeader, Skeleton } from "@heroui/react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import api from "@/utils/api";
import UserCard from "./UserCard";
import childImage from "../public/NerdBunnyUI/child.png";
import collegeImage from "../public/NerdBunnyUI/college.png";
import phDImage from "../public/NerdBunnyUI/PhD.png";
import errorImage from "../public/NerdBunnyUI/Error.png";
import { usePathname, useRouter } from "next/navigation";
import { TextAnimate } from "./ui/text-animate";
import { PlayCircleIcon } from "./AudioPlayer";
import { ShineBorder } from "./ui/shine-border";
import { useSpeech } from "@/contexts/SpeechContext";

export default function AudioPlayerListItem({
  id,
  speech_type,
  speech_id,
}: any) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const { theme } = useTheme();
  const pathName = usePathname();
  const [result, setResult] = useState<any>();
  const [summary, setSummary] = useState<any>();
  const [author, setAuthor] = useState<any>();
  const { setCurrentPostId, setCurrentSummaryType } = useSpeech();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const [summaryLevel, setSummaryLevel] = useState<any>();
  const [isAuditPending, startAuditTransition] = useTransition();
  const [isSpeechPending, startSpeechTransition] = useTransition();
  const router = useRouter();

  const getResultById = useMemo(
    () => async (paperId: number, speech_type: string) => {
      try {
        const response = await api.get(`/post/${paperId}`);
        setAuthor(response.data.user);
        setResult(response.data);
        const summaryData = {
          ...JSON.parse(response.data.description),
          post_id: response.data.id,
          post_title: response.data.title,
          attached_links: response.data.attached_links,
        };
        setTitle(response.data.title);
        setSummary(summaryData);
        setPostDate(response.data.updated_at);
        switch (speech_type) {
          case "ChildSummary":
            setSummaryLevel({
              title: "Child Summary",
              content: summaryData?.summary?.child,
              value: "ChildSummary",
              audio_url: "",
              image: childImage,
            });
            break;
          case "CollegeSummary":
            setSummaryLevel({
              title: "College Summary",
              content: summaryData?.summary?.college,
              value: "CollegeSummary",
              audio_url: "",
              image: collegeImage,
            });
            break;
          case "PhDSummary":
            setSummaryLevel({
              title: "PhD Summary",
              content: summaryData?.summary?.phd,
              value: "PhDSummary",
              audio_url: "",
              image: phDImage,
            });
            break;
          case "ErrorSummary":
            setSummaryLevel({
              title: "Error Summary",
              content: summaryData?.summary?.error,
              value: "ErrorSummary",
              audio_url: "",
              image: errorImage,
            });
            break;
        }
        return { data: "KKK", title: id, description: "Description" };
      } catch (error: any) {
        return null;
      }
    },
    [id] // Add id as dependency since it's used in the return value
  );

  useEffect(() => {
    getResultById(id, speech_type);
  }, [getResultById, id, speech_type]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-start md:justify-center h-full">
      <div className="w-full h-full">
        {postDate ? (
          <Card
            isBlurred
            isPressable
            onPress={() => setCurrentPostId(summary?.post_id)}
            className={`${show ? "h-full" : "h-[115px]"} ${theme === "dark" ? "bg-[#050506] border-1 border-slate-700" : "bg-[#F6F6F6]"} w-full`}
            shadow="lg"
          >
            {pathName === "/speeches/" + speech_id && (
              <ShineBorder
                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                borderWidth={2.5}
              />
            )}
            <CardHeader>
              <div className="w-full">
                <h1 className="text-large font-medium truncate cursor-pointer">
                  {title}
                </h1>
                <div className="flex flex-row justify-between items-center">
                  <UserCard
                    userData={{ ...author }}
                    postDate={postDate}
                    link={DOMAIN + "/results/" + summary?.post_id}
                    totalData={result}
                    showFollow={false}
                    className="max-w-fit"
                  />
                  {/* <div>
                    <Button
                      onPress={() =>
                        startSpeechTransition(() => {
                          router.push(DOMAIN + "/speeches/" + speech_id);
                        })
                      }
                      isIconOnly
                      isLoading={isSpeechPending}
                      className="w-auto h-auto data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PlayCircleIcon size={54} />
                    </Button>
                  </div> */}
                </div>
              </div>
            </CardHeader>
            {/* {show && (
              <CardBody className="h-full transition-all duration-300 ease-in-out animate-in slide-in-from-bottom">
                {summaryLevel && (
                  <div
                    className={`w-full md:min-h-[68px] items-center p-4 h-full`}
                  >
                    <div className="w-full justify-between flex flex-row">
                      <div className="w-full flex flex-row justify-start gap-4 items-center">
                        <Image
                          alt="NERDBUNNY LOGO"
                          className="rounded-lg"
                          height="30"
                          src={summaryLevel.image}
                          width="30"
                        />
                        <span>{summaryLevel.title}</span>
                      </div>
                      <Button
                        className="w-fit"
                        variant="light"
                        isLoading={isAuditPending}
                        onPress={() =>
                          startAuditTransition(() => {
                            router.push(DOMAIN + "/results/" + id);
                          })
                        }
                      >
                        <span className="mx-2">View Audit Result</span>
                      </Button>
                    </div>
                    {summaryLevel.value === "ErrorSummary" ? (
                      <div>
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
                              <ul className="mb-4 ml-6 list-disc">
                                {children}
                              </ul>
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
                          {summaryLevel.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div>
                        <p
                          className={`text-sm ${theme === "dark" ? "text-gray-200" : "text-slate-800"}`}
                        >
                          <TextAnimate animation="blurInUp" by="line" once>
                            {summaryLevel.content}
                          </TextAnimate>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardBody>
            )} */}
          </Card>
        ) : (
          <Card className="h-[115px] w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
