import { Col, Grid } from "@tremor/react";

import { TokenFeesVolumeChart } from "@components/metrics-dashboard/token-fees-chart/token-fees-volume-chart";
import { TokenVolumeChart } from "@components/metrics-dashboard/token-volume-chart/token-volume-chart";

export const MetricsDashboardInner = () => {
  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={12}>
        <TokenVolumeChart />
      </Col>
      <Col numColSpan={1} numColSpanLg={12}>
        <TokenFeesVolumeChart />
      </Col>
    </Grid>
  );
};
