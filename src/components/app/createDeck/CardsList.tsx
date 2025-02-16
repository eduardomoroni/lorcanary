"use client"; // TODO: REVIST THIS, client side only can hurt performance

import Image from "next/image";
import { createCardUrl } from "@/spaces/cards/utils";
import { cardFullName } from "@/shared/strings";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  Filter,
  filterByAttributes,
  filterCards,
} from "@/spaces/cards/cardFilterHelpers";

type Props = {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
  cards: LorcanitoCard[];
  handleSelectCard: (card: LorcanitoCard) => void;
};

const SSR_CARDS_LIMIT = 6 * 4;
const CLIENT_CARDS_LIMIT = 6 * 20;

export function SSRCardsListFallback({
  cards,
  handleSelectCard,
  ...filters
}: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {cards
        .filter(filterByAttributes(filters))
        .slice(0, SSR_CARDS_LIMIT)
        .map((card) => (
          <CardListItem
            key={card.id}
            card={card}
            handleSelectCard={handleSelectCard}
          />
        ))}
    </div>
  );
}

// TODO: PAGINATE FOR SEO PURPOSES
export function CardsList({ cards, handleSelectCard }: Props) {
  const [filters] = useLocalStorage<Filter[]>("cardSearchFilters", []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
      {cards
        .filter(filterCards(filters))
        .slice(0, CLIENT_CARDS_LIMIT)
        .map((card) => (
          <CardListItem
            key={card.id}
            card={card}
            handleSelectCard={handleSelectCard}
          />
        ))}
    </div>
  );
}

function CardListItem({
  card,
  handleSelectCard,
}: {
  card: LorcanitoCard;
  handleSelectCard: (card: LorcanitoCard) => void;
}) {
  const alt = cardFullName(card.name, card.title);

  return (
    <div
      key={card.id}
      className="block cursor-pointer"
      onClick={() => handleSelectCard(card)}
    >
      <Card
        key={card.id}
        className="bg-gray-800 border-gray-700 overflow-hidden aspect-[3/4] flex flex-col"
      >
        <div className="z-10 relative flex-grow">
          <Image
            unoptimized
            src={createCardUrl(card.set, Number(card.number), {
              language: "EN",
            })}
            alt={alt}
            height={1024}
            width={734}
            className="w-full h-full object-cover"
          />
          {/*<div className="absolute top-2 left-2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold">*/}
          {/*  {card.cost}*/}
          {/*</div>*/}
        </div>
        <CardContent className="z-20 p-2 flex-shrink-0">
          <h3 className="text-lg font-bold truncate">{card.name}</h3>
          <p className="text-sm text-gray-400 truncate">{card.text}</p>
          <p className="text-xs text-gray-500 truncate">{card.type}</p>
          {/*<div className="mt-1 text-sm line-clamp-2">{card.ability}</div>*/}
          {card.flavour && (
            <p className="mt-1 text-xs italic line-clamp-1">
              &#34;{card.flavour}&#34;
            </p>
          )}
        </CardContent>
        <CardFooter className="z-20 bg-gray-700 p-2 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center text-xs font-bold">
              {card.cost}
            </div>
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold">
              {card.strength}
            </div>
            <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">
              {card.willpower}
            </div>
          </div>
          {/*<div className="text-green-400 font-bold">*/}
          {/*  ${card.price.toFixed(2)}*/}
          {/*</div>*/}
        </CardFooter>
      </Card>
    </div>
  );
}
