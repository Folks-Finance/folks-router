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

export const TokenFeesVolumeChart = () => {
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

  const tokenFeesVolumeChartData = folksRouterAssetInfo.map(({ periodStartUnix, feesUSD }) => ({
    "token-fees-volume": new Date(periodStartUnix).toLocaleDateString("en-US", {
      hour: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    "Token Fees Volume": feesUSD,
  }));

  return (
    <Card className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-4 tablet:flex-row">
          <h2 className="whitespace-nowrap text-center text-lg text-base-content tablet:w-1/2 tablet:text-left tablet:text-2xl lg:w-full">
            Token Fees Volume
          </h2>
          <SearchSelectAssetChart
            assetId={assetId}
            setAssetId={setAssetId}
            folksRouterAssets={folksRouterAssets}
            className="tablet:w-1/2 lg:w-full"
          />
        </div>
        <TimeframeChartTabs index={selectedTimeframeIndex} onIndexChange={setSelectedTimeframeIndex} />
      </div>

      {isDataLoading ? (
        <div className="flex h-[22.235rem] w-full items-center justify-center tablet:h-[20rem]">
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <BarChart
            data={tokenFeesVolumeChartData}
            index="token-fees-volume"
            categories={["Token Fees Volume"]}
            colors={["emerald"]}
            valueFormatter={getFormattedValue}
            yAxisWidth={70}
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
