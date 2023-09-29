import { Card, BarChart, TabGroup, TabList, Tab } from "@tremor/react";

import { timeframes } from "@components/chart-cards/types";

import type { BarChartProps } from "@tremor/react";
import type { Dispatch, SetStateAction } from "react";

interface HistogramChartProps extends BarChartProps {
  title: string;
  selectedTimeframeIndex: number;
  setSelectedTimeframeIndex: Dispatch<SetStateAction<number>>;
}

export const HistogramChartCard = ({
  title,
  selectedTimeframeIndex,
  setSelectedTimeframeIndex,
  ...props
}: HistogramChartProps) => (
  <Card className="flex flex-col gap-y-7 p-7">
    <div className="flex items-center">
      <h2 className="w-1/2 text-2xl text-base-content">{title}</h2>
      <TabGroup
        index={selectedTimeframeIndex}
        onIndexChange={setSelectedTimeframeIndex}
        className="flex w-1/2 justify-end"
      >
        <TabList variant="solid" className="!rounded-md p-1.5">
          {timeframes.map((timeframe) => (
            <Tab
              key={Math.random()}
              className="rounded-md transition-colors duration-300 hover:bg-base-2 aria-selected:bg-base-2 aria-selected:text-base-content"
            >
              {timeframe}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>

    <BarChart {...props} />
  </Card>
);
