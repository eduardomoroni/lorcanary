"use client";

import { Button } from "@/components/ui/button";
import { Download, Save, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DeckDetailsCardsList } from "@/components/app/deckDetails/DeckDetailsCardList";
import { DBCardWIthCardJson } from "@/db/drizzle/types";
import { Fragment } from "react";
import { createDeckServerAction } from "@/spaces/decks/createDeckServerAction";

export const DeckView = ({
  cards,
}: {
  cards: Omit<DBCardWIthCardJson, "id">[];
}) => {
  const handleSaveDeck = createDeckServerAction.bind(
    null,
    cards.map((card) => ({
      qty: card.qty,
      publicId: card.lorcanitoCard.id,
    })),
  );
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
    <form
      className="w-96 bg-navy-800 flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSaveDeck(new FormData(e.currentTarget));
      }}
    >
      <Input
        className="bg-navy-900 text-white"
        placeholder="Deck Name"
        name="name"
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
        <Button size="sm" className="w-full" type="submit">
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
    </form>
  );
};
