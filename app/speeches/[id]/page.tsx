"use client";
import React, { useState, useEffect, use } from "react";
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
    <div className="w-full flex flex-row justify-center py-4 h-full">
      <AudioPlayer id={id} />
    </div>
  );
}
