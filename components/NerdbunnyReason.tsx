import React from "react";
import { Button } from "@heroui/react";

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
  return (
    <div className="mt-4">
      <h1 className="text-lg md:text-4xl text-center my-4">
        Why You Need NerdBunny Ai Error Detection
      </h1>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex flex-row justify-center gap-2 items-stretch">
          <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4">
            <strong>Tired of Rejections Due to Minor Errors?</strong>
            <span>Save time and avoid the embarrassment of re-submissions</span>
          </div>
          <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4">
            <strong>Worried About Overlooked Methodology Flaws?</strong>
            <span>
              Detect complex logical and methodological issues with AI
              precision.
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2 items-stretch">
          <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4 ">
            <strong>Struggling to Meet Journal’s Rigor Standards?</strong>
            <span>
              Get detailed reports on statistical and technical depth.
            </span>
          </div>
          <div className="flex flex-col card border-1 w-1/2 flex-1 h-auto bg-transparent rounded-lg p-4">
            <strong>Want to Validate Research Credibility?</strong>
            <span>
              Ensure studies are methodologically sound and data is accurate.
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center card border-1 bg-transparent rounded-lg p-4">
          <div className="flex flex-col">
            <strong>Frustrated by Poorly Conducted Research?</strong>
            <span>
              Discover hidden flaws and inconsistencies in published papers.
            </span>
          </div>
          <Button color="primary" variant="bordered" className="rounded-full">
            <span className="flex flex-row justify-center">
              Try it Now - It's Free
              <RightArrow />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NerdbunnyReason;
