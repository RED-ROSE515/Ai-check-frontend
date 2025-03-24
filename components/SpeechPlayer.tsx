import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button, Card, Progress } from "@heroui/react";
import { FaPlay, FaPause, FaStop, FaExpandArrowsAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useWavesurfer } from "@wavesurfer/react";
import { useRouter } from "next/navigation";
import { useSpeech } from "@/contexts/SpeechContext";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import ShareButtons from "./ShareButtons";

const SpeechPlayer = ({ audio_url, height = 50, isSpeech = true }: any) => {
  // Corrected the type of useRef to match the expected type for the container
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const { theme } = useTheme();
  const { setShowSpeech, speechId, speechTitle, setPercentage, percentage } =
    useSpeech();
  const [isPending, startTransition] = useTransition();
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

  const pause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.pause();
    }
  }, [wavesurfer]);

  const stop = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.stop();
    }
  }, [wavesurfer]);
  useEffect(() => {
    if (percentage === 100) {
      setTime("0:00");
      wavesurfer?.play();
    }
  }, [wavesurfer, percentage]);
  useEffect(() => {
    if (!wavesurfer) return;

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("loading", (val) => setPercentage(val)),
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
      <Progress
        aria-label="Downloading..."
        classNames={{
          base: `w-full h-[50px] card rounded-md ${percentage < 100 ? "" : "hidden"}`,
          track: "drop-shadow-md border border-default",
          indicator: "bg-gradient-to-r from-[#4F4A85] to-[#1E1C32]",
          label: "tracking-wider font-medium text-default-600",
          value: "text-foreground/60",
        }}
        style={{ flex: 1 }}
        showValueLabel={true}
        className="px-10"
        size="md"
        label="Loading..."
        value={percentage}
      />
      <div
        style={{ flex: 1 }}
        className={`px-10 relative ${percentage < 100 ? "hidden" : ""}`}
      >
        <div ref={containerRef}>
          <span className="absolute top-4 left-1 text-sm font-semibold z-10">
            {time}
          </span>
          <span className="absolute top-4 right-1 text-sm font-semibold z-10">
            {duration}
          </span>
        </div>
      </div>
      <Button
        onPress={stop}
        isIconOnly
        radius="sm"
        style={{ width: "50px", height: "50px" }}
      >
        <FaStop />
      </Button>
      {isSpeech && (
        <Button
          onPress={() => {
            startTransition(() => {
              router.push(`/speeches/${speechId}`);
            });
            stop();
            setShowSpeech(false);
          }}
          isLoading={isPending}
          isIconOnly
          radius="sm"
          className="ml-2"
          style={{ width: "50px", height: "50px" }}
        >
          <FaExpandArrowsAlt />
        </Button>
      )}
      {isSpeech && (
        <ShareButtons
          url={DOMAIN + "/speeches/" + speechId}
          title={speechTitle}
          isSpeech={true}
        />
      )}
      {isSpeech && (
        <Button
          onPress={() => {
            pause();
            setShowSpeech(false);
          }}
          className="ml-2"
          isIconOnly
          radius="sm"
          style={{ width: "50px", height: "50px" }}
        >
          <ImCross />
        </Button>
      )}
    </Card>
  );
};

export default SpeechPlayer;
