import React from "react";
import CountdownTimer from "./CountdownTimer";
import { Image } from "@heroui/react";
import NerdbunnyLogo from "../public/nerdbunny.png";
import { useTheme } from "next-themes";

const NerdbunnyAd = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col justify-center items-center ${theme === "dark" ? "bg-black" : ""}`}
    >
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
    </div>
  );
};

export default NerdbunnyAd;
