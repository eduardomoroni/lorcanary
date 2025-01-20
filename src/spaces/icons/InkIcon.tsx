import { FC } from "react";
import clsx from "clsx";

const inktypes = {
  inkless:
    "https://lorcana-cards.pages.dev/assets/images/tts/icons/inkless.svg",
  inkpot: "https://lorcana-cards.pages.dev/assets/images/tts/icons/inkpot.svg",
} as const;

export const InkIcon: FC<{
  inktype: keyof typeof inktypes;
  inkCost: number;
  className?: string;
}> = (props) => {
  const { inktype, className, inkCost } = props;

  return (
    <div className="relative inline-block">
      <img
        src={inktypes[inktype]}
        key={inktype}
        alt={inktype}
        className={clsx("h-10 w-10 rounded-full", className)}
      />
      <span className="absolute inset-0 flex items-center justify-center text-white">
        {inkCost}
      </span>
    </div>
  );
};
