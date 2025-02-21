import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  PolarComponent,
  PolarComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  PolarComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | PolarComponentOption
  | TooltipComponentOption
  | BarSeriesOption
>;

const EChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    const option: EChartsOption = {
      title: [
        {
          text: "Issue Distribution",
        },
      ],
      polar: {
        radius: [30, "80%"],
      },
      radiusAxis: {
        max: 1256,
      },
      angleAxis: {
        type: "category",
        data: [
          "Writing",
          "Discrepancy",
          "Methodology",
          "Interpretation",
          "Math",
          "Figure",
        ],
        startAngle: 75,
      },
      tooltip: {},
      series: {
        type: "bar",
        data: [1256, 532, 388, 241, 180, 17],
        coordinateSystem: "polar",
        label: {
          show: true,
          position: "right",
          formatter: "{b}",
        },
      },
      animation: false,
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height: "375px" }} />;
};

export default EChart;
