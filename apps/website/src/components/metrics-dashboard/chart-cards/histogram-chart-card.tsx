import { Card, BarChart, TabGroup, TabList, Tab } from "@tremor/react";

import { timeframes } from "@components/metrics-dashboard/types";

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
  <Card className="flex flex-col gap-y-8 p-7">
    <div className="flex flex-col items-center gap-y-4 tablet:flex-row">
      <h2 className="teblet:w-1/2 w-full text-center text-2xl text-base-content tablet:text-left">{title}</h2>
      <TabGroup
        index={selectedTimeframeIndex}
        onIndexChange={setSelectedTimeframeIndex}
        className="teblet:w-1/2 flex w-full items-center justify-center tablet:justify-end"
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
