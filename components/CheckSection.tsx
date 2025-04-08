import React from "react"

import { useState } from "react"
import { GiArchiveResearch } from "react-icons/gi"
import { GrArticle } from "react-icons/gr"
import { MdPlagiarism } from "react-icons/md"
import PaperInputWrapper from "./PaperInputWrapper"
import { useTheme } from "next-themes"
import { useAnalyze } from "@/contexts/AnalyzeContext"
import { useSearch } from "@/contexts/SearchContext"
const CheckSection = () => {
  const { setProcessType, processType } = useAnalyze()
  const { theme } = useTheme()
  const { getTotalResults } = useSearch()
  const tabs = [
    {
      id: "ResearchCheck",
      label: "Analyse Manuscript",
      icon: (
        <GiArchiveResearch
          className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-pink-500"}`}
        />
      ),
      title: "Research & Analytics",
      content:
        "Our AI agent analyzes the research paper and provides a report with the percentage of errors and discrepancies.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "GenerateArticle",
      label: "Summarise Manuscript",
      icon: (
        <GrArticle
          className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-slate-400"}`}
        />
      ),
      title: "Summary and Articles",
      content:
        "Our AI agent creates summaries and articles from academic papers, making complex research accessible to everyone.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "PlagiarismCheck",
      label: "Plagiarism Check",
      icon: (
        <MdPlagiarism
          className={`h-8 w-8 ${theme === "dark" ? "text-white" : "text-slate-400"}`}
        />
      ),
      title: "Plagiarism Check",
      content:
        "We check for plagiarism in the research paper and provide a report with the percentage of plagiarism.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div
      className={`w-full mx-auto ${theme === "dark" ? "bg-[#090E16]" : "bg-white"} rounded-lg shadow-sm overflow-hidden z-10`}
    >
      <div className="p-6 border-b-2">
        <h2
          className={`text-2xl font-medium text-center ${theme === "dark" ? "text-gray-200" : "text-gray-700"} `}
        >
          Analyze a Research Paper
        </h2>
        <p className="text-sm my-2">
          Submit research papers that matter to you—whether they’re trending in
          your field, influencing public conversations, or raising important
          questions.NerdBunny helps uncover inconsistencies, flawed reasoning,
          or methodological issues and publishes the results for open community
          review.
        </p>
      </div>
      {/* Tabs */}
      <div
        className={`grid grid-cols-3 border-b ${theme === "dark" ? "border-[#090E16] bg-slate-800" : "border-gray-100"}`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setProcessType(tab.id)
              if (tab.id !== "PlagiarismCheck") getTotalResults(tab.id)
            }}
            className={`flex flex-col items-center justify-center z-10 p-4 transition-colors ${
              processType === tab.id
                ? ` border-b-3 ${theme === "dark" ? "bg-transparent border-[#C8E600]" : "bg-white border-pink-500"}`
                : ` ${theme === "dark" ? "hover:bg-gray-700 bg-[#090E16]" : "bg-gray-50 hover:bg-gray-100"}`
            }`}
          >
            <div className="mb-2">
              {React.cloneElement(tab.icon, {
                className: `h-8 w-8 ${processType === tab.id ? (theme === "dark" ? "text-[#C8E600]" : "text-pink-500") : "text-slate-400"}`,
              })}
            </div>
            <span
              className={`text-sm ${processType === tab.id ? (theme === "dark" ? "text-[#C8E600]" : "text-pink-500") : "text-slate-400"}`}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      {/* Content */}
      {(processType === "ResearchCheck" ||
        processType === "GenerateArticle") && (
        <div className={`p-8`}>
          <div className="flex flex-col md:flex-row items-center w-full gap-8">
            <PaperInputWrapper getPdfList={() => {}} />
          </div>
        </div>
      )}
      {processType === "PlagiarismCheck" && (
        <div className={`p-8`}>
          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8">
            <p className="text-2xl font-bold text-center p-16">
              Comming Soon...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckSection
