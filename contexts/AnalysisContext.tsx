"use client";
import React, { createContext, useState, useContext } from "react";

type AnalysisContextType = {
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;
};

export const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <AnalysisContext.Provider value={{ isAnalyzing, setIsAnalyzing }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
