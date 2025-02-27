import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Select, SelectItem } from "@heroui/react";

type EChartsOption = echarts.EChartsOption;
type ChartType = "issue" | "speed" | "cost" | "paper";

// Add new type for chart data
type DataPoint = [number, number];

const generateCostData = () => {
  return Array.from({ length: 150 }, () => {
    let tokens;
    let cost;
    const isConcentrated = Math.random() < 0.7;

    if (isConcentrated) {
      tokens = 100000 + Math.random() * 40000;
      const baseCost = 0.8 * (tokens / 120000);
      cost = baseCost + (Math.random() - 0.5) * 0.1;
      cost = Math.max(0.7, Math.min(0.9, cost));
    } else {
      tokens = 7500 + Math.random() * (215802 - 7500);
      const baseCost = 0.8 * (tokens / 120000);
      cost = baseCost + (Math.random() - 0.5) * 0.2;
      cost = Math.max(0.3, Math.min(1.8, cost));
    }

    return [Math.floor(tokens), Number(cost.toFixed(2))];
  });
};

// Add speed data generation function
const generateSpeedData = (): DataPoint[] => {
  return Array.from({ length: 150 }, () => {
    let tokens: number;
    let speed: number;
    const isConcentrated = Math.random() < 0.7;

    if (isConcentrated) {
      // Concentrated area: [100000-140000] tokens, [140-180] seconds
      tokens = 100000 + Math.random() * 40000;
      const baseSpeed = 160 + (Math.random() - 0.5) * 40; // Center around 160s
      speed = Math.max(140, Math.min(180, baseSpeed));
    } else {
      // Wider distribution
      tokens = 7500 + Math.random() * (215802 - 7500);
      const baseSpeed = 160 * (tokens / 120000);
      speed = baseSpeed + (Math.random() - 0.5) * 60;
      speed = Math.max(60, Math.min(300, speed));
    }

    return [Math.floor(tokens), Math.floor(speed)];
  });
};

const getPaperData = (type: string) => {
  switch (type) {
    case "preprint":
      return {
        name: "Preprint Platform Distribution",
        data: [
          { value: 50, name: "arXiv" },
          { value: 20, name: "bioRxiv" },
          { value: 10, name: "medRxiv" },
          { value: 15, name: "SSRN" },
          { value: 5, name: "Others (e.g., ChemRxiv)" },
        ],
      };
    case "access":
      return {
        name: "Open Access vs. Subscription",
        data: [
          { value: 40, name: "Open Access" },
          { value: 60, name: "Subscription-Based" },
        ],
      };
    case "region":
      return {
        name: "Geographic Region Distribution",
        data: [
          { value: 45, name: "Asia-Pacific" },
          { value: 25, name: "North America" },
          { value: 20, name: "Europe" },
          { value: 7, name: "Latin America & Africa" },
          { value: 3, name: "Middle East" },
        ],
      };
    case "publication":
      return {
        name: "Publication Type Distribution",
        data: [
          { value: 75, name: "Peer-Reviewed Journal Articles" },
          { value: 12, name: "Conference Proceedings" },
          { value: 8, name: "Preprints" },
          { value: 4, name: "Books & Book Chapters" },
          { value: 1, name: "Technical Reports & Theses" },
        ],
      };
    case "scientific":
      return {
        name: "Scientific Field Distribution",
        data: [
          { value: 35, name: "Biomedical & Health Sciences" },
          { value: 18, name: "Engineering & Technology" },
          { value: 13, name: "Physical Sciences" },
          { value: 13, name: "Social Sciences" },
          { value: 13, name: "Life Sciences" },
          { value: 8, name: "Mathematics & Formal Sciences" },
          { value: 5, name: "Humanities & Arts" },
        ],
      };
  }
};

// Update the type definition at the top of the file
interface ChartData {
  category: string;
  sort: string;
  type: string;
  back: string;
  whiteback: string;
  count: number;
}

// Update getIssueChartOptions to accept data
const getIssueChartOptions = (issuesData?: ChartData[]): EChartsOption => {
  // Use default data if no data is provided
  const defaultData = [
    { category: "Technical", count: 1571 },
    { category: "Writing", count: 384 },
    { category: "Methodology", count: 371 },
    { category: "Logical", count: 344 },
    { category: "Data", count: 256 },
    { category: "Research", count: 392 },
  ];

  const data = issuesData || defaultData;

  return {
    title: [{ text: "Issue Distribution" }],
    polar: { radius: [30, "80%"] },
    radiusAxis: {
      max: Math.max(...data.map((item) => item.count)),
    },
    angleAxis: {
      type: "category",
      data: data.map((item) => item.category),
      startAngle: 75,
    },
    tooltip: {},
    series: {
      type: "bar",
      data: data.map((item) => item.count),
      coordinateSystem: "polar",
      label: {
        show: false,
        position: "right",
        formatter: "{b}",
      },
    },
    animation: true,
  };
};

