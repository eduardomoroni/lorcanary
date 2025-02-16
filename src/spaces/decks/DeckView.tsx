"use client";

import { Button } from "@/components/ui/button";
import { Download, Save, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DeckDetailsCardsList } from "@/components/app/deckDetails/DeckDetailsCardList";
import { DBCardWIthCardJson } from "@/db/drizzle/types";
import { ChangeEvent, Fragment } from "react";

export const DeckView = ({
  cards,
  handleSaveDeck,
  handleSetDeckName,
}: {
  cards: Omit<DBCardWIthCardJson, "id">[];
  handleSaveDeck: () => void;
  handleSetDeckName: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const cardCategories: { [key: string]: Omit<DBCardWIthCardJson, "id">[] } =
    cards.reduce(
      (acc, card: Omit<DBCardWIthCardJson, "id">) => {
        const type = card.lorcanitoCard.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(card);
        return acc;
      },
      {} as { [key: string]: Omit<DBCardWIthCardJson, "id">[] },
    );

  return (
    <div className="w-96 bg-navy-800 flex flex-col">
      <Input
        className="bg-navy-900 text-white"
        placeholder="Deck Name"
        onChange={handleSetDeckName}
      />

      <div className="p-4">
        <div className="flex justify-between text-sm text-black dark:text-white mb-2">
          <span>Total Cards</span>
          <span>{cards.reduce((acc, card) => acc + card.qty, 0)}</span>
        </div>
        {/*<div className="flex justify-between text-gray-400">*/}
        {/*  <span>Total Price</span>*/}
        {/*  <span>${22}</span>*/}
        {/*</div>*/}
      </div>

      <div className="p-4 space-y-2">
        {Object.entries(cardCategories).map(([type, cards]) => (
          <Fragment key={type}>
            <h2 className="text-lg font-semibold text-black dark:text-white">
              {type.charAt(0).toUpperCase() + type.slice(1) + "s"}
            </h2>
            <DeckDetailsCardsList cards={cards} />
          </Fragment>
        ))}
      </div>

      <div className="p-4  gap-2 grid grid-cols-3">
        <Button size="sm" className="w-full" onClick={handleSaveDeck}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button size="sm" className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button size="sm" className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
};
