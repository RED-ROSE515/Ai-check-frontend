"use client";
import React, { createContext, useContext, useState } from "react";

export interface Speech {
  id: string;
  post_id: string;
  post_title: string;
  user_id: string;
  speech_type: string;
  voice_type: string;
  audio_url: string;
  cost: number;
  status: number;
  created_at: string;
}

interface SpeechContextType {
  speechUrl: string;
  showSpeech: boolean;
  speechId: string;
  speechTitle: string;
  speechType: string;
  speechPosts: Speech[];
  currentPostId: string;
  currentSummaryType: string;
  currentVoice: string;
  listenedSpeeches: string[];
  isPlaying: boolean;
  percentage: number;
  speechList: any;
  showIndex: number;
  setSpeechUrl: (url: string) => void;
  setSpeechPosts: (value: Speech[]) => void;
  setSpeechType: (type: string) => void;
  setShowSpeech: (show: boolean) => void;
  setSpeechId: (id: string) => void;
  setSpeechTitle: (title: string) => void;
  setCurrentPostId: (id: string) => void;
  setCurrentSummaryType: (type: string) => void;
  setCurrentVoice: (voice: string) => void;
  setListenedSpeeches: (speeches: string[]) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPercentage: (percentage: number) => void;
  setSpeechList: (list: any) => void;
  setShowIndex: (index: number) => void;
}

const SpeechContext = createContext<SpeechContextType>({
  speechUrl: "",
  showSpeech: false,
  speechId: "",
  speechTitle: "",
  speechType: "",
  speechPosts: [],
  speechList: [],
  currentPostId: "",
  currentSummaryType: "",
  currentVoice: "",
  listenedSpeeches: [],
  isPlaying: false,
  percentage: 0,
  showIndex: 0,
  setSpeechList: () => {},
  setPercentage: () => {},
  setSpeechPosts: () => {},
  setSpeechUrl: () => {},
  setSpeechType: () => {},
  setShowSpeech: () => {},
  setSpeechId: () => {},
  setSpeechTitle: () => {},
  setCurrentPostId: () => {},
  setCurrentSummaryType: () => {},
  setCurrentVoice: () => {},
  setListenedSpeeches: () => {},
  setIsPlaying: () => {},
  setShowIndex: () => {},
});

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [speechPosts, setSpeechPosts] = useState<Speech[]>([]);
  const [currentPostId, setCurrentPostId] = useState("");
  const [currentSummaryType, setCurrentSummaryType] = useState("");
  const [showIndex, setShowIndex] = useState<number>(0);
  const [currentVoice, setCurrentVoice] = useState("");
  const [speechUrl, setSpeechUrl] = useState("");
  const [speechType, setSpeechType] = useState("");
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechId, setSpeechId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [speechTitle, setSpeechTitle] = useState("");
  const [listenedSpeeches, setListenedSpeeches] = useState<string[]>([]);
  const [speechList, setSpeechList] = useState<any>([]);
  return (
    <SpeechContext.Provider
      value={{
        speechUrl,
        showSpeech,
        speechId,
        speechTitle,
        speechType,
        speechPosts,
        currentPostId,
        currentSummaryType,
        currentVoice,
        listenedSpeeches,
        isPlaying,
        percentage,
        speechList,
        showIndex,
        setPercentage,
        setSpeechUrl,
        setSpeechPosts,
        setShowSpeech,
        setSpeechType,
        setSpeechId,
        setSpeechTitle,
        setCurrentPostId,
        setCurrentSummaryType,
        setCurrentVoice,
        setListenedSpeeches,
        setIsPlaying,
        setSpeechList,
        setShowIndex,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
