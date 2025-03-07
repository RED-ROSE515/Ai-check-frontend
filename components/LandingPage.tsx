import React, { useState } from "react";
import { ShinyButton } from "./ui/shiny-button";
import { TextAnimate } from "./ui/text-animate";
import { useTheme } from "next-themes";
import { ShimmerButton } from "./magicui/shimmer-button";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import StatisticCard from "./StatisticCard";
import useDeviceCheck from "@/hooks/useDeviceCheck";
const LandingPage = () => {
  const { theme } = useTheme();
  const { isMobile } = useDeviceCheck();
  return (
    <div
      className="w-full relative pt-4 md:pb-20"
      style={{ background: "linear-gradient(0deg, #06070C 0%, #1E2A36 100%)" }}
    >
      <div className="absolute flex size-full w-full h-full items-center justify-center overflow-hidden">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            `${isMobile ? "hidden" : "[mask-image:radial-gradient(900px_circle_at_left,white,transparent)]"} `
          )}
        />
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            `${isMobile ? "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" : "[mask-image:radial-gradient(900px_circle_at_right,white,transparent)]"} `
          )}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center">
          <TextAnimate
            animation="blurIn"
            by="character"
            as="h1"
            className="text-2xl font-bold md:text-6xl md:font-semibold text-center max-w-[75%] md:max-w-[55%]"
          >
            Find Errors in Research Papers Effortlessly
          </TextAnimate>
        </div>
        <div className="flex flex-row justify-center mt-4">
          <TextAnimate
            animation="blurIn"
            by="character"
            as="h1"
            className="text-sm  md:text-lg md:font-semibold text-center max-w-[70%] md:max-w-[55%]"
          >
            Uncover hidden flaws, logical inconsistencies, and methodological
            issues with AI-powered precision. Try it for free!
          </TextAnimate>
        </div>
        <div className="flex flex-row justify-center mt-6 gap-2 md:gap-8 items-center">
          <ShimmerButton
            shimmerSize="0.2em"
            background={`${theme === "dark" ? "#C8E600" : "#EE43DE"}`}
            shimmerColor={`${theme === "dark" ? "#000" : "#FFF"}`}
            className={`shadow-2xl`}
          >
            <strong
              className={`whitespace-pre-wrap text-center text-xs md:text-lg font-medium leading-none tracking-tight ${theme === "dark" ? "text-black" : "text-white"}`}
            >
              {"Start Free Trial"}
            </strong>
          </ShimmerButton>
          <ShimmerButton className={`shadow-2xl`} shimmerSize="0.2em">
            <strong
              className={`whitespace-pre-wrap text-center text-xs md:text-lg font-medium leading-none tracking-tight `}
            >
              {"Try For FREE!"}
            </strong>
          </ShimmerButton>
        </div>
      </div>
      <div className="mx-auto mt-10 grid w-full flex-row flex-wrap gap-6 justify-center">
        <StatisticCard />
      </div>
    </div>
  );
};

export default LandingPage;
