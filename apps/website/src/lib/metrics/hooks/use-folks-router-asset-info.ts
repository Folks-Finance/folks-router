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
  tokenData: {
    nodes: BaseFolksRouterAssetInfo[];
  };
}

const getFolksRouterAssetInfo = async (assetId: string, timeframe: Timeframes) => {
  const client = new GraphQLClient(FOLKS_ROUTER_METRICS_ENDPOINT);

  let query = "";
  // A year by MONTH
  if (timeframe === "MONTH") {
    query = gql`
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
    `;
  }
  // A month by DAY
  if (timeframe === "DAY") {
    query = gql`
      query ($assetId: String!) {
        tokenData: tokenDayData(last: 31, filter: { tokenId: { equalTo: $assetId } }, orderBy: PERIOD_START_UNIX_ASC) {
          nodes {
            periodStartUnix
            volumeUSD
            feesUSD
          }
        }
      }
    `;
  }
  // A week by HOUR
  if (timeframe === "HOUR") {
    query = gql`
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
    `;
  }

  const { tokenData } = await client.request<FolksRouterAssestInfo>(query, { assetId });
  return { tokenData };
};

export const useFolksRouterAssetInfo = ({ assetId, timeframe }: { assetId: string; timeframe: Timeframes }) => {
  const fetchAssetInformation = (assetId: string, timeframe: Timeframes) => {
    const { data, ...rest } = useQuery({
      queryKey: ["folks-router-asset-info", assetId, timeframe],
      queryFn: () => getFolksRouterAssetInfo(assetId, timeframe),
      staleTime: Infinity,
      refetchInterval: 30 * 60 * 1000, // 30 minutes
    });

    return { data, ...rest };
  };

  const { data, ...rest } = fetchAssetInformation(assetId, timeframe);
  return { data, ...rest };
};
