import { useEffect } from "react";

import { useCountdown } from "@hooks/use-countdown";
import { cn } from "src/utils";

import ChevronDownIcon from "~icons/lucide/chevron-down.svg";
import MinusIcon from "~icons/lucide/minus.svg";
import PlusIcon from "~icons/lucide/plus.svg";
import RotateCwIcon from "~icons/lucide/rotate-cw.svg";
import AlgoIcon from "~icons/token-icons/algo.svg";
import UsdcIcon from "~icons/token-icons/usdc.svg";

interface WidgetCardFrontProps {
  onTimerExpired: () => void;
  onFlipSideClicked: () => void;
}

const COUNTDOWN_TOTAL_SECONDS = 20;
const COUNTDOWN_STARTING_SECONDS_LEFT = 5;

export const WidgetCardFront = ({ onTimerExpired, onFlipSideClicked }: WidgetCardFrontProps) => {
  const [count, { startCountdown }] = useCountdown({
    countStart: COUNTDOWN_STARTING_SECONDS_LEFT,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count === 0) {
      onTimerExpired();
    }
  }, [count]);

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col justify-start gap-y-6 rounded-2xl bg-widget-base-1 p-5 text-widget-base-content drop-shadow-xl transition-transform duration-700 ease-in-out rotate-y-0 backface-hidden group-data-[side=back]/card:rotate-y-180 lg:px-16 lg:py-10">
      {/* Flip Button */}
      <button
        className={cn("absolute right-2 top-2", {
          hidden: count > 0,
        })}
        onClick={onFlipSideClicked}
      >
        <RotateCwIcon className="h-4 w-4 text-widget-light-1" />
      </button>

      {/* From Input */}
      <div className="flex w-full flex-col gap-y-1">
        <h3 className="text-sm text-widget-light-1">From</h3>
        <div className="flex w-full items-center justify-between rounded border border-widget-light-2 px-4 py-3">
          <p>100.84742</p>
          <div className="flex items-center justify-center gap-x-4">
            <div className="flex items-center justify-center gap-x-2">
              <AlgoIcon className="h-6 w-6" />
              <span className="font-medium text-widget-light-1">ALGO</span>
            </div>
            <ChevronDownIcon className="h-5 w-5 text-widget-light-1" />
          </div>
        </div>
        <div className="mt-1 flex w-full items-center justify-between px-4">
          <span className="text-sm text-widget-light-2">$9.55</span>
          <div className="flex items-center justify-center gap-x-2">
            <span className="text-sm font-semibold text-widget-light-2">2682.844</span>
            <span className="text-sm font-semibold text-primary">MAX</span>
          </div>
        </div>
      </div>

      {/* To Input */}
      <div className="flex w-full flex-col gap-y-1">
        <h3 className="text-sm text-widget-light-1">To</h3>
        <div className="flex w-full items-center justify-between rounded border border-widget-light-2 px-4 py-3">
          <p>9.55</p>
          <div className="flex items-center justify-center gap-x-4">
            <div className="flex items-center justify-center gap-x-2">
              <UsdcIcon className="h-6 w-6" />
              <span className="font-medium text-widget-light-1">USDC</span>
            </div>
            <ChevronDownIcon className="h-5 w-5 text-widget-light-1" />
          </div>
        </div>
        <div className="mt-1 flex w-full items-center justify-between px-4">
          <span className="text-sm text-widget-light-2">$9.54</span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex w-full items-center justify-between gap-x-3">
        <div className="flex w-full items-center">
          <span
            style={{ width: `${((COUNTDOWN_TOTAL_SECONDS - count) / COUNTDOWN_TOTAL_SECONDS) * 100}%` }}
            className="h-1 rounded-l-full bg-widget-timer opacity-20"
          ></span>
          <span className="h-3 w-3 rounded-full bg-widget-timer"></span>
          <span
            style={{ width: `${(count / COUNTDOWN_TOTAL_SECONDS) * 100}%` }}
            className="h-1 rounded-r-full bg-widget-timer"
          ></span>
        </div>
        <span className="font-semibold text-widget-timer">{count}</span>
      </div>
      {/* Info Box */}
      <div className="flex w-full flex-col justify-center gap-y-2 rounded-md bg-widget-base-2 px-4 py-3">
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-widget-light-2">Wallet Address</span>
          <span className="text-sm font-medium text-widget-light-1">SDPFJSDO...PQEL</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-widget-light-2">Minimum Received</span>
          <span className="text-sm font-medium text-widget-light-1">9.5428 USDC</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-widget-light-2">Price Impact</span>
          <span className="text-sm font-medium text-widget-light-1">4.98%</span>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-widget-light-2">Slippage</span>
          <div className="flex items-center justify-center gap-x-2">
            <MinusIcon className="h-4 w-4 text-primary [&>path]:stroke-[4]" />
            <span className="text-sm font-medium text-widget-light-1 underline underline-offset-4">0.5%</span>
            <PlusIcon className="h-4 w-4 text-primary [&>path]:stroke-[4]" />
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="flex w-full items-center justify-end">
        <div className="flex items-center justify-center rounded-md bg-primary px-14 py-3 text-sm text-primary-content">
          Swap
        </div>
      </div>
    </div>
  );
};
