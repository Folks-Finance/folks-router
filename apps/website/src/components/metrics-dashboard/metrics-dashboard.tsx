import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Grid, Col } from "@tremor/react";
import { useState } from "react";

import { HistogramChartCard } from "@components/chart-cards/histogram-chart-card";

const histogramChartData = [
  {
    name: "Topic 1",
    "Group A": 890,
    "Group B": 338,
    "Group C": 538,
    "Group D": 396,
    "Group E": 138,
    "Group F": 436,
  },
  {
    name: "Topic 2",
    "Group A": 289,
    "Group B": 233,
    "Group C": 253,
    "Group D": 333,
    "Group E": 133,
    "Group F": 533,
  },
];

export const MetricsDashboard = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(2);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <div className="layout-container flex flex-col gap-y-10 pt-3.5 tablet:gap-y-16 tablet:pt-5">
        <h1 className="text-center text-3xl text-base-content tablet:text-5xl">Folks Router Metrics</h1>

        <Grid numItems={1} numItemsSm={1} numItemsLg={2} className="gap-6">
          <Col numColSpan={1} numColSpanLg={2}>
            <HistogramChartCard
              selectedTimeframeIndex={selectedTimeframeIndex}
              setSelectedTimeframeIndex={setSelectedTimeframeIndex}
              title="Transaction Volume"
              index="name"
              data={histogramChartData}
              categories={["Group A", "Group B", "Group C", "Group D", "Group E", "Group F"]}
              colors={["blue", "teal", "amber", "rose", "indigo", "emerald"]}
            />
          </Col>
        </Grid>
      </div>
    </QueryClientProvider>
  );
};
