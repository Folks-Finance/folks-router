import { Card, SearchSelect, SearchSelectItem, Tab, TabGroup, TabList } from "@tremor/react";
import { useState } from "react";

import { AssetIconFallback } from "@components/metrics-dashboard/token-volume-chart/asset-icon-fallback";
import { TIMEFRAMES_LABEL, timeframes } from "@components/metrics-dashboard/types";
import { useFolksRouterAssets } from "src/lib/metrics/hooks/use-folks-router-assets";

export const TokenVolumeChart = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(2);

  const { folksRouterAssets } = useFolksRouterAssets();
  if (!folksRouterAssets) return null;

  return (
    <Card className="flex flex-col gap-y-8">
      <div className="flex flex-col items-center gap-y-4 tablet:flex-row tablet:justify-between tablet:gap-x-4">
        <h2 className="whitespace-nowrap text-center text-2xl text-base-content tablet:text-left lg:w-1/4">
          Token Volume
        </h2>
        <div className="flex w-full flex-col gap-4 sm:flex-row tablet:items-center tablet:justify-end lg:w-3/4">
          <SearchSelect className="tablet:max-w-xs">
            {folksRouterAssets.map(({ id, name, ticker }) => (
              <SearchSelectItem key={id} value={name} className="hover:bg-base-1">
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
              {timeframes.map((_, index) => (
                <Tab
                  key={TIMEFRAMES_LABEL[index]}
                  className="flex flex-1 justify-center transition-colors duration-300 hover:bg-base-2 aria-selected:bg-base-2 aria-selected:text-base-content"
                >
                  {TIMEFRAMES_LABEL[index]}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>

      {/* Here goes the chart */}
    </Card>
  );
};
