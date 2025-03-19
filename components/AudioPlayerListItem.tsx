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
              setShowIndex(index);
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
            </CardHeader>
            {showIndex === index && (
              <CardBody className="h-full transition-all duration-300 ease-in-out animate-in slide-in-from-bottom">
                <AudioPostDetail />
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
