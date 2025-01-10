import { FC } from "react";
import clsx from "clsx";

const icons = {
  amber: "https://lorcana-cards.pages.dev/assets/icons/amber.svg",
  amethyst: "https://lorcana-cards.pages.dev/assets/icons/amethyst.svg",
  emerald: "https://lorcana-cards.pages.dev/assets/icons/emerald.svg",
  ruby: "https://lorcana-cards.pages.dev/assets/icons/ruby.svg",
  sapphire: "https://lorcana-cards.pages.dev/assets/icons//sapphire.svg",
  steel: "https://lorcana-cards.pages.dev/assets/icons//steel.svg",
} as const;

export const InkColorIcon: FC<{
  color: keyof typeof icons;
  className?: string;
}> = (props) => {
  const { color, className } = props;

  return (
    <img
      src={icons[color]}
      key={color}
      alt={color}
      className={clsx("inline h-10 w-10 rounded-full", className)}
    />
  );
};
