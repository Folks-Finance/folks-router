import { Col, Grid } from "@tremor/react";

import { TokenFeesVolumeChart } from "src/modules/metrics/metrics-dashboard/token-fees-volume-chart/token-fees-volume-chart";
import { TokenVolumeChart } from "src/modules/metrics/metrics-dashboard/token-volume-chart/token-volume-chart";
import { TransactionFeesVolumeChart } from "src/modules/metrics/metrics-dashboard/transaction-fees-volume-chart/transaction-fees-volume-chart";
import { TransactionVolumeChart } from "src/modules/metrics/metrics-dashboard/transaction-volume-chart/transaction-volume-chart";
import { TransactionWalletNumberChart } from "src/modules/metrics/metrics-dashboard/transaction-wallet-chart/transaction-wallet-chart";

export const MetricsDashboardInner = () => {
  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={6}>
        <TransactionVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={6}>
        <TransactionFeesVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <TransactionWalletNumberChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={6}>
        <TokenVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={6}>
        <TokenFeesVolumeChart />
      </Col>
    </Grid>
  );
};
