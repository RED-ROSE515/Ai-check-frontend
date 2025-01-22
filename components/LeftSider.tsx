import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Card, CardHeader, CardBody } from "@heroui/card";

import logoDark from "../public/LogoLime.png";
import logoWhite from "../public/LogoPurple.png";

import { ShinyButton } from "./ui/shiny-button";

const LeftSider = ({ onUpload }: any) => {
  const { theme } = useTheme();

  return (
    <Card className="">
      <CardHeader className="flex items-center justify-center">
        {theme === "dark" ? (
          <Image priority alt="NERDBUNNY LOGO" src={logoDark} />
        ) : (
          <Image priority alt="NERDBUNNY LOGO" src={logoWhite} />
        )}
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-start h-screen">
        <div className="px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold">Instructions</h2>
          <h1
            className={`mt-4 text-4xl md:text-5xl font-bold ${theme === "dark" ? `text-gray-200` : `text-slate-800`} font-fantasy`}
          >
            Let&apos;s Check Your Paper!
          </h1>
          <p className="mt-4 text-base md:text-md text-slate-700">
            Just upload your paper and we&apos;ll check it for you! We&apos;ll
            check for logical, methodological, and others for you.
          </p>

          <ShinyButton className="mt-8 bg-[#C8E600]" onClick={onUpload}>
            Upload
          </ShinyButton>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeftSider;
