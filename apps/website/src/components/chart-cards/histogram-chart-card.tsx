import { Card, BarChart } from "@tremor/react";

import type { BarChartProps } from "@tremor/react";

interface HistogramChartProps extends BarChartProps {
  title?: string;
  subtitle?: string;
}

export const HistogramChartCard = ({ title, subtitle, ...props }: HistogramChartProps) => (
  <Card className="flex flex-col gap-y-7 p-7">
    {(title || subtitle) && (
      <div className="flex flex-col gap-y-2">
        {title && <h2 className="text-xl font-semibold text-base-content">{title}</h2>}
        {subtitle && <p className="text-light-1">{subtitle}</p>}
      </div>
    )}
    <BarChart {...props} />
  </Card>
);
