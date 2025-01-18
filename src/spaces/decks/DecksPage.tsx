"use client";

import { DeckThumbnail } from "@/db/drizzle/types";
import { DeckList } from "@/components/app/DecksList";
import { use } from "react";

export type CardPageProps = {
  decks: Promise<DeckThumbnail[]>;
};

export function DecksPage(props: CardPageProps) {
  const allDecks = use(props.decks);
  return <DeckList decks={allDecks} />;
}
