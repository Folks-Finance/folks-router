import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";

import { FOLKS_ROUTER_METRICS_ENDPOINT } from "src/lib/metrics/hooks/graphql-endpoint";

export interface BaseAssetInfo {
  id: string;
  name: string;
  ticker: string;
}

interface AssestInfo {
  tokens: {
    nodes: BaseAssetInfo[];
  };
}

const getFolksRouterAssets = async () => {
  const client = new GraphQLClient(FOLKS_ROUTER_METRICS_ENDPOINT);

  const query = gql`
    query {
      tokens(offset: 0) {
        nodes {
          id
          name
          ticker
        }
      }
    }
  `;

  const { tokens } = await client.request<AssestInfo>(query);
  return { tokens };
};

export const useFolksRouterAssets = () => {
  const { data: folksRouterAssets, ...rest } = useQuery({
    queryKey: ["folks-router-assets"],
    queryFn: async () => {
      const {
        tokens: { nodes: folksRouterAssets },
      } = await getFolksRouterAssets();
      return folksRouterAssets;
    },
    staleTime: Infinity,
    refetchInterval: 30 * 60 * 1000, // 30 minutes
  });

  return { folksRouterAssets, ...rest };
};
