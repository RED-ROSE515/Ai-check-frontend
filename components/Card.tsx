import React from "react";

interface CardProps {
  children?: React.ReactNode;
  count?: number;
  percent?: number | null;
  title?: string | null;
  outlineColor?: string;
  backgroundColor?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children = null,
  count = 0,
  percent = null,
  title = "",
  outlineColor = "#22C55E",
  backgroundColor = "transparent",
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg border-2 p-4 py-6 ${className}`}
      style={{
        borderColor: outlineColor,
        backgroundColor: backgroundColor,
      }}
    >
      <div className="flex flex-row items-center justify-start gap-2">
        <h2 className="mb-2 text-4xl font-bold text-slate-700">{count}</h2>
        {percent && <strong className="text-slate-500">({percent}%)</strong>}
      </div>
      <p className="text-slate-600">{title}</p>
      {children}
    </div>
  );
};

export default Card;
