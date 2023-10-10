import { Col, Grid } from "@tremor/react";

import { TokenVolumeChart } from "@components/metrics-dashboard/token-volume-chart/token-volume-chart";
import { TransactionVolumeChart } from "@components/metrics-dashboard/transaction-volume-chart/transaction-volume-chart";

export const MetricsDashboardInner = () => {
  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={12}>
        <TransactionVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <TokenVolumeChart />
      </Col>
    </Grid>
  );
};
