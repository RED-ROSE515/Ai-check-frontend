import React, { useTransition } from "react";
import { Button } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export const RightArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M11.2497 4.16675L17.083 10.0001L11.2497 15.8334M2.91634 10.0001L16.6663 10.0001"
        stroke="white"
        strokeWidth="1.6"
      />
    </svg>
  );
};
const NerdbunnyReason = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="mt-24 flex flex-col gap-[48px]">
      <h1 className="font-bold text-lg md:text-4xl text-center my-4">
        Why You Need NerdBunny Ai Discrepancies Detection
      </h1>
      <div className="flex flex-col justify-center gap-[24px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-row justify-center gap-2 items-stretch">
            <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4">
              <strong>Tired of Rejections Due to Minor Errors?</strong>
              <span className="opacity-[.6]">
                Save time and avoid the embarrassment of re-submissions
              </span>
            </div>
            <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4">
              <strong>Worried About Overlooked Methodology Flaws?</strong>
              <span className="opacity-[.6]">
                Detect complex logical and methodological issues with AI
                precision.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-2 items-stretch">
            <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4 ">
              <strong>Struggling to Meet Journal’s Rigor Standards?</strong>
              <span className="opacity-[.6]">
                Get detailed reports on statistical and technical depth.
              </span>
            </div>
            <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4">
              <strong>Want to Validate Research Credibility?</strong>
              <span className="opacity-[.6]">
                Ensure studies are methodologically sound and data is accurate.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center card border-1 bg-transparent rounded-lg p-4">
            <div className="flex flex-col">
              <strong>Frustrated by Poorly Conducted Research?</strong>
              <span className="opacity-[.6]">
                Discover hidden flaws and inconsistencies in published papers.
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button
              isLoading={isPending}
              className={`shadow-2xl h-[46px] ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#EE43DE]"}`}
              radius="full"
              onPress={() =>
                startTransition(() => {
                  router.push("/check");
                })
              }
            >
              <strong
                className={`text-[16px] flex flex-row justify-center items-center whitespace-pre-wrap text-center font-medium leading-none tracking-tight text-white`}
              >
                {"Try it Now - It's Free"}
                <RightArrow />
              </strong>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NerdbunnyReason;
