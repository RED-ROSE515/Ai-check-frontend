import React, { useTransition } from "react";
import { useTheme } from "next-themes";
import { DotPattern } from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@heroui/react";
import StatisticCard from "./StatisticCard";
import { useRouter } from "next/navigation";
import { Sen } from "next/font/google";
export const sen = Sen({ subsets: ["latin"] });

const LandingPage = () => {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  return (
    <div
      className="w-full relative pt-4 md:pb-20"
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
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center">
          <span className="pt-[60px] text-2xl md:text-6xl md:font-semibold text-center max-w-[75%] md:max-w-[55%]">
            Find Errors in Research Papers Effortlessly
          </span>
        </div>
        <div className="flex flex-row justify-center mt-4">
          <span className="text-sm  md:text-lg md:font-semibold text-center max-w-[70%] md:max-w-[55%]">
            Uncover hidden flaws, inconsistencies, and methodological issues
            with our AI-powered Decentralized Science (DeSci) platform, backed
            by blockchain.
          </span>
        </div>
        <div className="flex flex-row justify-center mt-6 gap-2 md:gap-8 items-center">
          <Button
            isLoading={isPending}
            className={`shadow-2xl h-[46px] ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#C8E600]"}`}
            radius="full"
            onPress={() =>
              startTransition(() => {
                router.push("/check");
              })
            }
          >
            <span
              className={`${sen.className} whitespace-pre-wrap text-center text-xs md:text-lg font-medium leading-none tracking-tight ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {"Start Free Trial"}
            </span>
          </Button>
          <Button
            isLoading={isPending}
            className={`shadow-2xl h-[46px] ${theme === "dark" ? "bg-[#FFF]" : "bg-[#000]"}`}
            radius="full"
            onPress={() =>
              startTransition(() => {
                router.push("/check");
              })
            }
          >
            <span
              className={`${sen.className} whitespace-pre-wrap text-center text-xs md:text-lg font-medium leading-none tracking-tight ${theme === "dark" ? "text-black" : "text-white"}`}
            >
              {"Try for FREE!"}
            </span>
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-10 grid w-full flex-row flex-wrap gap-6 justify-center">
        <StatisticCard />
      </div>
    </div>
  );
};

export default LandingPage;
