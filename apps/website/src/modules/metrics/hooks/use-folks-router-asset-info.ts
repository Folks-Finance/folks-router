import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { match } from "ts-pattern";

import { FOLKS_ROUTER_METRICS_ENDPOINT } from "src/modules/metrics/hooks/graphql-endpoint";

import type { Timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";

interface BaseFolksRouterAssetInfo {
  periodStartUnix: string;
  volumeUSD: number;
  feesUSD: number;
}

interface FolksRouterAssetsInfo {
  tokenData: {
    nodes: BaseFolksRouterAssetInfo[];
  };
}

const getFolksRouterAssetInfo = async (assetId: string, timeframe: Timeframes) => {
  const client = new GraphQLClient(FOLKS_ROUTER_METRICS_ENDPOINT);

  const query = match(timeframe)
    .with(
      "MONTH",
      () => gql`
        query ($assetId: String!) {
          tokenData: tokenMonthData(
            last: 12
            filter: { tokenId: { equalTo: $assetId } }
            orderBy: PERIOD_START_UNIX_ASC
          ) {
            nodes {
              periodStartUnix
              volumeUSD
              feesUSD
            }
          }
        }
      `,
    )
    .with(
      "DAY",
      () => gql`
        query ($assetId: String!) {
          tokenData: tokenDayData(
            last: 31
            filter: { tokenId: { equalTo: $assetId } }
            orderBy: PERIOD_START_UNIX_ASC
          ) {
            nodes {
              periodStartUnix
              volumeUSD
              feesUSD
            }
          }
        }
      `,
    )
    .with(
      "HOUR",
      () => gql`
        query ($assetId: String!) {
          tokenData: tokenHourData(
            last: 168
            filter: { tokenId: { equalTo: $assetId } }
            orderBy: PERIOD_START_UNIX_ASC
          ) {
            nodes {
              periodStartUnix
              volumeUSD
              feesUSD
            }
          }
        }
      `,
    )
    .exhaustive();

  const { tokenData } = await client.request<FolksRouterAssetsInfo>(query, { assetId });
  return { tokenData };
};

export const useFolksRouterAssetInfo = ({ assetId, timeframe }: { assetId: string; timeframe: Timeframes }) => {
  const result = useQuery({
    queryKey: ["folks-router-asset-info", assetId, timeframe],
    queryFn: () => getFolksRouterAssetInfo(assetId, timeframe),
    staleTime: Infinity,
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  return result;
};
