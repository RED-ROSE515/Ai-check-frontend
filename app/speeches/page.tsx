"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AudioPlayer from "@/components/AudioPlayer";

const SpeechesPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full justify-center flex flex-row">
      <div
        className={`w-full flex flex-row justify-center md:p-4 h-[80vh] ${theme === "dark" ? "bg-[#1E2A36]" : "bg-[#FFF]"}`}
      >
        <AudioPlayer id={null} />
      </div>
    </div>
  );
};

export default SpeechesPage;
