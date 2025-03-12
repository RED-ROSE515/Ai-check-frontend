"use client";
import React, { useState, useEffect, use } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import { useTheme } from "next-themes";

export default function App({ params }: any) {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div
      className={`w-full flex flex-row justify-center p-4 h-full ${theme === "dark" ? "bg-[#1E2A36]" : "bg-[#FFF]"}`}
    >
      <AudioPlayer id={id} />
    </div>
  );
}
