"use client";
import React, { createContext, useContext, useState } from "react";

interface SpeechContextType {
  speechUrl: string;
  showSpeech: boolean;
  setSpeechUrl: (url: string) => void;
  setShowSpeech: (show: boolean) => void;
}

const SpeechContext = createContext<SpeechContextType>({
  speechUrl: "",
  showSpeech: false,
  setSpeechUrl: () => {},
  setShowSpeech: () => {},
});

export const SpeechProvider = ({ children }: { children: React.ReactNode }) => {
  const [speechUrl, setSpeechUrl] = useState("");
  const [showSpeech, setShowSpeech] = useState(false);

  return (
    <SpeechContext.Provider
      value={{ speechUrl, showSpeech, setSpeechUrl, setShowSpeech }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => useContext(SpeechContext);
