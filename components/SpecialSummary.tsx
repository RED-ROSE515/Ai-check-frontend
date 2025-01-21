import ShineBorder from "./ui/shine-border";

interface SpecialSummaryProps {
  total_errors: number;
  major_concerns: string[];
  improvement_priority: string[];
  overall_assessment: string;
  quality_score: number;
}

const SpecialSummary = ({ summary }: any) => {
  return (
    <div className="mt-2 w-full p-0 md:p-6">
      <ShineBorder
        className="relative flex w-full flex-col items-start justify-start overflow-hidden rounded-lg border bg-background md:shadow-xl"
        color={["#36FF78", "#A07CFE", "#FE8FB5", "#FFBE7B", "#FFEC99"]}
        borderWidth={5}
      >
        <span className="text-2xl font-bold text-slate-800 ">
          Major Concerns
        </span>
        {summary.major_concerns?.map((concern: string, index: number) => (
          <p className="font-semibold text-slate-700" key={index}>
            {concern}
          </p>
        ))}

        <span className="mt-4 text-2xl font-bold text-slate-800">
          Improvement Priority
        </span>
        {summary.improvement_priority?.map(
          (priority: string, index: number) => (
            <p className="font-semibold text-slate-700" key={index}>
              {priority}
            </p>
          )
        )}

        <span className="mt-4 text-2xl font-bold text-slate-800">
          Overall Assessment
        </span>
        <p className="font-semibold text-slate-700">
          {summary?.overall_assessment}
        </p>

        <span className="mt-4 text-2xl font-bold text-slate-800">
          Total Quality Score : {summary?.quality_score}
        </span>
      </ShineBorder>
    </div>
  );
};

export default SpecialSummary;
