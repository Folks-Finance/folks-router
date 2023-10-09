import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

import type { Timeframes } from "@components/metrics-dashboard/types";

interface UseVolumeParams {
  timeframe: Timeframes;
}

export interface BaseVolumeInfo {
  keys: string[];
  sum: {
    volumeUSD: number;
  };
}

interface VolumeInfo {
  routeTransactions: {
    groupedAggregates: BaseVolumeInfo[];
  };
}

const FOLKS_ROUTER_ANALYTICS_ENDPOINT = "https://api.folksrouter.io/analytics/v1/playground";

const getVolume = async ({ timeframe }: UseVolumeParams) => {
  const client = new GraphQLClient(FOLKS_ROUTER_ANALYTICS_ENDPOINT);

  const query = gql`
    query RouteTransactions($groupBy: [RouteTransactionsGroupBy!]!) {
      routeTransactions {
        groupedAggregates(groupBy: $groupBy) {
          keys
          sum {
            volumeUSD
          }
        }
      }
    }
  `;

  const { routeTransactions } = await client.request<VolumeInfo>(query, { groupBy: timeframe });

  return { routeTransactions };
};

export const useTransactionsVolumes = ({ timeframe }: UseVolumeParams) => {
  const { data, isLoading } = useQuery({
    queryKey: ["volumes", timeframe],
    queryFn: () => getVolume({ timeframe }),
    staleTime: Infinity,
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  return { data, isLoading };
};
