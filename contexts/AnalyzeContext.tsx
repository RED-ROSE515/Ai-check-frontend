"use client"
import React, { createContext, useContext, useState } from "react"
import axios from "axios"
import { sleep } from "@/components/file-upload"
import { useToast } from "@/hooks/use-toast"
import { useLoading } from "@/contexts/ProgressContext"
import { ToastAction } from "@/components/ui/toast"
import api from "@/utils/api"

interface AnalyzeContextType {
  analysisResult: string
  summary: any
  totalSummary: string
  summaryLoading: boolean
  checkLoading: boolean
  isChecking: boolean
  processType: string
  postId: string
  setPostId: (postId: string) => void
  setProcessType: (processType: string) => void
  handleAnalyze: (
    s3_url: string,
    shower_type: string,
    shower_ids: Option[],
    analyzeOption?: string[],
    summaryOption?: string,
    advancedMethods?: string[],
    citation?: string
  ) => Promise<void>
  resetState: () => void
}

export interface Option {
  value: string
  label: string
  disable?: boolean
  avatar: string
  /** fixed option that can't be removed. */
  fixed?: boolean
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined
}

const AnalyzeContext = createContext<AnalyzeContextType>({
  analysisResult: "",
  summary: "",
  totalSummary: "",
  summaryLoading: false,
  checkLoading: false,
  isChecking: false,
  processType: "",
  postId: "",
  setPostId: () => {},
  setProcessType: () => {},
  handleAnalyze: async () => {},
  resetState: () => {},
})

export const AnalyzeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [analysisResult, setAnalysisResult] = useState("")
  const [summary, setSummary] = useState("")
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [totalSummary, setTotalSummary] = useState("")
  const [postId, setPostId] = useState("")
  const [processType, setProcessType] = useState("ResearchCheck")
  const { setLoading, setProgress } = useLoading()
  const { toast } = useToast()

  const resetState = () => {
    setAnalysisResult("")
    setSummary("")
    setProcessType("")
    setTotalSummary("")
    setSummaryLoading(false)
    setCheckLoading(false)
    setIsChecking(false)
  }

  const handleAnalyze = async (
    s3_url: string,
    shower_type: string,
    shower_ids: Option[],
    analyzeOption?: string[],
    summaryOption?: string,
    advancedMethods?: string[],
    citation?: string
  ) => {
    try {
      setLoading(true)
      setProgress(0)
      await toast({
        title: "Queued for Processing",
        description:
          "Your file has been uploaded and is now in the queue for AI analysis.",
        duration: 2000,
      })
      await sleep(2000)
      await toast({
        title: "Processing Started",
        description: "Processing now... This may take up to 5 minutes.",
        duration: 2000,
      })
      await sleep(2000)

      setSummary("")
      setAnalysisResult("")
      setIsChecking(true)
      setSummaryLoading(true)
      const new_shower_ids = shower_ids.map((id) => id.value)
      const response = await api.post(`post/create`, {
        post_type: 6,
        attached_links: [s3_url],
        process_type: analyzeOption,
        summary_type: summaryOption,
        advanced_methods: advancedMethods,
        citation_format: citation,
        shower_type:
          shower_type === "specific_users"
            ? 0
            : shower_type === "followers"
              ? 1
              : shower_type === "everyone"
                ? 2
                : 3,
        shower_ids: shower_type === "specific_users" ? new_shower_ids : [],
      })

      let currentProgress = 0
      const checkStatus = async () => {
        const pendingResponse = await api.get("post/pending")
        const isPending =
          pendingResponse.data && pendingResponse.data.length > 0

        if (!isPending) {
          clearInterval(progressInterval)
          clearInterval(statusInterval)
          setProgress(100)
          setIsChecking(false)
          setSummaryLoading(false)
          setCheckLoading(false)
          setPostId(response.data.id)
          await toast({
            title: "Processing Complete",
            description:
              "Analysis complete for uploaded paper! Click here to view results.",
            action: (
              <ToastAction
                altText="View Result"
                onClick={() =>
                  window.open(
                    processType.includes("ResearchCheck")
                      ? "/results/discrepancies/" + response.data.id
                      : "/results/articles/" + response.data.id,
                    "_blank"
                  )
                }
              >
                View
              </ToastAction>
            ),
            duration: 5000,
          })
        }
      }

      // Progress update interval
      const progressInterval = setInterval(() => {
        currentProgress += 0.1
        setProgress(Math.min(currentProgress, 99))

        if (currentProgress.toFixed(1) === "25.0") {
          toast({
            title: "Processing at 25%",
            description: "Analyzing text and structure of paper.",
            duration: 5000,
          })
        }
        if (currentProgress.toFixed(1) === "50.0") {
          toast({
            title: "Processing at 50%",
            description:
              "Checking for inconsistencies and potential errors in paper.",
            duration: 5000,
          })
        }
        if (currentProgress.toFixed(1) === "75.0") {
          toast({
            title: "Processing at 75%",
            description:
              "Verifying results and generating final report for paper.",
            duration: 5000,
          })
        }
      }, 500) // Update progress every 3 seconds

      // Status check interval
      const statusInterval = setInterval(checkStatus, 10000) // Check status every 10 seconds

      // Cleanup intervals after 10 minutes (600000ms) if not completed
      setTimeout(() => {
        clearInterval(progressInterval)
        clearInterval(statusInterval)
        resetState()
        if (currentProgress < 100) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Processing timeout. Please try again later.",
            duration: 5000,
          })
        }
      }, 600000)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.response?.data.message || "Something went wrong!",
          duration: 1000,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnalyzeContext.Provider
      value={{
        analysisResult,
        summary,
        totalSummary,
        summaryLoading,
        checkLoading,
        postId,
        isChecking,
        processType,
        setPostId,
        setProcessType,
        handleAnalyze,
        resetState,
      }}
    >
      {children}
    </AnalyzeContext.Provider>
  )
}

export const useAnalyze = () => useContext(AnalyzeContext)
