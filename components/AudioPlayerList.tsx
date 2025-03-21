"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";

import { useTheme } from "next-themes";
import { useSpeech } from "@/contexts/SpeechContext";
import AudioPlayerListItem from "./AudioPlayerListItem";
import api from "@/utils/api";
import Loader from "./Loader";

export default function AudioPlayerList({ className }: { className?: string }) {
  const { theme } = useTheme();
  const { speeches, currentPostId, setSpeeches } = useSpeech();
  const [loading, setLoading] = useState(false);
  const [showIndex, setShowIndex] = useState<number>(0);
  useEffect(() => {
    if (currentPostId) {
      const index = speeches.findIndex((speech) => speech.id === currentPostId);
      setShowIndex(index);
    }
  }, [currentPostId]);
  const renderSkeletons = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="w-full h-[80px] bg-default-100 animate-pulse rounded-lg flex items-center p-4 gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-default-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-default-200 rounded w-3/4"></div>
            <div className="h-3 bg-default-200 rounded w-1/2"></div>
          </div>
        </div>
      ));
  };
  const fetchSpeeches = async () => {
    setLoading(true);
    const response = await api.get(
      `/post/pagination?start=${speeches.length}&limit=10&has_speech=true`
    );
    const newSpeeches = [...speeches, ...response.data.data];
    setSpeeches(newSpeeches);
    setLoading(false);
  };
  return (
    <Card
      isBlurred
      className={`h-full ${theme === "dark" ? "bg-[#050506] border-1 border-[#3C6B99]" : "bg-[#F6F6F6]"} w-full h-full ${className}`}
      shadow="lg"
    >
      <CardHeader>
        <div className="w-full">
          <p className="text-small text-foreground/80">
            Audited Results Playlist
          </p>
        </div>
      </CardHeader>
      <CardBody className="h-full w-full flex flex-col justify-start items-start gap-2">
        <div
          className={`h-fit w-full flex flex-col justify-center items-center gap-2 p-2 rounded-lg`}
        >
          {speeches
            ? speeches.map((speech, index) => {
                return (
                  <AudioPlayerListItem
                    key={index}
                    index={index}
                    className="w-full"
                    id={speech.id}
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                  />
                );
              })
            : renderSkeletons()}
          {speeches.length > 0 && !loading ? (
            <div className="flex flex-row justify-center items-center">
              <Button variant="bordered" onPress={fetchSpeeches}>
                Load More...
              </Button>
            </div>
          ) : (
            <Loader className="mt-6" />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
