"use client";
import React, { useEffect, useTransition } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Image as HeroImage,
  Button,
} from "@heroui/react";

import childImage from "../public/NerdBunnyUI/child.png";
import collegeImage from "../public/NerdBunnyUI/college.png";
import phDImage from "../public/NerdBunnyUI/PhD.png";
import errorImage from "../public/NerdBunnyUI/Error.png";
import Image from "next/image";
import { ShineBorder } from "./ui/shine-border";
import { PauseCircleIcon, PlayCircleIcon } from "./AudioPlayer";
import { useTheme } from "next-themes";
import { useSpeech } from "@/contexts/SpeechContext";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import AudioPlayerListItem from "./AudioPlayerListItem";

export default function AudioPostDetail({}) {
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { isAuthenticated, user } = useAuth();
  const { theme } = useTheme();
  const pathName = usePathname();
  const { speeches, currentPostId } = useSpeech();

  useEffect(() => {}, [currentPostId]);
  return (
    <Card
      isBlurred
      className={`h-full ${theme === "dark" ? "bg-[#050506] border-1 border-[#3C6B99]" : "bg-[#F6F6F6]"} w-full h-full`}
      shadow="lg"
    >
      <CardHeader>
        <div className="w-full">
          <p className="text-small text-foreground/80">Post Detail</p>
        </div>
      </CardHeader>
      <CardBody className="h-full w-full flex flex-col justify-start items-start gap-2">
        <div
          className={`h-fit w-full flex flex-col justify-start items-start gap-2 p-2 rounded-lg`}
        >
          <h1>Post Detail</h1>
          <strong>Child Summary</strong>
          <strong>College Summary</strong>
          <strong>PhD Summary</strong>
          <strong>Error Summary</strong>
          <strong>{currentPostId}</strong>
        </div>
      </CardBody>
    </Card>
  );
}
