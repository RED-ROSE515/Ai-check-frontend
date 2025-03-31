import React from "react";
import { useTheme } from "next-themes";
import useDeviceCheck from "@/hooks/useDeviceCheck";
import { useRouter } from "next/navigation";
import { Sen } from "next/font/google";
import { Image } from "@heroui/react";
import tokenomics from "../public/TokenAllocation.png";
export const sen = Sen({ subsets: ["latin"] });

const Tokenomics = () => {
  const { theme } = useTheme();
  const { isMobile } = useDeviceCheck();
  const router = useRouter();
  return (
    <div
      className={`flex flex-col justify-center ${theme === "dark" ? "bg-[#6365F1]" : "bg-[#2E3E4E]"} rounded-xl relative gap-2 md:gap-6 mb-4`}
    >
      <Image src={tokenomics.src} alt="tokenomics" />
    </div>
  );
};

export default Tokenomics;
