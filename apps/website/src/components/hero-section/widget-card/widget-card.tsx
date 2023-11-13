import { useState, type ReactNode } from "react";

import { WidgetCardBack } from "@components/hero-section/widget-card/widget-card-back";
import { WidgetCardFront } from "@components/hero-section/widget-card/widget-card-front";

export const WidgetCard = ({ children }: { children: ReactNode }) => {
  const [side, setSide] = useState<"front" | "back">("front");

  const handleFlipSide = () => {
    setSide((prev) => (prev === "front" ? "back" : "front"));
  };

  return (
    <div
      data-side={side}
      className="group/card relative h-[34rem] w-96 rounded-2xl perspective-[100rem] lg:h-[36.5rem] lg:w-[32.5rem]"
    >
      <WidgetCardFront onTimerExpired={() => setSide("back")} onFlipSideClicked={handleFlipSide} />
      <WidgetCardBack onFlipSideClicked={handleFlipSide}>{children}</WidgetCardBack>
    </div>
  );
};
