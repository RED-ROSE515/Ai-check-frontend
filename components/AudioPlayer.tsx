"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Button,
  Progress,
  Skeleton,
  DrawerContent,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@heroui/react";
import ReactMarkdown from "react-markdown";
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
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { Particles } from "@/src/components/magicui/particles";
import useGetData from "@/app/service/get-data";
import AdPlayer from "./AdPlayer";
import { useAuth } from "@/contexts/AuthContext";
import SpeechPlayer from "./SpeechPlayer";
import { SummaryType, voices } from "./SummaryWrapper";
import { useToast } from "@/hooks/use-toast";
import SignInDialog from "./SignInDialog";
import ErrorContent from "./ErrorContent";

export default function AudioPlayer({ id }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState("");
  const { isMobile } = useDeviceCheck();
  const [time, setTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const { theme, resolvedTheme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [color, setColor] = useState("#ffffff");
  const { isAuthenticated } = useAuth();
  const [voice, setVoice] = useState("alloy");
  const [postIndex, setPostIndex] = useState<number>(0);
  const {
    percentage,
    setPercentage,
    isPlaying,
    speechList,
    setIsPlaying,
    setSpeechUrl,
    setShowSpeech,
    speechUrl,
    speechPosts,
    speechTitle,
    showIndex,
    listenedSpeeches,
    setListenedSpeeches,
    setSpeechType,
    setSpeechPosts,
    speechType,
    currentPostId,
    setCurrentPostId,
    setSpeechTitle,
    speechId,
    setSpeechId,
    setShowIndex,
  } = useSpeech();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const [showSignIn, setShowSignIn] = useState(false);
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<SummaryType>();
  const [auditDetailPending, startAuditDetailTransition] = useTransition();
  const [newPost, setNewPost] = useState<any>(speechPosts[0]);
  const { mutate: mutateSpeechData } = useGetData(
    currentPostId ? `post/speech?post_id=${currentPostId}` : ""
  );
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
    onOpenChange: onDrawerOpenChange,
  } = useDisclosure();
  // Ensure that the container is correctly passed as a RefObject
  const { data: speechData, isLoading: speechLoading } = useGetData(
    newPost?.id ? `post/speech?post_id=${newPost?.id}` : ""
  );
  const { wavesurfer } = useWavesurfer({
    container: containerRef, // Pass the ref object itself, not its current property
    waveColor: theme === "dark" ? "#4F4A85" : "#A7A9AB",
    progressColor: theme === "dark" ? "#FF0068" : "#FFAA68",
    barWidth: 3,
    barHeight: 2,
    autoCenter: true,
    height: 40,
    url: speechUrl,
    autoplay: true,
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
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  useEffect(() => {
    const index = speechPosts.findIndex(
      (speechPost) => speechPost.id === currentPostId
    );
    setPostIndex(index);
  }, [currentPostId]);
  useEffect(() => {
    if (speechData) {
      const initialSpeech = speechData[0];
      setSpeechType(initialSpeech.speech_type);
      setSpeechUrl(initialSpeech.audio_url);
      setSpeechTitle(initialSpeech.post_title);
      setCurrentPostId(initialSpeech.post_id);
    }
  }, [speechData]);

  const showSignInModal = async (action: string) => {
    toast({
      title: "Info",
      description: action,
    });
    setShowSignIn(true);
  };

  const generateSpeech = async () => {
    try {
      setLoading(true);
      const response = await api.post(`post/generate_voice`, {
        post_id: currentPostId,
        speech_type: speechType,
        voice_type: voice,
      });
      setLoading(false);
      onDrawerClose();
      toast({
        title: "Speech Generation",
        description: (
          <div className="flex flex-col">
            <span>Speech generated successfully! </span>
            <span className="text-md font-bold text-pink-500">
              Cost : ${response.data.cost.toFixed(6)}
            </span>
          </div>
        ),
      });
      setSpeechUrl(response.data.audio_url);
      setSpeechId(response.data.id);
      await mutateSpeechData();
    } catch (error) {
      toast({
        title: "Speech Generation",
        description: "Uh! Something went wrong!",
      });
    }
  };

  const prevSpeech = () => {
    if (postIndex > 0) {
      setNewPost(speechPosts[postIndex - 1]);
      setShowIndex(postIndex - 1);
    }
  };
  const nextSpeech = () => {
    if (postIndex < speechPosts.length - 1) {
      setNewPost(speechPosts[postIndex + 1]);
      setShowIndex(postIndex + 1);
    }
  };

  useEffect(() => {
    if (percentage === 100) {
      setTime("0:00");
      if (isPlaying) wavesurfer?.play();
      else wavesurfer?.pause();
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
      wavesurfer.on("ready", () => {
        wavesurfer.play();
      }),
      wavesurfer.on("finish", () => {
        setShowSpeech(false);
        const newListenedSpeeches = [
          ...listenedSpeeches,
          currentPostId + " - " + speechType,
        ];
        setListenedSpeeches(newListenedSpeeches);
        nextSpeech();
      }),
    ];

    // Cleanup function to unsubscribe from events
    return () => subscriptions.forEach((unsub) => unsub());
  }, [wavesurfer]);

  const fetchSpeeches = async () => {
    const response = await api.get(
      "/post/pagination?start=0&limit=10&has_speech=true"
    );
    setSpeechPosts(response.data.data);
    if (!id) {
      const initialSpeechData = response.data.data[0];
      setTitle(initialSpeechData.title);
      setCurrentPostId(initialSpeechData.id);
      setSpeechTitle(initialSpeechData.title);
    }
  };

  const fetchSpeech = async () => {
    if (!id) return;
    const response = await api.get(`speech?speech_id=${id}`);
    const post_id = response.data.post_id;

    setTitle(response.data.post_title);
    setSpeechTitle(response.data.post_title);
    setSpeechType(response.data.speech_type);
    setSpeechUrl(response.data.audio_url);
    setCurrentPostId(post_id);
    // if (post_id) {
    //   const index = speechPosts.findIndex(
    //     (speechPost) => speechPost.id === post_id
    //   );
    //   alert(index);
    //   setShowIndex(index);
    // }
    wavesurfer?.load(response.data.audio_url);
  };

  useEffect(() => {
    const init = async () => {
      await fetchSpeeches();
      await fetchSpeech();
    };
    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        isMobile &&
        window.innerHeight + window.scrollY ==
          document.documentElement.scrollHeight
      )
        onOpen();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-start md:justify-center h-full gap-4 p-0 md:p-4">
      <div className="w-full md:w-[50%] items-center flex flex-row justify-center h-full overflow-hidden">
        <SignInDialog
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
        />
        <Card
          isBlurred
          className={`overflow-hidden rounded-none md:rounded-lg ${theme === "dark" ? "bg-[#050506] md:border-1 border-[#3C6B99]" : "bg-[#F6F6F6]"} w-full h-full p-1`}
          shadow="lg"
        >
          <CardBody className="p-1 overflow-hidden">
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
                url={DOMAIN + "/speeches/" + speechId}
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
                  url={DOMAIN + "/speeches/" + speechId}
                  title={title}
                  useIcon={false}
                  // summary={result.summary.child}
                />
              </div>
            </div>

            <div className="w-full flex flex-col overflow-hidden justify-end items-start h-full min-h-[200px]">
              <span className="text-lg font-bold ml-6">Sponsored by</span>
              <AdPlayer />
              <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={color}
                refresh
              />
            </div>
            <div className="w-full h-full flex flex-col-reverse justity-end z-10">
              <div
                className={`flex flex-col w-full justify-end md:rounded-xl shadow-md p-1 md:p-3 md:border-1 ${theme === "dark" ? "bg-black" : "bg-[#F5F5F5]"}`}
              >
                <div className="flex flex-row justify-between items-start w-full">
                  {speechType && speechTitle ? (
                    <div className="flex flex-col gap-0 w-full h-[65px]">
                      <div className="flex flex-row justify-between items-center w-full">
                        <p className="text-small text-foreground/80">
                          {speechType.split("Summary")[0] + " " + "Summary"}
                        </p>
                      </div>
                      <h1
                        className="text-large font-medium mt-2 truncate cursor-pointer"
                        onClick={onOpen}
                      >
                        {speechTitle}
                      </h1>
                    </div>
                  ) : (
                    <div className="h-[66px] w-full space-y-2 p-2">
                      <Skeleton className="w-full rounded-lg">
                        <div className="h-[20px] rounded-md bg-default-300" />
                      </Skeleton>
                      <Skeleton className="w-full rounded-sm">
                        <div className="h-[35px] rounded-md bg-default-300" />
                      </Skeleton>
                    </div>
                  )}
                </div>

                <div className="flex flex-col mt-3 gap-1 w-full">
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
                  <div className="flex flex-row justify-between items-center">
                    <Button
                      className="px-1 py-0"
                      variant="bordered"
                      size="sm"
                      onPress={onOpen}
                    >
                      <p className="text-small text-foreground/80">
                        View Playlist
                      </p>
                    </Button>

                    <Button
                      className="px-1 py-0"
                      variant="bordered"
                      size="sm"
                      isLoading={auditDetailPending}
                      onPress={() =>
                        startAuditDetailTransition(() =>
                          router.push(
                            DOMAIN + "/results/discrepancies/" + currentPostId
                          )
                        )
                      }
                    >
                      <p className="text-small text-foreground/80">
                        View Full Audit Report
                      </p>
                    </Button>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center">
                  <Button
                    isIconOnly
                    isDisabled
                    className="hidden md:flex data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <RepeatOneIcon className="text-foreground/80" />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled={showIndex === 0}
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    onPress={prevSpeech}
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
                    isDisabled={postIndex === speechPosts.length - 1}
                    onPress={nextSpeech}
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <NextIcon />
                  </Button>
                  <Button
                    isIconOnly
                    isDisabled
                    className="hidden md:flex data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                  >
                    <ShuffleIcon className="text-foreground/80" />
                  </Button>
                  <Button
                    isIconOnly
                    className="block md:hidden data-[hover]:bg-foreground/10 absolute right-1"
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
        hideCloseButton
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
          {(onClose) => (
            <>
              <Button
                isIconOnly
                variant="light"
                onPress={onClose}
                className="absolute right-0 z-10 top-2"
              >
                <FaX />
              </Button>
              <DrawerBody className="px-0 py-2">
                <AudioPlayerList
                  className="w-full h-full mr-2"
                  setCurrentSummary={setCurrentSummary}
                  togglePlay={togglePlay}
                  onOpen={onDrawerOpen}
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className="hidden md:block w-[35%] h-full">
        <AudioPlayerList
          setCurrentSummary={setCurrentSummary}
          togglePlay={togglePlay}
          onOpen={onDrawerOpen}
        />
      </div>
      <Drawer
        backdrop={isMobile ? "transparent" : "blur"}
        isOpen={isDrawerOpen}
        onOpenChange={onDrawerOpenChange}
        size="3xl"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-4xl">
                Voice Generation
              </DrawerHeader>
              <DrawerBody>
                <div className="flex flex-col gap-4 mt-8">
                  <Select
                    isRequired
                    className="max-w-sm"
                    defaultSelectedKeys={["alloy"]}
                    label="Favorite Voice"
                    placeholder="Select a voice you want"
                  >
                    {voices.map((voice) => (
                      <SelectItem
                        onPress={() => setVoice(voice.key)}
                        key={voice.key}
                      >
                        {voice.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="mt-4">
                    <SpeechPlayer
                      isSpeech={false}
                      audio_url={`https://cdn.openai.com/API/docs/audio/${voice}.wav`}
                    />
                  </div>
                  <div className="mt-4">
                    {currentSummary?.type === "ErrorSummary" ? (
                      <ErrorContent content={currentSummary?.content} />
                    ) : (
                      <span>{currentSummary?.content}</span>
                    )}
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() =>
                    isAuthenticated
                      ? generateSpeech()
                      : showSignInModal("You need to sign in to continue.")
                  }
                  isLoading={loading}
                >
                  Generate
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
