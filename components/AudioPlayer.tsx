"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { useWavesurfer } from "@wavesurfer/react";
import { useSpeech } from "@/contexts/SpeechContext";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import api from "@/utils/api";
import ShareButtons from "./ShareButtons";
import childImage from "../public/NerdBunnyUI/child.png";
import collegeImage from "../public/NerdBunnyUI/college.png";
import phDImage from "../public/NerdBunnyUI/PhD.png";
import errorImage from "../public/NerdBunnyUI/Error.png";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { IoMdArrowBack } from "react-icons/io";
import AudioPlayerList from "./AudioPlayerList";
import AudioPostDetail from "./AudioPostDetail";

export const HeartIcon = ({
  size = 24,
  width,
  height,
  strokeWidth = 1.5,
  fill = "none",
  ...props
}: any) => {
  return (
    <svg
      aria-hidden="true"
      fill={fill}
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const PlayCircleIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M11.9688 2C6.44875 2 1.96875 6.48 1.96875 12C1.96875 17.52 6.44875 22 11.9688 22C17.4888 22 21.9688 17.52 21.9688 12C21.9688 6.48 17.4988 2 11.9688 2ZM15.5288 12.83L10.3488 15.85C10.1588 15.95 9.96875 16 9.77875 16C9.57875 16 9.38875 15.95 9.20875 15.84C8.82875 15.63 8.59875 15.22 8.59875 14.77V8.73C8.59875 8.28 8.82875 7.87 9.20875 7.66C9.58875 7.45 10.0688 7.45 10.4488 7.67L15.6288 10.69C15.9988 10.91 16.2288 11.32 16.2288 11.76C16.2188 12.2 15.9888 12.61 15.5288 12.83Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PauseCircleIcon = ({
  size = 24,
  width,
  height,
  ...props
}: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M11.9688 2C6.44875 2 1.96875 6.48 1.96875 12C1.96875 17.52 6.44875 22 11.9688 22C17.4888 22 21.9688 17.52 21.9688 12C21.9688 6.48 17.4988 2 11.9688 2ZM10.7188 15.03C10.7188 15.51 10.5188 15.7 10.0087 15.7H8.70875C8.19875 15.7 7.99875 15.51 7.99875 15.03V8.97C7.99875 8.49 8.19875 8.3 8.70875 8.3H9.99875C10.5087 8.3 10.7087 8.49 10.7087 8.97V15.03H10.7188ZM15.9987 15.03C15.9987 15.51 15.7987 15.7 15.2887 15.7H13.9987C13.4887 15.7 13.2887 15.51 13.2887 15.03V8.97C13.2887 8.49 13.4887 8.3 13.9987 8.3H15.2887C15.7987 8.3 15.9987 8.49 15.9987 8.97V15.03Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const NextIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z"
        fill="currentColor"
      />
      <path
        d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PreviousIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M20.2409 7.21957V16.7896C20.2409 18.7496 18.1109 19.9796 16.4109 18.9996L12.2609 16.6096L8.11094 14.2096C6.41094 13.2296 6.41094 10.7796 8.11094 9.79957L12.2609 7.39957L16.4109 5.00957C18.1109 4.02957 20.2409 5.24957 20.2409 7.21957Z"
        fill="currentColor"
      />
      <path
        d="M3.76172 18.9303C3.35172 18.9303 3.01172 18.5903 3.01172 18.1803V5.82031C3.01172 5.41031 3.35172 5.07031 3.76172 5.07031C4.17172 5.07031 4.51172 5.41031 4.51172 5.82031V18.1803C4.51172 18.5903 4.17172 18.9303 3.76172 18.9303Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ForwardIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
      fill="none"
    >
      <path
        d="M10.2866 15.75V8.41846H8.55176C7.97705 8.77832 7.36475 9.17041 6.80078 9.56787V11.1309C7.32715 10.7656 7.97168 10.3521 8.45508 10.0352H8.53027V15.75H10.2866Z"
        fill="currentColor"
      />
      <path
        d="M11.5596 13.6982C11.5864 14.896 12.564 15.8843 14.3257 15.8843C16.0391 15.8843 17.2637 14.8745 17.2637 13.2256C17.2637 11.7109 16.1196 10.814 14.8521 10.814C13.9551 10.814 13.4448 11.2061 13.2837 11.4424H13.2139L13.3643 9.8042H16.7373V8.41309H11.9678L11.6562 12.7583H13.23C13.3643 12.4736 13.7295 12.1084 14.3525 12.1084C15.04 12.1084 15.5449 12.5972 15.5449 13.3115C15.5449 14.0581 14.9756 14.52 14.3525 14.52C13.708 14.52 13.2461 14.187 13.1709 13.6982H11.5596Z"
        fill="currentColor"
      />
      <path
        d="M11 4.06189V5.99999L15 3L11 0V2.04938C5.94668 2.5511 2 6.81465 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.23885 20.8796 6.73748 19.0711 4.92893L17.6569 6.34315C19.1057 7.79195 20 9.79058 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.92038 7.05369 4.55399 11 4.06189Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RewindIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
      fill="none"
    >
      <path
        d="M13 4.06189V5.99999L9 3L13 0V2.04938C18.0533 2.5511 22 6.81465 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 9.23885 3.12038 6.73748 4.92893 4.92893L6.34315 6.34315C4.89434 7.79195 4 9.79058 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.92038 16.9463 4.55399 13 4.06189Z"
        fill="currentColor"
      />
      <path
        d="M11.5596 13.6982C11.5864 14.896 12.564 15.8843 14.3257 15.8843C16.0391 15.8843 17.2637 14.8745 17.2637 13.2256C17.2637 11.7109 16.1196 10.814 14.8521 10.814C13.9551 10.814 13.4448 11.2061 13.2837 11.4424H13.2139L13.3643 9.8042H16.7373V8.41309H11.9678L11.6562 12.7583H13.23C13.3643 12.4736 13.7295 12.1084 14.3525 12.1084C15.04 12.1084 15.5449 12.5972 15.5449 13.3115C15.5449 14.0581 14.9756 14.52 14.3525 14.52C13.708 14.52 13.2461 14.187 13.1709 13.6982H11.5596Z"
        fill="currentColor"
      />
      <path
        d="M10.2866 15.75V8.41846H8.55176C7.97705 8.77832 7.36475 9.17041 6.80078 9.56787V11.1309C7.20866 10.8478 7.6875 10.5358 8.10733 10.2622C8.22929 10.1827 8.34626 10.1065 8.45508 10.0352H8.53027V15.75H10.2866Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const RepeatOneIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M3.91 17.1814C3.72 17.1814 3.53 17.1114 3.38 16.9614C2.01 15.5814 1.25 13.7614 1.25 11.8314C1.25 7.82139 4.5 4.56139 8.5 4.56139L14.57 4.58139L13.48 3.54139C13.18 3.25139 13.17 2.78139 13.46 2.48139C13.75 2.18139 14.22 2.17139 14.52 2.46139L16.96 4.80139C17.18 5.01139 17.25 5.34139 17.14 5.62139C17.03 5.90139 16.75 6.09139 16.44 6.09139L8.5 6.07139C5.33 6.07139 2.75 8.66139 2.75 11.8414C2.75 13.3714 3.35 14.8214 4.44 15.9114C4.73 16.2014 4.73 16.6814 4.44 16.9714C4.29 17.1114 4.1 17.1814 3.91 17.1814Z"
        fill="currentColor"
      />
      <path
        d="M9.9999 21.75C9.8099 21.75 9.6299 21.68 9.4799 21.54L7.0399 19.2C6.8199 18.99 6.7499 18.66 6.8599 18.38C6.9799 18.1 7.2599 17.95 7.5599 17.91L15.5099 17.93C18.6799 17.93 21.2599 15.34 21.2599 12.16C21.2599 10.63 20.6599 9.18 19.5699 8.09C19.2799 7.8 19.2799 7.32 19.5699 7.03C19.8599 6.74 20.3399 6.74 20.6299 7.03C21.9999 8.41 22.7599 10.23 22.7599 12.16C22.7599 16.17 19.5099 19.43 15.5099 19.43L9.4399 19.41L10.5299 20.45C10.8299 20.74 10.8399 21.21 10.5499 21.51C10.3899 21.67 10.1999 21.75 9.9999 21.75Z"
        fill="currentColor"
      />
      <path
        d="M12.2485 15.4191C11.8385 15.4191 11.4985 15.0791 11.4985 14.6691V11.2791L11.3085 11.4891C11.0285 11.7991 10.5585 11.8191 10.2485 11.5491C9.93853 11.2791 9.91853 10.7991 10.1885 10.4891L11.6885 8.81909C11.8985 8.58909 12.2285 8.50909 12.5185 8.61909C12.8085 8.73909 12.9985 9.00909 12.9985 9.32909V14.6791C12.9985 15.0891 12.6585 15.4191 12.2485 15.4191Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const ShuffleIcon = ({ size = 24, width, height, ...props }: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M21.7507 17.9809C21.7507 17.9609 21.7407 17.9409 21.7407 17.9209C21.7307 17.8409 21.7207 17.7609 21.6907 17.6909C21.6507 17.6009 21.6007 17.5309 21.5407 17.4609C21.5407 17.4609 21.5407 17.4509 21.5307 17.4509C21.4607 17.3809 21.3807 17.3309 21.2907 17.2909C21.2007 17.2509 21.1007 17.2309 21.0007 17.2309L16.3307 17.2509C16.3307 17.2509 16.3307 17.2509 16.3207 17.2509C15.7207 17.2509 15.1407 16.9709 14.7807 16.4909L13.5607 14.9209C13.3107 14.5909 12.8407 14.5309 12.5107 14.7909C12.1807 15.0509 12.1207 15.5109 12.3807 15.8409L13.6007 17.4109C14.2507 18.2509 15.2707 18.7509 16.3307 18.7509H16.3407L19.1907 18.7409L18.4807 19.4509C18.1907 19.7409 18.1907 20.2209 18.4807 20.5109C18.6307 20.6609 18.8207 20.7309 19.0107 20.7309C19.2007 20.7309 19.3907 20.6609 19.5407 20.5109L21.5407 18.5109C21.6107 18.4409 21.6607 18.3609 21.7007 18.2709C21.7307 18.1709 21.7507 18.0709 21.7507 17.9809Z"
        fill="currentColor"
      />
      <path
        d="M8.42 6.69172C7.77 5.79172 6.73 5.26172 5.62 5.26172C5.61 5.26172 5.61 5.26172 5.6 5.26172L3 5.27172C2.59 5.27172 2.25 5.61172 2.25 6.02172C2.25 6.43172 2.59 6.77172 3 6.77172L5.61 6.76172H5.62C6.25 6.76172 6.84 7.06172 7.2 7.57172L8.28 9.07172C8.43 9.27172 8.66 9.38172 8.89 9.38172C9.04 9.38172 9.2 9.33172 9.33 9.24172C9.67 8.99172 9.74 8.52172 9.5 8.19172L8.42 6.69172Z"
        fill="currentColor"
      />
      <path
        d="M21.74 6.07875C21.74 6.05875 21.75 6.03875 21.75 6.02875C21.75 5.92875 21.73 5.82875 21.69 5.73875C21.65 5.64875 21.6 5.56875 21.53 5.49875L19.53 3.49875C19.24 3.20875 18.76 3.20875 18.47 3.49875C18.18 3.78875 18.18 4.26875 18.47 4.55875L19.18 5.26875L16.45 5.25875C16.44 5.25875 16.44 5.25875 16.43 5.25875C15.28 5.25875 14.2 5.82875 13.56 6.79875L7.17 16.3787C6.81 16.9187 6.2 17.2487 5.55 17.2487H5.54L3 17.2287C2.59 17.2287 2.25 17.5587 2.25 17.9787C2.25 18.3887 2.58 18.7287 3 18.7287L5.55 18.7387C5.56 18.7387 5.56 18.7387 5.57 18.7387C6.73 18.7387 7.8 18.1688 8.44 17.1988L14.83 7.61875C15.19 7.07875 15.8 6.74875 16.45 6.74875H16.46L21 6.76875C21.1 6.76875 21.19 6.74875 21.29 6.70875C21.38 6.66875 21.46 6.61875 21.53 6.54875C21.53 6.54875 21.53 6.53875 21.54 6.53875C21.6 6.46875 21.66 6.39875 21.69 6.30875C21.72 6.23875 21.73 6.15875 21.74 6.07875Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default function AudioPlayer({ id }: any) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const pathName = usePathname();
  const [title, setTitle] = useState("");
  const [speechIndex, setSpeechIndex] = useState(0);
  const [postId, setPostId] = useState("");
  const [postDate, setPostDate] = useState("");
  const [time, setTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const {
    setSpeechUrl,
    setShowSpeech,
    speechUrl,
    speeches,
    setSpeechType,
    setSpeeches,
    speechType,
  } = useSpeech();
  const [result, setResult] = useState<any>();
  const [summary, setSummary] = useState<any>();
  const [author, setAuthor] = useState<any>();
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const [summaryLevel, setSummaryLevel] = useState<any>();
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
    }
  }, [wavesurfer]);
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

  const fetchSpeeches = async () => {
    const response = await api.get("/user/speeches?start=0&limit=10");
    setSpeeches(response.data.data);
    if (!id) {
      const speechData = response.data.data[0];
      setTitle(speechData.post_title);
      setPostId(speechData.post_id);
      setSpeechType(speechData.speech_type);
      setSpeechUrl(speechData.audio_url);
      await getResultById(speechData.post_id, speechData.speech_type);
    }
  };

  const fetchSpeech = async () => {
    if (!id) return;
    const response = await api.get(`speech?speech_id=${id}`);
    setTitle(response.data.post_title);
    setPostId(response.data.post_id);
    setSpeechType(response.data.speech_type);
    setSpeechUrl(response.data.audio_url);
    await getResultById(response.data.post_id, response.data.speech_type);
  };

  const getResultById = async (paperId: string, speech_type: string) => {
    try {
      const response = await api.get(`/post/${paperId}`);
      setResult(response.data);
      setAuthor(response.data.user);
      const summaryData = {
        ...JSON.parse(response.data.description),
        post_id: response.data.id,
        post_title: response.data.title,
        attached_links: response.data.attached_links,
      };
      setSummary(summaryData);
      setPostDate(response.data.updated_at);
      switch (speech_type) {
        case "ChildSummary":
          setSummaryLevel({
            title: "Child Summary",
            content: summaryData?.summary?.child,
            value: "ChildSummary",
            audio_url: "",
            image: childImage,
          });
          break;
        case "CollegeSummary":
          setSummaryLevel({
            title: "College Summary",
            content: summaryData?.summary?.college,
            value: "CollegeSummary",
            audio_url: "",
            image: collegeImage,
          });
          break;
        case "PhDSummary":
          setSummaryLevel({
            title: "PhD Summary",
            content: summaryData?.summary?.phd,
            value: "PhDSummary",
            audio_url: "",
            image: phDImage,
          });
          break;
        case "ErrorSummary":
          setSummaryLevel({
            title: "Error Summary",
            content: summaryData?.summary?.error,
            value: "ErrorSummary",
            audio_url: "",
            image: errorImage,
          });
          break;
      }
      // const result = await res.json();
      const result = { data: "KKK", title: id, description: "Description" };
      return result;
    } catch (error: any) {
      return null;
    }
  };

  useEffect(() => {
    const index = speeches.findIndex(
      (speech) => pathName === "/speeches/" + speech.id
    );
    setSpeechIndex(index);
  }, [pathName]);
  useEffect(() => {
    fetchSpeeches();
    fetchSpeech();
  }, []);
  return (
    <div className="w-full flex flex-col md:flex-row justify-start md:justify-center h-full gap-4 p-1 md:p-4">
      <div className="w-full md:w-1/4 h-full">
        <AudioPlayerList />
      </div>
      <div className="w-full md:w-1/2 items-center flex flex-row justify-center h-full">
        <Card
          isBlurred
          className={`${theme === "dark" ? "bg-[#050506] border-1 border-[#3C6B99]" : "bg-[#F6F6F6]"} w-full h-full p-1`}
          shadow="lg"
        >
          <CardBody>
            <Button
              variant="light"
              isLoading={isPending}
              onPress={() => {
                startTransition(() => {
                  history.back();
                });
              }}
              className="absolute left-0 top-0"
            >
              <IoMdArrowBack size={20} />
              <span>Back</span>
            </Button>
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
                  <div className="flex flex-col gap-0 w-[90%]">
                    <p className="text-small text-foreground/80">
                      {speechType}
                    </p>
                    <h1
                      className="text-large font-medium mt-2 truncate cursor-pointer"
                      onClick={() => router.push(DOMAIN + "/results/" + postId)}
                    >
                      {title}
                    </h1>
                  </div>
                  <ShareButtons
                    className="w-full"
                    url={DOMAIN + "/speeches/" + id}
                    title={title}
                    useIcon={false}
                    // summary={result.summary.child}
                  />
                </div>

                <div className="flex flex-col mt-3 gap-1 w-full">
                  <div
                    ref={containerRef}
                    className="h-[40px] border-1 rounded-lg"
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
                      const newSpeechIndex = speechIndex - 1;
                      setSpeechIndex(newSpeechIndex);
                      const newSpeech = speeches[newSpeechIndex];
                      router.push(DOMAIN + "/speeches/" + newSpeech.id);
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
                      const newSpeechIndex = speechIndex + 1;
                      setSpeechIndex(newSpeechIndex);
                      const newSpeech = speeches[newSpeechIndex];
                      router.push(DOMAIN + "/speeches/" + newSpeech.id);
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
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-full md:w-1/4 h-full">
        <AudioPostDetail />
      </div>
    </div>
  );
}
