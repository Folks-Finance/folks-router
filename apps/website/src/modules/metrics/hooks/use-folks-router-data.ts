import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { match } from "ts-pattern";

import { FOLKS_ROUTER_METRICS_ENDPOINT } from "src/modules/metrics/hooks/graphql-endpoint";

import type { Timeframes } from "src/modules/metrics/metrics-dashboard/timeframes";

interface BaseFolksRouterData {
  periodStartUnix: string;
  volumeUSD: number;
  feesUSD: number;
  routeTransactionCount: string;
  routeTransactions: {
    aggregates: {
      distinctCount: {
        senderId: string;
      };
    };
  };
}

interface FolksRouterData {
  folksRouterData: {
    nodes: BaseFolksRouterData[];
  };
}

const getFolksRouterData = async (timeframe: Timeframes) => {
  const client = new GraphQLClient(FOLKS_ROUTER_METRICS_ENDPOINT);

  const query = match(timeframe)
    .with(
      "MONTH",
      () => gql`
        query {
          folksRouterData: folksRouterMonthData(last: 12, orderBy: PERIOD_START_UNIX_ASC) {
            nodes {
              periodStartUnix
              volumeUSD
              feesUSD
              routeTransactionCount
              routeTransactions {
                aggregates {
                  distinctCount {
                    senderId
                  }
                }
              }
            }
          }
        }
      `,
    )
    .with(
      "DAY",
      () => gql`
        query {
          folksRouterData: folksRouterDayData(last: 31, orderBy: PERIOD_START_UNIX_ASC) {
            nodes {
              periodStartUnix
              volumeUSD
              feesUSD
              routeTransactionCount
              routeTransactions {
                aggregates {
                  distinctCount {
                    senderId
                  }
                }
              }
            }
          }
        }
      `,
    )
    .with(
      "HOUR",
      () => gql`
        query {
          folksRouterData: folksRouterHourData(last: 168, orderBy: PERIOD_START_UNIX_ASC) {
            nodes {
              periodStartUnix
              volumeUSD
              feesUSD
              routeTransactionCount
              routeTransactions {
                aggregates {
                  distinctCount {
                    senderId
                  }
                }
              }
            }
          }
        }
      `,
    )
    .exhaustive();

  const { folksRouterData } = await client.request<FolksRouterData>(query);
  return { folksRouterData };
};

export const useFolksRouterData = ({ timeframe }: { timeframe: Timeframes }) => {
  const result = useQuery({
    queryKey: ["folks-router-data", timeframe],
    queryFn: () => getFolksRouterData(timeframe),
    staleTime: Infinity,
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  return result;
};
