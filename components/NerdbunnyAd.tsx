import React from "react";
import CountdownTimer from "./CountdownTimer";
import { Image } from "@heroui/react";
import NerdbunnyAdBanner from "../public/nerdbunny-ad-banner.jpeg";
import NerdbunnyLogo from "../public/nerdbunny.png";
import { useTheme } from "next-themes";

const NerdbunnyAd = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col justify-center p-4 items-center ${theme === "dark" ? "bg-black" : ""}`}
    >
      <div className="w-[75vw] relative items-center">
        <Image src={NerdbunnyAdBanner.src} alt="NerdBunny Banner" />
        <div
          className="w-[10vw] absolute "
          style={{ left: `32.5vw`, bottom: `-5vw` }}
        >
          <Image
            className="rounded-full"
            src={NerdbunnyLogo.src}
            alt="NerdBunny Logo"
          />
        </div>
      </div>
      <strong className="mt-[6vw] mb-4 text-2xl">NerdBunny AI Presale</strong>

      <CountdownTimer />
    </div>
  );
};

export default NerdbunnyAd;
