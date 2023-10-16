import { BarChart, Card } from "@tremor/react";
import { useState } from "react";
import { useSpinDelay } from "spin-delay";

import { useIsMobile } from "@hooks/use-device-size";
import { useFolksRouterData } from "src/modules/metrics/hooks/use-folks-router-data";
import { ChartErrorCard } from "src/modules/metrics/metrics-dashboard/chart-error-card";
import { ChartLegend } from "src/modules/metrics/metrics-dashboard/chart-legend";
import { ChartSkeleton } from "src/modules/metrics/metrics-dashboard/chart-skeleton";
import { TimeframeChartTabs } from "src/modules/metrics/metrics-dashboard/timeframe-chart-tabs";
import { timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";
import { getFormattedValue } from "src/modules/metrics/metrics-dashboard/utils";

export const TransactionFeesVolumeChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(1); // Default to DAY
  const selectedTimeframe = timeframes[selectedTimeframeIndex] || timeframes[1];

  const isMobile = useIsMobile();

  const {
    data,
    isLoading: isFolksRouterDataLoading,
    isError: isFolksRouterDataError,
  } = useFolksRouterData({
    timeframe: selectedTimeframe,
  });

  const isDataLoading = useSpinDelay(isFolksRouterDataLoading, {
    delay: 0,
    minDuration: 1500,
  });

  const folksRouterData = data?.folksRouterData.nodes;
  if (!folksRouterData) {
    return <Card className="flex min-h-[31.375rem] w-full items-center justify-center tablet:min-h-[29.375rem]" />;
  }

  if (isFolksRouterDataError) {
    return <ChartErrorCard className="min-h-[31.375rem] tablet:min-h-[29.375rem]" />;
  }

  const transactionFeesVolumeChartData = folksRouterData.map(({ periodStartUnix, feesUSD }) => ({
    "transaction-fees-volume": new Date(periodStartUnix).toLocaleDateString("en-US", {
      hour: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    "Transaction Fees Volume": feesUSD,
  }));

  return (
    <Card className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <h2 className="w-full whitespace-nowrap text-center text-lg text-base-content tablet:text-left tablet:text-2xl">
          Transaction Fees Volume
        </h2>
        <TimeframeChartTabs index={selectedTimeframeIndex} onIndexChange={setSelectedTimeframeIndex} />
      </div>

      {isDataLoading ? (
        <div className="flex h-[22.235rem] w-full items-center justify-center tablet:h-[20rem]">
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <BarChart
            data={transactionFeesVolumeChartData}
            index="transaction-fees-volume"
            categories={["Transaction Fees Volume"]}
            colors={["blue"]}
            valueFormatter={getFormattedValue}
            yAxisWidth={80}
            showAnimation
            showXAxis={false}
            showYAxis={isMobile ? false : true}
          />
          <ChartLegend xLabel="Timeframe" yLabel="$ Amount" />
        </>
      )}
    </Card>
  );
};
