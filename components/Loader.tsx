import React from "react";
import { cn } from "@heroui/react";
const Loader = ({ className }: any) => {
  return (
    <div className={cn("w-full flex flex-row justify-center", className)}>
      <div className="spinner">
        <div className="spinner1" />
      </div>
    </div>
  );
};

export default Loader;
