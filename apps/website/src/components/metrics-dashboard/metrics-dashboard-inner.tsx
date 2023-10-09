import { Col, Grid } from "@tremor/react";
import { useState } from "react";

import { HistogramChartCard } from "@components/metrics-dashboard/chart-cards/histogram-chart-card";
import { timeframes } from "@components/metrics-dashboard/types";
import { useTransactionsVolumes } from "src/lib/metrics/hooks/use-transactions-volumes";

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const MetricsDashboardInner = () => {
  const [selectedTimeframeIndex, setSelectedTimeframeIndex] = useState(2);
  const selectedTimeframe = timeframes[selectedTimeframeIndex];

  const { data, isLoading } = useTransactionsVolumes({ timeframe: selectedTimeframe || timeframes[0] });
  if (isLoading || !data) return null;
  const { groupedAggregates } = data.routeTransactions;

  const formattedData = groupedAggregates.map(({ keys, sum: { volumeUSD } }) => {
    const year = keys[0] ? parseInt(keys[0]) : undefined;
    const month = keys[1] ? parseInt(keys[1]) : undefined;
    const day = keys[2] ? parseInt(keys[2]) : undefined;
    const hour = keys[3] ? parseInt(keys[3]) : undefined;

    let dateFromKeys: Date | undefined = undefined;
    switch (timeframes[selectedTimeframeIndex]) {
      // Handle ["YEAR"] case
      case timeframes[0]:
        if (year) dateFromKeys = new Date(year, 11, 31); // The last day of the year
        break;

      // Handle ["YEAR", "MONTH"] case
      case timeframes[1]:
        if (year && month) dateFromKeys = new Date(year, month - 1);
        break;

      // Handle ["YEAR", "MONTH", "DAY"] case
      case timeframes[2]:
        if (year && month && day) dateFromKeys = new Date(year, month - 1, day);
        break;

      // Handle ["YEAR", "MONTH", "DAY", "HOUR"] case
      case timeframes[3]:
        if (year && month && day && hour) dateFromKeys = new Date(year, month - 1, day, hour);
        break;

      default:
        break;
    }

    return { date: dateFromKeys, volumeUSD: volumeUSD };
  });

  const sortedData = formattedData.sort((a, b) => {
    const { date: dateA } = a;
    const { date: dateB } = b;

    if (!dateA || !dateB) return 0;
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    return 0;
  });

  const histogramChartData = sortedData.map(({ date, volumeUSD }) => {
    if (!date) return;

    switch (timeframes[selectedTimeframeIndex]) {
      // Handle ["YEAR"] case
      case timeframes[0]:
        return {
          name: new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
          }),
          "Transaction Volume": volumeUSD,
        };

      // Handle ["YEAR", "MONTH"] case
      case timeframes[1]:
        return {
          name: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          "Transaction Volume": volumeUSD,
        };

      // Handle ["YEAR", "MONTH", "DAY"] case
      case timeframes[2]:
        return {
          name: new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          }),
          "Transaction Volume": volumeUSD,
        };

      // Handle ["YEAR", "MONTH", "DAY", "HOUR"] case
      case timeframes[3]:
        return {
          name: new Date(date).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
          }),
          "Transaction Volume": volumeUSD,
        };

      default:
        return null;
    }
  });

  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={12}>
        <HistogramChartCard
          selectedTimeframeIndex={selectedTimeframeIndex}
          setSelectedTimeframeIndex={setSelectedTimeframeIndex}
          title="Transactions Volumes"
          index="name"
          data={histogramChartData}
          categories={["Transaction Volume"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
        />
      </Col>
    </Grid>
  );
};
