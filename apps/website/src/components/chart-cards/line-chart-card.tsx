import { Card, LineChart } from "@tremor/react";

import type { LineChartProps as TremorLineChartProps } from "@tremor/react";

interface LineChartProps extends TremorLineChartProps {
  title?: string;
  subtitle?: string;
}

export const LineChartCard = ({ title, subtitle, ...props }: LineChartProps) => (
  <Card className="flex flex-col gap-y-7 p-7">
    {(title || subtitle) && (
      <div className="flex flex-col gap-y-2">
        {title && <h2 className="text-xl font-semibold text-base-content">{title}</h2>}
        {subtitle && <p className="text-light-1">{subtitle}</p>}
      </div>
    )}
    <LineChart {...props} />
  </Card>
);
