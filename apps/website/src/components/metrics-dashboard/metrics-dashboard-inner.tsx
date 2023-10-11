import { Col, Grid } from "@tremor/react";

import { TokenVolumeChart } from "@components/metrics-dashboard/token-volume-chart/token-volume-chart";

export const MetricsDashboardInner = () => {
  return (
    <Grid numItems={1} numItemsLg={12} className="gap-6">
      <Col numColSpan={1} numColSpanLg={12}>
        <TokenVolumeChart />
      </Col>
    </Grid>
  );
};
