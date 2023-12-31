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

export const TransactionWalletNumberChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(1); // Default to DAY
  const selectedTimeframe = timeframes[selectedTimeframeIndex] || timeframes[1];

  const isMobile = useIsMobile();

  const {
    data,
    isPending: isFolksRouterDataPending,
    isError: isFolksRouterDataError,
  } = useFolksRouterData({
    timeframe: selectedTimeframe,
  });

  const isDataPending = useSpinDelay(isFolksRouterDataPending, {
    delay: 0,
    minDuration: 1500,
  });

  const folksRouterData = data?.folksRouterData.nodes;
  if (!folksRouterData) {
    return <Card className="flex min-h-[31.375rem] w-full items-center justify-center tablet:min-h-[26.375rem]" />;
  }

  if (isFolksRouterDataError) {
    return <ChartErrorCard className="min-h-[31.375rem] tablet:min-h-[26.375rem]" />;
  }

  const transactionWalletNumberChartData = folksRouterData.map(
    ({
      periodStartUnix,
      routeTransactionCount,
      routeTransactions: {
        aggregates: {
          distinctCount: { senderId },
        },
      },
    }) => ({
      "transaction-wallet-number": new Date(periodStartUnix).toLocaleDateString("en-US", {
        hour: "2-digit",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      "Transaction Number": routeTransactionCount,
      "Wallet Number": senderId,
    }),
  );

  return (
    <Card className="flex flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-4 tablet:flex-row tablet:justify-between tablet:gap-x-4">
        <h2 className="w-full whitespace-nowrap text-center text-lg text-base-content tablet:text-left tablet:text-2xl">
          Transaction & Wallet Number
        </h2>
        <TimeframeChartTabs index={selectedTimeframeIndex} onIndexChange={setSelectedTimeframeIndex} />
      </div>

      {isDataPending ? (
        <div className="flex h-[22.235rem] w-full items-center justify-center tablet:h-[20rem]">
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <BarChart
            data={transactionWalletNumberChartData}
            index="transaction-wallet-number"
            categories={["Transaction Number", "Wallet Number"]}
            colors={["violet", "emerald"]}
            yAxisWidth={80}
            showAnimation
            showXAxis={false}
            showYAxis={isMobile ? false : true}
            stack
          />
          <ChartLegend xLabel="Timeframe" yLabel="Transaction & Wallet Number" />
        </>
      )}
    </Card>
  );
};
