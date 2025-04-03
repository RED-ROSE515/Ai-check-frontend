import React from "react";
import CountdownTimer from "./CountdownTimer";
import { Image } from "@heroui/react";
import NerdbunnyLogo from "../public/nerdbunny.png";
import { useTheme } from "next-themes";
import { ShinyButton } from "./ui/shiny-button";
const NerdbunnyAd = () => {
  const { theme } = useTheme();
  return (
    <div className={`flex flex-col justify-center items-center`}>
      <div className="w-[75vw] mt-4 relative flex-row justify-center items-center hidden md:flex">
        <div className="w-[10vw]">
          <Image
            className="rounded-full"
            src={NerdbunnyLogo.src}
            alt="NerdBunny Logo"
          />
        </div>
      </div>
      <strong className="mt-6 mb-4 text-2xl">NerdBunny Presale</strong>

      <CountdownTimer />
      <ShinyButton
        className={`mt-4 ${theme === "dark" ? "bg-[#EE43DE]" : "bg-[#EE43DE]"} mb-4 md:mb-0`}
        onClick={() => {
          window.open(
            "https://www.pinksale.finance/solana/launchpad/9nGxugiraXuaUkx5MUdgG4hY1CKnsPXAf9TvaWddDDcV",
            "_blank"
          );
        }}
      >
        <strong className="font-bold text-lg">{"JOIN THE PRE-SALE"}</strong>
      </ShinyButton>
    </div>
  );
};

export default NerdbunnyAd;
