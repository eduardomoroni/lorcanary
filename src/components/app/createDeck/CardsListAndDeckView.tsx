"use client";

import { ClientOnly } from "@/components/app/ClientSideOnly";
import {
  CardSearchFilter,
  SSRCardSearchFilterFallback,
} from "@/components/app/CardSearchFilter";
import { fromSearchParamsToFilters } from "@/spaces/cards/cardFilterHelpers";
import {
  CardsList,
  SSRCardsListFallback,
} from "@/components/app/createDeck/CardsList";
import { DeckView } from "@/spaces/decks/DeckView";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { useCallback, useState, ChangeEvent } from "react";
import { api } from "@/data/api/react";

type Props = {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
  cards: LorcanitoCard[];
};

export type SelectedCards = {
  [key: string]: {
    qty: number;
    publicId: string;
    lorcanitoCard: LorcanitoCard;
  };
};

export const CardsListAndDeckView = (props: Props) => {
  const searchParams = { color: props.color, type: props.type };
  const [selectedCards, setSelectedCards] = useState<SelectedCards>({});
  const [deckName, setDeckName] = useState<string>("");
  const handleSelectCard = useCallback((card: LorcanitoCard) => {
    setSelectedCards((prev: SelectedCards) => {
      if (!prev[card.id]) {
        return {
          ...prev,
          [card.id]: {
            qty: 1,
            publicId: card.id,
            lorcanitoCard: card,
          },
        };
      }

      if (prev[card.id].qty === 4) {
        return prev;
      }
      return {
        ...prev,
        [card.id]: {
          qty: prev[card.id].qty + 1,
          publicId: card.id,
          lorcanitoCard: card,
        },
      };
    });
  }, []);

  const createDeckMutation = useCallback(async () => {
    await api.deck.createDeck.useMutation().mutateAsync({
      name: deckName,
      cards: Object.values(selectedCards).map((card) => ({
        qty: card.qty,
        publicId: card.publicId,
      })),
    });
  }, [deckName, selectedCards]);

  const handleSetDeckName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDeckName(e.target.value);
    },
    [setDeckName],
  );

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ClientOnly
            loading={
              <SSRCardSearchFilterFallback
                filters={fromSearchParamsToFilters(searchParams)}
              />
            }
          >
            <CardSearchFilter {...props} />
          </ClientOnly>
        </div>
        <ClientOnly
          loading={
            <SSRCardsListFallback
              {...props}
              handleSelectCard={handleSelectCard}
            />
          }
        >
          <CardsList cards={props.cards} handleSelectCard={handleSelectCard} />
        </ClientOnly>
      </div>
      <div className="flex items-start">
        <DeckView
          cards={Object.values(selectedCards)}
          handleSetDeckName={handleSetDeckName}
          createDeckMutation={createDeckMutation}
        />
      </div>
    </>
  );
};
