import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

import { FOLKS_ROUTER_METRICS_ENDPOINT } from "src/lib/metrics/hooks/graphql-endpoint";

import type { Timeframes } from "@components/metrics-dashboard/timeframes";

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

  let query = "";
  // A year by MONTH
  if (timeframe === "MONTH") {
    query = gql`
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
    `;
  }
  // A month by DAY
  if (timeframe === "DAY") {
    query = gql`
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
    `;
  }
  // A week by HOUR
  if (timeframe === "HOUR") {
    query = gql`
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
    `;
  }

  const { folksRouterData } = await client.request<FolksRouterData>(query);
  return { folksRouterData };
};

export const useFolksRouterData = ({ timeframe }: { timeframe: Timeframes }) => {
  const fetchFolksRouterData = (timeframe: Timeframes) => {
    const { data, ...rest } = useQuery({
      queryKey: ["folks-router-data", timeframe],
      queryFn: () => getFolksRouterData(timeframe),
      staleTime: Infinity,
      refetchInterval: 30 * 60 * 1000, // 30 minutes
    });

    return { data, ...rest };
  };

  const { data, ...rest } = fetchFolksRouterData(timeframe);
  return { data, ...rest };
};
