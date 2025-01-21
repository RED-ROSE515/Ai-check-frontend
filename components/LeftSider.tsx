import React from "react";
import { ShinyButton } from "./ui/shiny-button";
import logo from "../public/Logo.png";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
const LeftSider = () => {
  return (
    <Card className="">
      <CardHeader className="flex items-center justify-center">
        <Image src={logo} alt="NERDBUNNY LOGO" priority />
      </CardHeader>
      <CardBody className="flex flex-col items-center justify-start h-screen">
        <div className="px-4 md:px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold">Instructions</h2>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-800">
            Let&apos;s Check Your Paper!
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-700">
            Just upload your paper and we&apos;ll check it for you! We&apos;ll
            check for logical, methodological, and others for you.
          </p>

          <ShinyButton className="mt-8">Learn More</ShinyButton>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeftSider;
