import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

import { FOLKS_ROUTER_METRICS_ENDPOINT } from "src/lib/metrics/hooks/graphql-endpoint";

import type { Timeframes } from "@components/metrics-dashboard/timeframes";

interface BaseFolksRouterAssetInfo {
  periodStartUnix: string;
  volumeUSD: number;
  feesUSD: number;
}

interface FolksRouterAssestInfo {
  tokenHourData: {
    nodes: BaseFolksRouterAssetInfo[];
  };
}

const getFolksRouterAssetInfo = async (assetId: string, timeframe: Timeframes) => {
  const client = new GraphQLClient(FOLKS_ROUTER_METRICS_ENDPOINT);

  console.log(timeframe);

  const query = gql`
    query ($assetId: String!) {
      tokenHourData(last: 168, filter: { tokenId: { equalTo: $assetId } }, orderBy: PERIOD_START_UNIX_ASC) {
        nodes {
          periodStartUnix
          volumeUSD
          feesUSD
        }
      }
    }
  `;

  const { tokenHourData } = await client.request<FolksRouterAssestInfo>(query, { assetId });
  return { tokenHourData };
};

export const useFolksRouterAssetInfo = ({ assetId, timeframe }: { assetId: string; timeframe: Timeframes }) => {
  const fetchAssetInformation = (assetId: string, timeframe: Timeframes) => {
    const { data, ...rest } = useQuery({
      queryKey: ["folks-router-asset-info", assetId],
      queryFn: () => getFolksRouterAssetInfo(assetId, timeframe),
      staleTime: Infinity,
      refetchInterval: 30 * 60 * 1000, // 30 minutes
    });

    return { data, ...rest };
  };

  const { data, ...rest } = fetchAssetInformation(assetId, timeframe);
  return { data, ...rest };
};
