"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import AudioList from "@/components/AudioList";
import Loader from "@/components/Loader";
import { useSpeech } from "@/contexts/SpeechContext";
import { useTheme } from "next-themes";
import AudioPlayer from "@/components/AudioPlayer";

const SpeechesPage = () => {
  const { setSpeeches } = useSpeech();
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const fetchSpeeches = async () => {
    const response = await api.get("/user/speeches?start=0&limit=10");
    setSpeeches(response.data.data);
  };
  useEffect(() => {
    setLoading(true);
    fetchSpeeches();
    setLoading(false);
  }, []);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="w-full justify-center flex flex-row">
      <div
        className={`w-full flex flex-row justify-center p-4 md:h-[80vh] ${theme === "dark" ? "bg-[#1E2A36]" : "bg-[#FFF]"}`}
      >
        <AudioPlayer id={null} />
      </div>
    </div>
  );
};

export default SpeechesPage;
