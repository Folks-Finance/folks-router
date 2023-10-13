import { useIsMobile } from "@hooks/use-device-size";

export const ChartLegend = ({ xLabel, yLabel }: { xLabel: string; yLabel: string }) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="flex w-full items-center justify-center gap-x-4 text-sm text-light-1">
      <span>x: {xLabel}</span>
      <span>y: {yLabel}</span>
    </div>
  );
};
