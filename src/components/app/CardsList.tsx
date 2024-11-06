"use client"; // TODO: REVIST THIS, client side only can hurt performance

import Image from "next/image";
import { createCardUrl } from "@/spaces/cards/utils";
import { cardFullName, cardNameToUrlSafeString } from "@/shared/strings";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { useLocalStorage } from "@uidotdev/usehooks";
import {
  Filter,
  filterByAttributes,
  filterCards,
} from "@/spaces/cards/cardFilterHelpers";
import Link from "next/link";

type Props = {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
  cards: LorcanitoCard[];
};

const SSR_CARDS_LIMIT = 30;

export function SSRCardsListFallback({ cards, ...filters }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {cards
        .filter(filterByAttributes(filters))
        .slice(0, SSR_CARDS_LIMIT)
        .map((card) => (
          <CardListItem key={card.id} card={card} />
        ))}
    </div>
  );
}

export function CardsList({ cards }: Props) {
  const [filters] = useLocalStorage<Filter[]>("cardSearchFilters", []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {cards.filter(filterCards(filters)).map((card) => (
        <CardListItem key={card.id} card={card} />
      ))}
    </div>
  );
}

function CardListItem({ card }: { card: LorcanitoCard }) {
  const alt = cardFullName(card.name, card.title);
  const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

  return (
    <Link
      key={card.id}
      prefetch={false}
      href={`/cards/${urlSafeName}`}
      className="block cursor-pointer"
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
            <p className="mt-1 text-xs italic line-clamp-1">"{card.flavour}"</p>
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
    </Link>
  );
}
