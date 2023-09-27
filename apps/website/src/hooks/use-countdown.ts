//usehooks-ts.com/react-hook/use-countdown

import { useCallback } from "react";

import { useBoolean } from "@hooks/use-boolean";
import { useCounter } from "@hooks/use-counter";
import { useInterval } from "@hooks/use-interval";

interface CountdownOption {
  countStart: number;
  intervalMs?: number;
  isIncrement?: boolean;
  countStop?: number;
}
interface CountdownControllers {
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}

/**
 * New interface with default value
 *
 * @param  {CountdownOption} countdownOption
 * @param  {number} countdownOption.countStart - the countdown's starting number, initial value of the returned number.
 * @param  {?number} countdownOption.countStop -  `0` by default, the countdown's stopping number. Pass `-Infinity` to decrease forever.
 * @param  {?number} countdownOption.intervalMs - `1000` by default, the countdown's interval, in milliseconds.
 * @param  {?boolean} countdownOption.isIncrement - `false` by default, true if the countdown is increment.
 * @returns [counter, CountdownControllers]
 */
export function useCountdown(countdownOption: CountdownOption): [number, CountdownControllers];

export function useCountdown(countdownOption: CountdownOption): [number, CountdownControllers] {
  // let countStart, intervalMs, isIncrement: boolean | undefined, countStop: number | undefined;

  const { countStart } = countdownOption;
  let { intervalMs, isIncrement, countStop } = countdownOption;

  // default values
  intervalMs = intervalMs ?? 1000;
  isIncrement = isIncrement ?? false;
  countStop = countStop ?? 0;

  const { count, increment, decrement, reset: resetCounter } = useCounter(countStart);

  /**
   * Note: used to control the useInterval
   * running: If true, the interval is running
   * start: Should set running true to trigger interval
   * stop: Should set running false to remove interval
   */
  const { value: isCountdownRunning, setTrue: startCountdown, setFalse: stopCountdown } = useBoolean(false);

  /**
   * Will set running false and reset the seconds to initial value
   */
  const resetCountdown = () => {
    stopCountdown();
    resetCounter();
  };

  const countdownCallback = useCallback(() => {
    if (count === countStop) {
      stopCountdown();
      return;
    }

    if (isIncrement) {
      increment();
    } else {
      decrement();
    }
  }, [count, countStop, decrement, increment, isIncrement, stopCountdown]);

  useInterval(countdownCallback, isCountdownRunning ? intervalMs : null);

  return [
    count,
    {
      startCountdown,
      stopCountdown,
      resetCountdown,
    } as CountdownControllers,
  ];
}
