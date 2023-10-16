import { TabGroup, TabList, Tab } from "@tremor/react";

import { timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";

interface ChartTabsProps {
  index: number;
  onIndexChange: (index: number) => void;
  className?: string;
}

export const TimeframeChartTabs = ({ index, onIndexChange, className }: ChartTabsProps) => {
  return (
    <TabGroup index={index} onIndexChange={onIndexChange} className={className}>
      <TabList variant="solid" className="flex flex-1 p-1">
        {timeframes.map((timeframe) => (
          <Tab
            key={timeframe}
            className="flex flex-1 justify-center transition-colors duration-300 hover:bg-base-2 aria-selected:bg-base-2 aria-selected:text-base-content"
          >
            BY {timeframe}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
};
