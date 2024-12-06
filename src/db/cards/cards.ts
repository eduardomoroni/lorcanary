import type { LorcanitoCard } from "./cardTypes";
import { allTFCCards, allTFCCardsById } from "./001";
import { allROFCards, allROFCardsById } from "./002";
import { allITICards, allITICardsById } from "./003";
import { allURRCards, allURRCardsById } from "./004";
import { allSSKCards, allSSKCardsById } from "./005";
import { all006Cards, all006CardsById } from "./006";

export let allCards: LorcanitoCard[] = [
  ...allTFCCards,
  ...allROFCards,
  ...allITICards,
  ...allURRCards,
  ...allSSKCards,
  ...all006Cards,
];

export let allCardsById: Record<string, LorcanitoCard> = {
  ...allTFCCardsById,
  ...allROFCardsById,
  ...allITICardsById,
  ...allURRCardsById,
  ...allSSKCardsById,
  ...all006CardsById,
};