const getCostChartOptions = (costData: any[]): EChartsOption => ({
  title: { text: "Research Audit Cost Distribution" },
  grid: {
    left: "3%",
    right: "7%",
    bottom: "7%",
    containLabel: true,
  },
  tooltip: {
    showDelay: 0.5,
    formatter: (params: any) => {
      return params.value.length > 1
        ? `${params.value[0]} tokens : $${params.value[1]}`
        : `${params.name} : $${params.value}`;
    },
    axisPointer: {
      show: true,
      type: "cross",
      lineStyle: { type: "dashed", width: 1 },
    },
  },
  toolbox: {
    feature: {
      dataZoom: {},
      brush: {
        type: ["rect", "polygon", "clear"],
      },
    },
  },
  brush: {},
  xAxis: [
    {
      type: "value",
      scale: true,
      axisLabel: { formatter: "{value} tokens" },
      splitLine: { show: false },
    },
  ],
  yAxis: [
    {
      type: "value",
      scale: true,
      axisLabel: { formatter: "$ {value}" },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: "Cost Distribution",
      type: "scatter",
      emphasis: { focus: "series" },
      data: costData,
      markArea: {
        silent: true,
        itemStyle: {
          color: "transparent",
          borderWidth: 1,
          borderType: "dashed",
        },
        data: [
          [
            { name: "Cost Data Range", xAxis: "min", yAxis: "min" },
            { xAxis: "max", yAxis: "max" },
          ],
        ],
      },
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
      markLine: {
        lineStyle: { type: "solid" },
        data: [{ type: "average", name: "Average" }, { xAxis: 0.8 }],
      },
    },
  ],
});

const getPaperChartOptions = (paperData: any): EChartsOption => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: "5%",
    left: "center",
  },
  series: [
    {
      name: paperData.name,
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: paperData.data,
    },
  ],
});

// Add speed chart options
const getSpeedChartOptions = (speedData: DataPoint[]): EChartsOption => ({
  title: { text: "Research Analysis Speed Distribution" },
  grid: {
    left: "3%",
    right: "7%",
    bottom: "7%",
    containLabel: true,
  },
  tooltip: {
    showDelay: 0.5,
    formatter: (params: any) => {
      return params.value.length > 1
        ? `${params.value[0]} tokens : ${params.value[1]}s`
        : `${params.name} : ${params.value}s`;
    },
    axisPointer: {
      show: true,
      type: "cross",
      lineStyle: { type: "dashed", width: 1 },
    },
  },
  toolbox: {
    feature: {
      dataZoom: {},
      brush: {
        type: ["rect", "polygon", "clear"],
      },
    },
  },
  brush: {},
  xAxis: [
    {
      type: "value",
      scale: true,
      axisLabel: { formatter: "{value} tokens" },
      splitLine: { show: false },
    },
  ],
  yAxis: [
    {
      type: "value",
      scale: true,
      axisLabel: { formatter: "{value}s" },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: "Speed Distribution",
      type: "scatter",
      emphasis: { focus: "series" },
      data: speedData,
      markArea: {
        silent: true,
        itemStyle: {
          color: "transparent",
          borderWidth: 1,
          borderType: "dashed",
        },
        data: [
          [
            { name: "Speed Data Range", xAxis: "min", yAxis: "min" },
            { xAxis: "max", yAxis: "max" },
          ],
        ],
      },
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
      markLine: {
        lineStyle: { type: "solid" },
        data: [{ type: "average", name: "Average" }],
      },
    },
  ],
});

export const paperTypes = [
  { key: "preprint", label: "Preprint Platform" },
  { key: "access", label: "Access Type" },
  { key: "region", label: "Geographic Region" },
  { key: "publication", label: "Publication Type" },
  { key: "scientific", label: "Scientific Field" },
];
// Modify EChart component to handle speed chart
const EChart = ({
  chartType = "cost",
  data,
}: {
  chartType?: ChartType;
  data?: ChartData[];
}) => {
  const [paperType, setPaperType] = useState("preprint");
  const chartRef = useRef<HTMLDivElement>(null);
  const costData = generateCostData();
  const speedData = generateSpeedData();
  const paperData = getPaperData(paperType);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    const options = (() => {
      switch (chartType) {
        case "issue":
          return getIssueChartOptions(data);
        case "speed":
          return getSpeedChartOptions(speedData);
        case "paper":
          return getPaperChartOptions(paperData);
        default:
          return getCostChartOptions(costData);
      }
    })();

    myChart.setOption(options);
    return () => myChart.dispose();
  }, [chartType, costData, speedData, data]);

  return (
    <div className="">
      {chartType === "paper" && (
        <Select
          isRequired
          className="max-w-xs absolute z-40"
          defaultSelectedKeys={["preprint"]}
          label="Select Distribution Type"
          placeholder="Select Distribution"
        >
          {paperTypes.map((paperType) => (
            <SelectItem
              key={paperType.key}
              onPress={() => setPaperType(paperType.key)}
            >
              {paperType.label}
            </SelectItem>
          ))}
        </Select>
      )}
      <div ref={chartRef} style={{ height: "450px" }} />
    </div>
  );
};

export default EChart;
