import { Col, Grid } from "@tremor/react";
import { useState } from "react";

import { HistogramChartCard } from "@components/metrics-dashboard/chart-cards/histogram-chart-card";
import { TIMEFRAMES_LABEL, timeframes } from "@components/metrics-dashboard/types";
import { useVolume } from "src/lib/metrics/hooks/use-volumes";

export const MetricsDashboardInner = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(2);

  const selectedTimeframe = TIMEFRAMES_LABEL[selectedTimeframeIndex];

  const { data, isLoading } = useVolume({ timeframe: selectedTimeframe || timeframes[2] });
  if (isLoading || !data) return null;

  const { groupedAggregates } = data.routeTransactions;
  const sortedGroupedAggregates = groupedAggregates.sort((a, b) => {
    const keyA = a.keys[0] ? parseInt(a.keys[0]) : 0;
    const keyB = b.keys[0] ? parseInt(b.keys[0]) : 0;
    return keyA - keyB;
  });

  const histogramChartData = sortedGroupedAggregates.map(({ keys, sum: { volumeUSD } }) => ({
    name: keys[0],
    "Transaction Volume": volumeUSD,
  }));

  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={8}>
        <HistogramChartCard
          selectedTimeframeIndex={selectedTimeframeIndex}
          setSelectedTimeframeIndex={setSelectedTimeframeIndex}
          title="Transaction Volume"
          index="name"
          data={histogramChartData}
          categories={["Transaction Volume"]}
          colors={["blue"]}
        />
      </Col>
    </Grid>
  );
};
