import type { ReactNode } from "react";

import RotateCcwIcon from "~icons/lucide/rotate-ccw.svg";

interface WidgetCardBackProps {
  children: ReactNode;
  onFlipSideClicked: () => void;
}

export const WidgetCardBack = ({ children, onFlipSideClicked }: WidgetCardBackProps) => {
  return (
    <div className="absolute inset-0 flex h-full w-full justify-start overflow-hidden rounded-2xl bg-widget-base-1 text-white drop-shadow-xl transition-transform duration-700 ease-in-out rotate-y-180 backface-hidden group-data-[side=back]/card:rotate-y-[360deg]">
      <button className="absolute right-2 top-2" onClick={onFlipSideClicked}>
        <RotateCcwIcon className="h-4 w-4 text-widget-light-1" />
      </button>

      <div className="flex items-center justify-center group-data-[side=back]/card:animate-slide-down-and-fade">
        {children}
      </div>
    </div>
  );
};
