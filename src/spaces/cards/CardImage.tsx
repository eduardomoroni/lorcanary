import Image from "next/image";
import { createCardUrl } from "@/spaces/cards/utils";
import { LorcanitoCard } from "@/shared/types/lorcanito";
import { cardFullName } from "@/shared/strings";

export const CardImage = ({ card }: { card: LorcanitoCard }) => {
  if (!card) {
    return null;
  }
  const alt = cardFullName(card.name, card.title);

  return (
    <Image
      unoptimized
      priority
      quality={75}
      className="rounded-lg"
      src={createCardUrl(card.set, Number(card.number))}
      alt={alt}
      height={1024 / 2}
      width={734 / 2}
    />
  );
};
