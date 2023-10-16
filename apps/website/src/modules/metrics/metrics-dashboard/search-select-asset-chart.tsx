import { SearchSelect, SearchSelectItem } from "@tremor/react";

import { AssetIconFallback } from "src/modules/metrics/metrics-dashboard/asset-icon-fallback";

import type { Dispatch, SetStateAction } from "react";
import type { BaseAssetInfo } from "src/modules/metrics/hooks/use-folks-router-assets";

interface SearchSelectAssetChartProps {
  assetId: string;
  setAssetId: Dispatch<SetStateAction<string>>;
  folksRouterAssets: BaseAssetInfo[];
}

export const SearchSelectAssetChart = ({ assetId, setAssetId, folksRouterAssets }: SearchSelectAssetChartProps) => {
  return (
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
        <SearchSelectItem
          key={id}
          value={id}
          className="hover:bg-base-1 data-[headlessui-state='active_selected']:bg-base-1 data-[headlessui-state=active]:bg-base-1 data-[headlessui-state=selected]:bg-base-3"
        >
          <div className="flex items-center gap-x-2">
            <AssetIconFallback assetId={parseInt(id)} unitName={ticker} />
            <span>{ticker}</span>
          </div>
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
};
