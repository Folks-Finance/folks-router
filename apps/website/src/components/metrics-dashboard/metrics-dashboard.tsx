import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import { MetricsDashboardInner } from "@components/metrics-dashboard/metrics-dashboard-inner";

export const MetricsDashboard = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <div className="layout-container flex flex-col gap-y-10 pt-3.5 tablet:gap-y-16 tablet:pt-5">
        <h1 className="text-center text-3xl text-base-content tablet:text-5xl">Folks Router Metrics</h1>
        <MetricsDashboardInner />
      </div>
    </QueryClientProvider>
  );
};
