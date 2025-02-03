import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button, Card } from "@heroui/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { useWavesurfer } from "@wavesurfer/react";
import { useSpeech } from "@/contexts/SpeechContext";
import { useTheme } from "next-themes";

const SpeechPlayer = ({ audio_url, height = 50 }: any) => {
  // Corrected the type of useRef to match the expected type for the container
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const { theme } = useTheme();
  const { setSpeechUrl, setShowSpeech } = useSpeech();
  // Ensure that the container is correctly passed as a RefObject
  const { wavesurfer } = useWavesurfer({
    container: containerRef, // Pass the ref object itself, not its current property
    waveColor: theme === "dark" ? "#4F4A85" : "#A7A9AB",
    progressColor: theme === "dark" ? "#FF0068" : "#FFAA68",
    barWidth: 3,
    height: height,
    url: audio_url,
  });
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
  const togglePlay = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  }, [wavesurfer]);

  useEffect(() => {
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("decode", (duration) => setDuration(formatTime(duration))),
      wavesurfer.on("timeupdate", (currentTime) =>
        setTime(formatTime(currentTime))
      ),
      wavesurfer.on("finish", () => setShowSpeech(false)),
    ];

    // Cleanup function to unsubscribe from events
    return () => subscriptions.forEach((unsub) => unsub());
  }, [wavesurfer]);

  return (
    <Card style={{ flexDirection: "row" }} radius="sm">
      <Button
        onPress={togglePlay}
        isIconOnly
        radius="sm"
        style={{ width: "50px", height: "50px" }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>
      <div style={{ flex: 1 }} className="px-10 relative">
        <div ref={containerRef}>
          <span className="absolute top-4 left-1 text-sm font-semibold z-10">
            {time}
          </span>
          <span className="absolute top-4 right-1 text-sm font-semibold z-10">
            {duration}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SpeechPlayer;
