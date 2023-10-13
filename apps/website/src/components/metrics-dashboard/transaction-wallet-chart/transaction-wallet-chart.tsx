import { BarChart, Card, Tab, TabGroup, TabList } from "@tremor/react";
import { useState } from "react";
import { useSpinDelay } from "spin-delay";

import { ChartLegend } from "@components/metrics-dashboard/chart-legend";
import { timeframes } from "@components/metrics-dashboard/timeframes";
import { Spinner } from "@components/spinner/spinner";
import { useIsMobile } from "@hooks/use-device-size";
import { useFolksRouterData } from "src/lib/metrics/hooks/use-folks-router-data";

export const TransactionWalletNumberChart = () => {
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
      <Card className="flex min-h-[31.625rem] w-full items-center justify-center tablet:min-h-[26.375rem]">
        <Spinner />
      </Card>
    );

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
        <h2 className="whitespace-nowrap text-center text-2xl text-base-content tablet:text-left lg:w-1/4">
          Transaction & Wallet Number
        </h2>
        <div className="flex w-full flex-col gap-4 sm:flex-row tablet:items-center tablet:justify-end lg:w-3/4">
          <TabGroup
            index={selectedTimeframeIndex}
            onIndexChange={setSelectedTimeframeIndex}
            className="tablet:max-w-xs"
          >
            <TabList variant="solid" className="flex flex-1 p-1">
              {timeframes.map((timeframe) => (
                <Tab
                  key={timeframe}
                  className="flex flex-1 justify-center transition-colors duration-300 hover:bg-base-2 aria-selected:bg-base-2 aria-selected:text-base-content"
                >
                  {timeframe}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>

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

      <ChartLegend xLabel="Timeframe" yLabel="Number" />
    </Card>
  );
};
