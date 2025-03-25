"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@heroui/react";

import { useTheme } from "next-themes";
import UserCard from "./UserCard";
import { useSpeech } from "@/contexts/SpeechContext";
import AudioPostDetail from "./AudioPostDetail";
import useGetItem from "@/app/service/get-items";

export default function AudioPlayerListItem({
  id,
  speech_id,
  showIndex,
  setShowIndex,
  togglePlay,
  setCurrentSummary,
  onOpen,
  index,
}: any) {
  const [title, setTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const { theme } = useTheme();
  const [result, setResult] = useState<any>();
  const [summary, setSummary] = useState<any>();
  const [author, setAuthor] = useState<any>();
  const { setCurrentPostId, setSpeechId, setSpeechTitle } = useSpeech();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const { data, error, isLoading } = useGetItem(id);
  useEffect(() => {
    if (data) {
      setAuthor(data.user);
      setResult(data);
      const summaryData = {
        ...JSON.parse(data.description),
        post_id: data.id,
        post_title: data.title,
        attached_links: data.attached_links,
      };
      setSummary(summaryData);
      setPostDate(data.updated_at);
      setTitle(data.title);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col md:flex-row justify-start md:justify-center h-full">
      <div className="w-full h-full">
        {postDate ? (
          <Card
            isBlurred
            isPressable
            onPress={() => {
              setCurrentPostId(summary?.post_id);
              setSpeechTitle(title);
              setSpeechId(speech_id);
              setShowIndex(index === showIndex ? -1 : index);
            }}
            className={`${showIndex === index ? "h-full" : "h-[115px]"} ${theme === "dark" ? "bg-[#050506] border-1 border-slate-700" : "bg-[#F6F6F6]"} w-full`}
            shadow="lg"
          >
            <CardHeader>
              <div className="w-full overflow-hidden">
                <h1 className="text-large text-left font-medium truncate cursor-pointer">
                  {title}
                </h1>
                <div className="flex flex-row justify-between items-center">
                  <UserCard
                    userData={{ ...author }}
                    postDate={postDate}
                    link={DOMAIN + "/results/" + summary?.post_id}
                    totalData={result}
                    showFollow={false}
                    className="max-w-fit mb-2"
                  />
                </div>
              </div>
              {showIndex === index ? (
                <div>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path>
                  </svg>
                </div>
              ) : (
                <div>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                  </svg>
                </div>
              )}
            </CardHeader>
            {showIndex === index && (
              <CardBody className="h-full transition-all duration-300 ease-in-out animate-in slide-in-from-bottom">
                <AudioPostDetail
                  setCurrentSummary={setCurrentSummary}
                  togglePlay={togglePlay}
                  onOpen={onOpen}
                />
              </CardBody>
            )}
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
