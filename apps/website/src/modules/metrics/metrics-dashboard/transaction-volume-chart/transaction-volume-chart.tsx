import { BarChart, Card } from "@tremor/react";
import { useState } from "react";
import { useSpinDelay } from "spin-delay";

import { Spinner } from "@components/spinner/spinner";
import { useIsMobile } from "@hooks/use-device-size";
import { useFolksRouterData } from "src/modules/metrics/hooks/use-folks-router-data";
import { ChartLegend } from "src/modules/metrics/metrics-dashboard/chart-legend";
import { TimeframeChartTabs } from "src/modules/metrics/metrics-dashboard/timeframe-chart-tabs";
import { timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";
import { getFormattedValue } from "src/modules/metrics/metrics-dashboard/utils";

export const TransactionVolumeChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(1); // Default to DAY
  const selectedTimeframe = timeframes[selectedTimeframeIndex] || timeframes[1];

  const isMobile = useIsMobile();

  const { data, isLoading: isFolksRouterDataLoading } = useFolksRouterData({
    timeframe: selectedTimeframe,
  });

  const isDataLoading = useSpinDelay(isFolksRouterDataLoading, {
    delay: 0,
    minDuration: 1000,
  });

  const folksRouterData = data?.folksRouterData.nodes;
  if (!folksRouterData || isDataLoading)
    return (
      <Card className="flex min-h-[31.375rem] w-full items-center justify-center tablet:min-h-[26.375rem]">
        <Spinner />
      </Card>
    );

  const transactionVolumeChartData = folksRouterData.map(({ periodStartUnix, volumeUSD }) => ({
    "transaction-volume": new Date(periodStartUnix).toLocaleDateString("en-US", {
      hour: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    "Transaction Volume": volumeUSD,
  }));

  return (
    <Card className="flex flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-4 tablet:flex-row tablet:justify-between tablet:gap-x-4">
        <h2 className="w-full whitespace-nowrap text-center text-lg text-base-content tablet:text-left tablet:text-2xl">
          Transaction Volume
        </h2>
        <TimeframeChartTabs index={selectedTimeframeIndex} onIndexChange={setSelectedTimeframeIndex} />
      </div>

      <BarChart
        data={transactionVolumeChartData}
        index="transaction-volume"
        categories={["Transaction Volume"]}
        colors={["violet"]}
        valueFormatter={getFormattedValue}
        yAxisWidth={80}
        showAnimation
        showXAxis={false}
        showYAxis={isMobile ? false : true}
      />

      <ChartLegend xLabel="Timeframe" yLabel="$ Amount" />
    </Card>
  );
};
