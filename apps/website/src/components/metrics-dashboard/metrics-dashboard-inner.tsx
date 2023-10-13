import { Col, Grid } from "@tremor/react";

import { TokenFeesVolumeChart } from "@components/metrics-dashboard/token-fees-volume-chart/token-fees-volume-chart";
import { TokenVolumeChart } from "@components/metrics-dashboard/token-volume-chart/token-volume-chart";
import { TransactionFeesVolumeChart } from "@components/metrics-dashboard/transaction-fees-volume-chart/transaction-fees-volume-chart";
import { TransactionVolumeChart } from "@components/metrics-dashboard/transaction-volume-chart/transaction-volume-chart";
import { WalletChart } from "@components/metrics-dashboard/wallet-chart/wallet-chart";

export const MetricsDashboardInner = () => {
  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={12}>
        <TransactionVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <TransactionFeesVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <TokenVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <TokenFeesVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <WalletChart />
      </Col>
    </Grid>
  );
};
