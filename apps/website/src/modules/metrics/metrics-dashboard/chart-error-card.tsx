import { Card } from "@tremor/react";

import { cn } from "src/utils";

import AlertTriangleIcon from "~icons/lucide/alert-triangle.svg";

export const ChartErrorCard = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("flex w-full items-center justify-center", className)}>
      <div className="flex flex-col items-center justify-center gap-y-4">
        <AlertTriangleIcon className="h-20 w-20 animate-pulse text-error" />
        <div className="text-xl text-base-content">
          <p className="text-center">An error occurred while fetching the data.</p>
          <p className="text-center">Please try to reload the page or try again later.</p>
        </div>
      </div>
    </Card>
  );
};
