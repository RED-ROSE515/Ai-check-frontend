"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Button,
  SelectItem,
  Select,
  Progress,
  Skeleton,
  DrawerFooter,
  DrawerContent,
  Drawer,
  DrawerBody,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import { useWavesurfer } from "@wavesurfer/react";
import { useSpeech } from "@/contexts/SpeechContext";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import api from "@/utils/api";
import ShareButtons from "./ShareButtons";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import AudioPlayerList from "./AudioPlayerList";

import {
  PlayCircleIcon,
  PauseCircleIcon,
  NextIcon,
  PreviousIcon,
  ForwardIcon,
  RewindIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";
import { voices } from "./SummaryWrapper";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { GiHamburgerMenu } from "react-icons/gi";

const NewAudioPlayerList = React.memo(
  ({ className }: { className?: string }) => {
    return <AudioPlayerList className={className} />;
  }
);
export default function AudioPlayer({ id }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const [title, setTitle] = useState("");
  const [speechIndex, setSpeechIndex] = useState(0);
  const [postId, setPostId] = useState("");
  const { isMobile } = useDeviceCheck();
  const [time, setTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    percentage,
    setPercentage,
    isPlaying,
    speechList,
    setIsPlaying,
    setSpeechUrl,
    setShowSpeech,
    speechUrl,
    speeches,
    speechTitle,
    listenedSpeeches,
    setListenedSpeeches,
    setSpeechType,
    setSpeeches,
    speechType,
    currentPostId,
    setCurrentPostId,
    setSpeechTitle,
    speechId,
  } = useSpeech();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const router = useRouter();
  // Ensure that the container is correctly passed as a RefObject

  const { wavesurfer } = useWavesurfer({
    container: containerRef, // Pass the ref object itself, not its current property
    waveColor: theme === "dark" ? "#4F4A85" : "#A7A9AB",
    progressColor: theme === "dark" ? "#FF0068" : "#FFAA68",
    barWidth: 3,
    barHeight: 2,
    autoCenter: true,
    height: 40,
    url: speechUrl,
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
      setIsPlaying(!isPlaying);
    }
  }, [wavesurfer, isPlaying]);
  const toggleStop = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.setTime(wavesurfer.getDuration());
    }
  }, [wavesurfer]);
  const skip = useCallback(
    (length: number) => {
      if (wavesurfer) {
        wavesurfer.skip(length);
      }
    },
    [wavesurfer]
  );
  useEffect(() => {
    if (percentage === 100) {
      setTime("0:00");
      isPlaying ? wavesurfer?.play() : wavesurfer?.pause();
    }
  }, [isPlaying, wavesurfer, percentage]);
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
      wavesurfer.on("finish", () => {
        setShowSpeech(false);
        const newListenedSpeeches = [
          ...listenedSpeeches,
          currentPostId + " - " + speechType,
        ];
        setListenedSpeeches(newListenedSpeeches);
      }),
    ];

    // Cleanup function to unsubscribe from events
    return () => subscriptions.forEach((unsub) => unsub());
  }, [wavesurfer]);

  const fetchSpeeches = async () => {
    const response = await api.get(
      "/post/pagination?start=0&limit=10&has_speech=true"
    );
    setSpeeches(response.data.data);
    if (!id) {
      const speechData = response.data.data[0];
      setTitle(speechData.title);
      setPostId(speechData.id);
      setCurrentPostId(speechData.id);
      setSpeechTitle(speechData.title);
    }
  };

  const fetchSpeech = async () => {
    if (!id && !speechId) return;
    const response = await api.get(`speech?speech_id=${id || speechId}`);
    setTitle(response.data.post_title);
    setPostId(response.data.post_id);
    setSpeechTitle(response.data.post_title);
    setSpeechType(response.data.speech_type);
    setSpeechUrl(response.data.audio_url);
    wavesurfer?.load(response.data.audio_url);
  };

  useEffect(() => {
    const index = speeches.findIndex(
      (speech) => pathName === "/speeches/" + speech.id
    );
    setSpeechIndex(index);
  }, [pathName]);

  useEffect(() => {
    if (speechId) fetchSpeech();
  }, [speechId]);

  useEffect(() => {
    setSpeechIndex(
      speechList.findIndex((speech: any) => speech?.speech_url === speechUrl)
    );
  }, [speechUrl]);
  useEffect(() => {
    fetchSpeeches();
    fetchSpeech();
  }, []);
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-start md:justify-center h-full gap-4 p-1 md:p-4">
      <div className="w-full md:w-[50%] items-center flex flex-row justify-center h-full">
        <Card
          isBlurred
          className={`${theme === "dark" ? "bg-[#050506] border-1 border-[#3C6B99]" : "bg-[#F6F6F6]"} w-full h-full p-1`}
          shadow="lg"
        >
          <CardBody className="p-1">
            <Button
              variant="light"
              isLoading={isPending}
              onPress={() => {
                startTransition(() => {
                  history.back();
                });
              }}
              className="hidden md:flex absolute left-0 top-0"
            >
              <IoMdArrowBack size={20} />
              <span>Back</span>
            </Button>
            <div className="hidden md:flex absolute right-3 top-0">
              <ShareButtons
                url={DOMAIN + "/speeches/" + id}
                title={title}
                useIcon={false}
                // summary={result.summary.child}
              />
            </div>
            <div className="flex md:hidden flex-row justify-between items-center">
              <Button
                variant="light"
                className="px-0"
                isLoading={isPending}
                onPress={() => {
                  startTransition(() => {
                    history.back();
                  });
                }}
              >
                <IoMdArrowBack size={20} />
                <span>Back</span>
              </Button>
              <div>
                <ShareButtons
                  url={DOMAIN + "/speeches/" + id}
                  title={title}
                  useIcon={false}
                  // summary={result.summary.child}
                />
              </div>
            </div>

            <div className="w-full flex flex-row justify-center items-center">
              <video
                autoPlay
                loop
                muted
                src={`${theme === "dark" ? "/audio-bg2-dark.mp4" : "/audio-bg2-white.mp4"}`}
                className="w-full md:w-[40%] -z-10 opacity-50"
              />
            </div>
            <div className="w-full h-full flex flex-col-reverse justity-end">
              <div
                className={`flex flex-col w-full justify-end rounded-xl shadow-md p-3 border-1 ${theme === "dark" ? "bg-black" : ""}`}
              >
                <div className="flex flex-row justify-between items-start w-full">
                  {speechType && speechTitle ? (
                    <div className="flex flex-col gap-0 w-full h-[60px]">
                      <div className="flex flex-row justify-between items-center w-full">
                        <p className="text-small text-foreground/80">
                          {speechType}
                        </p>
                        {/* <Select
                        className="w-1/2 md:w-1/3"
                        defaultSelectedKeys={["alloy"]}
                        size="sm"
                        variant="bordered"
                        radius="sm"
                        labelPlacement="outside-left"
                        label={isMobile ? "" : "Favorite Voice"}
                        placeholder="Select a voice you want"
                      >
                        {voices.map((voice) => (
                          <SelectItem
                            onPress={() => setCurrentVoice(voice.key)}
                            key={voice.key}
                          >
                            {voice.label}
                          </SelectItem>
                        ))}
                      </Select> */}
                      </div>
                      <h1
                        className="text-large font-medium mt-2 truncate cursor-pointer"
                        onClick={() =>
                          router.push(DOMAIN + "/results/" + postId)
                        }
                      >
                        {speechTitle}
                      </h1>
                    </div>
                  ) : (
                    <div className="h-[60px] w-full space-y-2 p-2">
                      <Skeleton className="w-full rounded-lg">
                        <div className="h-[15px] rounded-md bg-default-300" />
                      </Skeleton>
                      <Skeleton className="w-full rounded-sm">
                        <div className="h-[35px] rounded-md bg-default-300" />
                      </Skeleton>
                    </div>
                  )}
                </div>

                <div className="flex flex-col mt-3 gap-1 w-full">
                  {/* {percentage < 100 ? ( */}
                  {/* <Skeleton className="h-[40px] w-full rounded-lg" /> */}
                  <Progress
                    aria-label="Downloading..."
                    classNames={{
                      base: `w-full h-[40px] card rounded-md ${percentage < 100 ? "" : "hidden"}`,
                      track: "drop-shadow-md border border-default",
                      indicator: "bg-gradient-to-r from-[#4F4A85] to-[#1E1C32]",
                      label: "tracking-wider font-medium text-default-600",
                      value: "text-foreground/60",
                    }}
                    showValueLabel={true}
                    size="md"
                    label="Loading..."
                    value={percentage}
                  />
                  <div
                    ref={containerRef}
                    className={`h-[40px] border-1 rounded-lg ${percentage < 100 ? "hidden" : ""}`}
                  />
                  <div className="flex justify-between">
                    <p className="text-small">{time}</p>
                    <p className="text-small text-foreground/50">{duration}</p>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center">
                  <Button
                    isIconOnly
                    isDisabled
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <RepeatOneIcon className="text-foreground/80" />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled={speechIndex === 0}
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onPress={() => {
                      if (speechIndex > 0) {
                        const newSpeechIndex = speechIndex - 1;
                        const newSpeech = speechList[newSpeechIndex];
                        setSpeechUrl(newSpeech?.speech_url);
                        setSpeechType(newSpeech?.speech_type);
                      }
                    }}
                  >
                    <PreviousIcon />
                  </Button>
                  <Button
                    isIconOnly
                    onPress={() => skip(-15)}
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <RewindIcon />
                  </Button>
                  <Button
                    onPress={togglePlay}
                    isIconOnly
                    className="w-auto h-auto data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    {isPlaying ? (
                      <PauseCircleIcon size={54} />
                    ) : (
                      <PlayCircleIcon size={54} />
                    )}
                  </Button>
                  <Button
                    isIconOnly
                    onPress={() => skip(15)}
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <ForwardIcon />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled={speechIndex === 7}
                    onPress={() => {
                      if (speechIndex < speechList.length - 1) {
                        const newSpeechIndex = speechIndex + 1;
                        const newSpeech = speechList[newSpeechIndex];
                        setSpeechUrl(newSpeech?.speech_url);
                        setSpeechType(newSpeech?.speech_type);
                      }
                    }}
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <NextIcon />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <ShuffleIcon className="text-foreground/80" />
                  </Button>
                  <Button
                    isIconOnly
                    className="block md:hidden data-[hover]:bg-foreground/10 absolute right-5"
                    radius="full"
                    variant="light"
                    onPress={onOpen}
                  >
                    <GiHamburgerMenu size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Drawer
        isOpen={isOpen}
        backdrop="blur"
        size="full"
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
            },
            exit: {
              x: 100,
              opacity: 0,
            },
          },
        }}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerBody className="px-0 py-2">
                <NewAudioPlayerList className="w-full h-full mr-2" />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <div className="hidden md:block w-[35%] h-full">
        <NewAudioPlayerList />
      </div>
    </div>
  );
}
