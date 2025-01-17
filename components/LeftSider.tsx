import React from "react";
import { ShinyButton } from "./ui/shiny-button";
import { Paper } from "@mui/material";
import logo from "../public/Logo.png";
import Image from "next/image";

const LeftSider = () => {
  return (
    <Paper
      className="flex flex-col items-center justify-start bg-zinc-200"
      style={{ height: "100vh" }}
    >
      <Image src={logo} alt="NERDBUNNY LOGO" />

      <div className="mt-8 items-center p-4 text-center">
        <h2 className="text-2xl font-bold">Instructions</h2>
        <h1 className="mt-4  text-5xl font-bold text-slate-800">
          Let's Check Your Paper!
        </h1>
        <p className="mt-4 text-lg text-slate-700">
          Just upload your paper and we'll check it for you! We'll check for
          logical, methodological, and others for you.
        </p>

        <ShinyButton className="mt-8">Learn More</ShinyButton>
      </div>
    </Paper>
  );
};

export default LeftSider;
