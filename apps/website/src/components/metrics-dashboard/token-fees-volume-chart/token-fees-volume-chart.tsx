import { Card, SearchSelect, SearchSelectItem, Tab, TabGroup, TabList, BarChart } from "@tremor/react";
import { useState } from "react";
import { useSpinDelay } from "spin-delay";

import { ChartLegend } from "@components/metrics-dashboard/chart-legend";
import { timeframes } from "@components/metrics-dashboard/timeframes";
import { AssetIconFallback } from "@components/metrics-dashboard/token-volume-chart/asset-icon-fallback";
import { Spinner } from "@components/spinner/spinner";
import { useIsMobile } from "@hooks/use-device-size";
import { useFolksRouterAssetInfo } from "src/lib/metrics/hooks/use-folks-router-asset-info";
import { useFolksRouterAssets } from "src/lib/metrics/hooks/use-folks-router-assets";

const valueFormatter = (value: number) => `$ ${new Intl.NumberFormat("en-US").format(value).toString()}`;

export const TokenFeesVolumeChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(1); // Default to DAY
  const [assetId, setAssetId] = useState("0"); // Default to ALGO

  const isMobile = useIsMobile();

  const { folksRouterAssets, isLoading: isFolksRouterAssetsLoading } = useFolksRouterAssets();
  const selectedTimeframe = timeframes[selectedTimeframeIndex] || timeframes[1];
  const { data, isLoading: isFolksRouterAssetInfoLoading } = useFolksRouterAssetInfo({
    assetId,
    timeframe: selectedTimeframe,
  });

  const isDataLoading = useSpinDelay(isFolksRouterAssetsLoading || isFolksRouterAssetInfoLoading, {
    delay: 0,
    minDuration: 1000,
  });

  const folksRouterAssetInfo = data?.tokenData.nodes;
  if (!folksRouterAssets || !folksRouterAssetInfo || isDataLoading)
    return (
      <Card className="flex min-h-[35rem] w-full items-center justify-center sm:min-h-[31.625rem] tablet:min-h-[26.375rem]">
        <Spinner />
      </Card>
    );

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
      <div className="flex flex-col items-center gap-y-4 tablet:flex-row tablet:justify-between tablet:gap-x-4">
        <h2 className="whitespace-nowrap text-center text-lg text-base-content tablet:text-left tablet:text-2xl lg:w-1/4">
          Token Fees Volume
        </h2>
        <div className="flex w-full flex-col gap-4 sm:flex-row tablet:items-center tablet:justify-end lg:w-3/4">
          <SearchSelect
            value={assetId}
            onValueChange={setAssetId}
            className="tablet:max-w-xs"
            icon={() => (
              <AssetIconFallback
                assetId={parseInt(assetId)}
                unitName={folksRouterAssets.find(({ id }) => id === assetId)?.ticker}
              />
            )}
          >
            {folksRouterAssets.map(({ id, ticker }) => (
              <SearchSelectItem key={id} value={id} className="hover:bg-base-1">
                <div className="flex items-center gap-x-2">
                  <AssetIconFallback assetId={parseInt(id)} unitName={ticker} />
                  <span>{ticker}</span>
                </div>
              </SearchSelectItem>
            ))}
          </SearchSelect>

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
        data={tokenFeesVolumeChartData}
        index="token-fees-volume"
        categories={["Token Fees Volume"]}
        colors={["emerald"]}
        valueFormatter={valueFormatter}
        yAxisWidth={70}
        showAnimation
        showXAxis={false}
        showYAxis={isMobile ? false : true}
      />

      <ChartLegend xLabel="Timeframe" yLabel="$ Amount" />
    </Card>
  );
};
