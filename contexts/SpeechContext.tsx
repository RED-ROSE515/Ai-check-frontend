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
  speeches: Speech[];
  setSpeechUrl: (url: string) => void;
  setSpeeches: (value: Speech[]) => void;
  setSpeechType: (type: string) => void;
  setShowSpeech: (show: boolean) => void;
  setSpeechId: (id: string) => void;
  setSpeechTitle: (title: string) => void;
}

const SpeechContext = createContext<SpeechContextType>({
  speechUrl: "",
  showSpeech: false,
  speechId: "",
  speechTitle: "",
  speechType: "",
  speeches: [],
  setSpeeches: () => {},
  setSpeechUrl: () => {},
  setSpeechType: () => {},
  setShowSpeech: () => {},
  setSpeechId: () => {},
  setSpeechTitle: () => {},
});

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [speechUrl, setSpeechUrl] = useState("");
  const [speechType, setSpeechType] = useState("");
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechId, setSpeechId] = useState("");
  const [speechTitle, setSpeechTitle] = useState("");
  return (
    <SpeechContext.Provider
      value={{
        speechUrl,
        showSpeech,
        speechId,
        speechTitle,
        speechType,
        speeches,
        setSpeechUrl,
        setSpeeches,
        setShowSpeech,
        setSpeechType,
        setSpeechId,
        setSpeechTitle,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
