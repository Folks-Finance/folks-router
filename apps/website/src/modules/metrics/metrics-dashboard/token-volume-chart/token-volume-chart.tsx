import { Card, BarChart } from "@tremor/react";
import { useState } from "react";
import { useSpinDelay } from "spin-delay";

import { useIsMobile } from "@hooks/use-device-size";
import { useFolksRouterAssetInfo } from "src/modules/metrics/hooks/use-folks-router-asset-info";
import { useFolksRouterAssets } from "src/modules/metrics/hooks/use-folks-router-assets";
import { ChartErrorCard } from "src/modules/metrics/metrics-dashboard/chart-error-card";
import { ChartLegend } from "src/modules/metrics/metrics-dashboard/chart-legend";
import { ChartSkeleton } from "src/modules/metrics/metrics-dashboard/chart-skeleton";
import { SearchSelectAssetChart } from "src/modules/metrics/metrics-dashboard/search-select-asset-chart";
import { TimeframeChartTabs } from "src/modules/metrics/metrics-dashboard/timeframe-chart-tabs";
import { timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";
import { getFormattedValue } from "src/modules/metrics/metrics-dashboard/utils";

export const TokenVolumeChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(1); // Default to DAY
  const [assetId, setAssetId] = useState("0"); // Default to ALGO

  const isMobile = useIsMobile();

  const {
    folksRouterAssets,
    isPending: isFolksRouterAssetsPending,
    isError: isFolksRouterAssetsError,
  } = useFolksRouterAssets();
  const selectedTimeframe = timeframes[selectedTimeframeIndex] || timeframes[1];
  const {
    data,
    isPending: isFolksRouterAssetInfoPending,
    isError: isFolksRouterAssetInfoError,
  } = useFolksRouterAssetInfo({
    assetId,
    timeframe: selectedTimeframe,
  });

  const isDataPending = useSpinDelay(isFolksRouterAssetsPending || isFolksRouterAssetInfoPending, {
    delay: 0,
    minDuration: 1500,
  });

  const folksRouterAssetInfo = data?.tokenData.nodes;
  if (!folksRouterAssets || !folksRouterAssetInfo) {
    return <Card className="flex min-h-[34.75rem] w-full items-center justify-center tablet:min-h-[29.75rem]" />;
  }

  if (isFolksRouterAssetsError || isFolksRouterAssetInfoError) {
    return <ChartErrorCard className="min-h-[34.75rem] tablet:min-h-[29.75rem]" />;
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
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col items-center justify-center gap-4 tablet:flex-row">
          <h2 className="whitespace-nowrap text-center text-lg text-base-content tablet:w-1/2 tablet:text-left tablet:text-2xl lg:w-full">
            Token Volume
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

      {isDataPending ? (
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
