import { useTheme } from "next-themes";

import ShineBorder from "./ui/shine-border";

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
      <ShineBorder
        borderWidth={3}
        className="relative flex w-full flex-col items-start justify-start overflow-hidden rounded-lg border bg-background md:shadow-xl px-6"
        color={["#36FF78", "#A07CFE", "#FE8FB5", "#FFBE7B", "#FFEC99"]}
      >
        <span
          className={`text-xl sm:text-2xl font-bold ${theme === "dark" ? `text-gray-100` : "text-slate-800"}`}
        >
          Major Concerns
        </span>
        {summary.major_concerns?.map((concern: string, index: number) => (
          <p
            key={index}
            className={`text-sm sm:text-medium font-semibold ${theme === "dark" ? `text-gray-400` : "text-slate-700"}`}
          >
            {concern}
          </p>
        ))}

        <span
          className={`mt-4 text-xl sm:text-2xl font-bold ${theme === "dark" ? `text-gray-100` : "text-slate-800"}`}
        >
          Improvement Priority
        </span>
        {summary.improvement_priority?.map(
          (priority: string, index: number) => (
            <p
              key={index}
              className={`text-sm sm:text-medium font-semibold ${theme === "dark" ? `text-gray-400` : "text-slate-700"}`}
            >
              {priority}
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
          className={`mt-4 w-full text-xl sm:text-2xl rounded-sm p-2 md:px-8 font-bold ${theme === "dark" ? `text-gray-100 bg-slate-700` : "text-slate-800 bg-gray-200"}`}
        >
          Total Quality Score : {summary?.quality_score} out of 10.
        </span>
      </ShineBorder>
    </div>
  );
};

export default SpecialSummary;
