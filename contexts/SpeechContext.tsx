"use client";
import React, { createContext, useContext, useState } from "react";

interface SpeechContextType {
  speechUrl: string;
  showSpeech: boolean;
  speechId: string;
  speechTitle: string;
  speechType: string;
  setSpeechUrl: (url: string) => void;
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
  setSpeechUrl: () => {},
  setSpeechType: () => {},
  setShowSpeech: () => {},
  setSpeechId: () => {},
  setSpeechTitle: () => {},
});

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
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
        setSpeechUrl,
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
