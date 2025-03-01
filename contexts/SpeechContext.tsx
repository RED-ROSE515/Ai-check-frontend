"use client";
import React, { createContext, useContext, useState } from "react";

interface SpeechContextType {
  speechUrl: string;
  showSpeech: boolean;
  speechId: string;
  setSpeechUrl: (url: string) => void;
  setShowSpeech: (show: boolean) => void;
  setSpeechId: (id: string) => void;
}

const SpeechContext = createContext<SpeechContextType>({
  speechUrl: "",
  showSpeech: false,
  speechId: "",
  setSpeechUrl: () => {},
  setShowSpeech: () => {},
  setSpeechId: () => {},
});

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [speechUrl, setSpeechUrl] = useState("");
  const [showSpeech, setShowSpeech] = useState(false);
  const [speechId, setSpeechId] = useState("");
  return (
    <SpeechContext.Provider
      value={{
        speechUrl,
        showSpeech,
        speechId,
        setSpeechUrl,
        setShowSpeech,
        setSpeechId,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
