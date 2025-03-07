import { useTheme } from "next-themes";
import { Card } from "@heroui/react";
import ShineBorder from "./ui/shine-border";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

interface SpecialSummaryProps {
  total_errors: number;
  major_concerns: string[];
  improvement_priority: string[];
  overall_assessment: string;
  quality_score: number;
}

const SpecialSummary = ({ summary }: any) => {
  const { theme } = useTheme();

  return (
    <div className="mt-2 w-full p-0">
      <Card
        // borderWidth={3}
        className="relative flex w-full flex-col items-start justify-start overflow-hidden rounded-lg border md:shadow-xl p-6"
        // color={["#36FF78", "#A07CFE", "#FE8FB5", "#FFBE7B", "#FFEC99"]}
      >
        <span
          className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? `text-white` : "text-slate-800"} mb-2`}
        >
          Major Concerns
        </span>
        {summary.major_concerns?.map((concern: string, index: number) => (
          <span
            key={index}
            className={`flex flex-row justify-start items-center gap-2 text-sm sm:text-medium ${theme === "dark" ? `text-[#AAB5C7]` : "text-slate-700"}`}
          >
            <FaCheckCircle />
            <p>{concern}</p>
          </span>
        ))}

        <span
          className={`mt-4 mb-2 text-xl sm:text-2xl font-bold ${theme === "dark" ? `text-gray-100` : "text-slate-800"}`}
        >
          Improvement Priority
        </span>
        {summary.improvement_priority?.map(
          (priority: string, index: number) => (
            <p
              key={index}
              className={`flex flex-row justify-start items-center gap-2 text-sm sm:text-medium font-semibold ${theme === "dark" ? `text-[#AAB5C7]` : "text-slate-700"}`}
            >
              <FaCheckCircle />
              <p>{priority}</p>
            </p>
          )
        )}

        <span
          className={`mt-4 text-xl sm:text-2xl font-bold ${theme === "dark" ? `text-gray-100` : "text-slate-800"}`}
        >
          Overall Assessment
        </span>
        <p
          className={`text-sm sm:text-medium font-semibold ${theme === "dark" ? `text-gray-400` : "text-slate-700"}`}
        >
          {summary?.overall_assessment}
        </p>

        <span
          className={`mt-4 w-full text-xl sm:text-2xl rounded-sm p-2 md:px-8 font-bold ${theme === "dark" ? `text-gray-100 bg-[#613CB1]` : "text-slate-800 bg-gray-200"}`}
        >
          Total Quality Score : {summary?.quality_score} out of 10.
        </span>
      </Card>
    </div>
  );
};

export default SpecialSummary;
