import { CardColor, LorcanitoCard } from "@/shared/types/lorcanito";
import { cardNameToUrlSafeString } from "@/shared/strings";
import { mock, allCardsById } from "@/data/mock";
import { CardWithQuantity } from "@/db/drizzle/types";

export async function getCardBySetAndNumber(
  set: string,
  number: string,
): Promise<LorcanitoCard | undefined> {
  return getAllCards().then((res) =>
    res.find(
      (card) => card.set === set && Number(card.number) === Number(number),
    ),
  );
}

export async function getAllCards(): Promise<LorcanitoCard[]> {
  return mock.cards || [];
}

export function getCardById(publicId: string): LorcanitoCard {
  const lorcanitoCard = allCardsById[publicId as keyof typeof allCardsById];

  if (!lorcanitoCard) {
    throw new Error(`Card with publicId ${publicId} not found`);
  }

  return lorcanitoCard;
}

export async function getCardByName(
  name: string,
  title?: string,
): Promise<LorcanitoCard | undefined> {
  return getAllCards().then((data) =>
    data.find(
      (card: LorcanitoCard) =>
        cardNameToUrlSafeString(card.name, card.title) === name ||
        cardNameToUrlSafeString(card.name, card.title) ===
          cardNameToUrlSafeString(name, title),
    ),
  );
}

export async function allLorcanitoCardNames(): Promise<string[]> {
  return getAllCards().then((data) =>
    data.map((card: LorcanitoCard) =>
      cardNameToUrlSafeString(card.name, card.title),
    ),
  );
}

export function getDeckColors(
  cards?: Array<{ publicId: string; id?: number }>,
): Array<CardColor> {
  if (!cards || cards.length === 0) {
    return [];
  }

  return Array.from(
    new Set(cards.map((card) => getCardById(card.publicId).color)),
  );
}
