import { Card, BarChart } from "@tremor/react";
import { useState } from "react";
import { useSpinDelay } from "spin-delay";

import { useIsMobile } from "@hooks/use-device-size";
import { useFolksRouterAssetInfo } from "src/modules/metrics/hooks/use-folks-router-asset-info";
import { useFolksRouterAssets } from "src/modules/metrics/hooks/use-folks-router-assets";
import { ChartLegend } from "src/modules/metrics/metrics-dashboard/chart-legend";
import { ChartSkeleton } from "src/modules/metrics/metrics-dashboard/chart-skeleton";
import { SearchSelectAssetChart } from "src/modules/metrics/metrics-dashboard/search-select-asset-chart";
import { TimeframeChartTabs } from "src/modules/metrics/metrics-dashboard/timeframe-chart-tabs";
import { timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";
import { getFormattedValue } from "src/modules/metrics/metrics-dashboard/utils";

import AlertTriangleIcon from "~icons/lucide/alert-triangle.svg";

export const TokenVolumeChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(1); // Default to DAY
  const [assetId, setAssetId] = useState("0"); // Default to ALGO

  const isMobile = useIsMobile();

  const {
    folksRouterAssets,
    isLoading: isFolksRouterAssetsLoading,
    isError: isFolksRouterAssetsError,
  } = useFolksRouterAssets();
  const selectedTimeframe = timeframes[selectedTimeframeIndex] || timeframes[1];
  const {
    data,
    isLoading: isFolksRouterAssetInfoLoading,
    isError: isFolksRouterAssetInfoError,
  } = useFolksRouterAssetInfo({
    assetId,
    timeframe: selectedTimeframe,
  });

  const isDataLoading = useSpinDelay(isFolksRouterAssetsLoading || isFolksRouterAssetInfoLoading, {
    delay: 0,
    minDuration: 1500,
  });

  const folksRouterAssetInfo = data?.tokenData.nodes;
  if (!folksRouterAssets || !folksRouterAssetInfo) {
    return (
      <Card className="flex min-h-[34.75rem] w-full items-center justify-center sm:min-h-[31.375rem] tablet:min-h-[26.375rem]" />
    );
  }

  if (isFolksRouterAssetsError || isFolksRouterAssetInfoError) {
    return (
      <Card className="flex min-h-[34.75rem] w-full items-center justify-center sm:min-h-[31.375rem] tablet:min-h-[26.375rem]">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <AlertTriangleIcon className="h-20 w-20 animate-pulse text-error" />
          <div className="flex flex-col items-center justify-center gap-y-2 text-center text-lg text-base-content tablet:text-left tablet:text-2xl">
            <p>An error occurred while fetching the data.</p>
            <p>Please try to reload the page or try again later.</p>
          </div>
        </div>
      </Card>
    );
  }

  const tokenVolumeChartData = folksRouterAssetInfo.map(({ periodStartUnix, volumeUSD }) => ({
    "token-volume": new Date(periodStartUnix).toLocaleDateString("en-US", {
      hour: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    "Token Volume": volumeUSD,
  }));

  return (
    <Card className="flex flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-4 tablet:flex-row tablet:justify-between tablet:gap-x-4">
        <h2 className="whitespace-nowrap text-center text-lg text-base-content tablet:text-left tablet:text-2xl lg:w-1/4">
          Token Volume
        </h2>
        <div className="flex w-full flex-col gap-4 sm:flex-row tablet:items-center tablet:justify-end lg:w-3/4">
          <SearchSelectAssetChart assetId={assetId} setAssetId={setAssetId} folksRouterAssets={folksRouterAssets} />
          <TimeframeChartTabs index={selectedTimeframeIndex} onIndexChange={setSelectedTimeframeIndex} />
        </div>
      </div>

      {isDataLoading ? (
        <div className="flex h-[22.235rem] w-full items-center justify-center tablet:h-[20rem]">
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <BarChart
            data={tokenVolumeChartData}
            index="token-volume"
            categories={["Token Volume"]}
            colors={["cyan"]}
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