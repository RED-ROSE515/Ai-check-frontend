"use client";
import React, { useState, useEffect, use } from "react";
import { Card, CardBody, Image, Button, Slider } from "@heroui/react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { useWavesurfer } from "@wavesurfer/react";
import { useSpeech } from "@/contexts/SpeechContext";
import { useTheme } from "next-themes";
import AudioPlayer from "@/components/AudioPlayer";

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full flex flex-row justify-center h-full">
      <AudioPlayer id={id} />
    </div>
  );
}
