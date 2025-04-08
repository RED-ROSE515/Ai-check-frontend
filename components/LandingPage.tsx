import React, { useTransition } from "react"
import { useTheme } from "next-themes"
import { DotPattern } from "./magicui/dot-pattern"
import { cn } from "@/lib/utils"
import { Button } from "@heroui/react"
import { useRouter } from "next/navigation"
import { Sen } from "next/font/google"
import NerdbunnyAd from "./NerdbunnyAd"
import StatisticCard from "./StatisticCard"
import { useAnalyze } from "@/contexts/AnalyzeContext"
import ListSection from "./ListSection"
export const sen = Sen({ subsets: ["latin"] })

const LandingPage = ({ isHome = true }: { isHome?: boolean }) => {
  const { theme } = useTheme()
  const [isPending, startTransition] = useTransition()
  const { processType } = useAnalyze()
  const router = useRouter()
  return (
    <div
      className="w-full relative pt-4 pb-4 md:pb-20"
      style={{
        background: `${theme === "dark" ? "linear-gradient(0deg, #06070C 0%, #1E2A36 100%)" : "linear-gradient(0deg, #FFFFFF 0%, #F7F7F7 100%)"}`,
      }}
    >
      <div className="absolute flex size-full w-full h-full items-center justify-center overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            `${"[mask-image:radial-gradient(1500px_circle_at_left,white,transparent)]"} `
          )}
        />
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            `${"[mask-image:radial-gradient(1500px_circle_at_right,white,transparent)]"} `
          )}
        />
      </div>
      <NerdbunnyAd />

      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center">
          <span className="md:pt-[60px] text-2xl md:text-6xl md:font-semibold text-center max-w-[75%] md:max-w-[60%] text-balance">
            Find inconsistencies in Research Papers Effortlessly
          </span>
        </div>
        <div className="flex flex-row justify-center mt-4">
          <span className="text-sm  md:text-lg md:font-semibold text-center max-w-[70%] md:max-w-[55%]">
            Uncover hidden flaws, discrepancies, and methodological issues with
            our AI-powered Decentralized Science (DeSci) platform, backed by
            blockchain.
          </span>
        </div>
        <div className="flex flex-row justify-center mt-6 gap-2 md:gap-8 items-center">
          <Button
            isLoading={isPending}
            className={`shadow-2xl w-[200px] h-[46px] ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#EE43DE]"}`}
            radius="full"
            onPress={() =>
              startTransition(() => {
                router.push("/check")
              })
            }
          >
            <span
              className={`${sen.className} whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-tight ${theme === "dark" ? "text-white" : "text-white"}`}
            >
              {"Try for FREE!"}
            </span>
          </Button>
        </div>
      </div>
      {processType.includes("ResearchCheck") && (
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <StatisticCard />
        </div>
      )}
      {isHome && (
        <div className="w-full flex flex-col justify-center items-center mt-4">
          <div className="w-full md:w-[1100px] hidden md:flex flex-col justify-center items-center mt-4">
            <ListSection />
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
