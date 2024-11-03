import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { cardNameToUrlSafeString } from "@/shared/strings";

export async function getCardBySetAndNumber(
  set: string,
  number: string,
): Promise<LorcanitoCard | undefined> {
  return fetch(`https://play.lorcanito.com/api/sets/${set}`, {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data) =>
      data.cards.find(
        (card: LorcanitoCard) => Number(card.number) === Number(number),
      ),
    );
}

export async function getAllCards(): Promise<{ cards: LorcanitoCard[] }> {
  const res = await fetch(`https://play.lorcanito.com/api/sets/all`, {
    cache: "force-cache",
    next: {
      revalidate: 3600 * 24, // 24 hours
    },
  });
  return await res.json();
}

export async function getCardByName(
  name: string,
  title?: string,
): Promise<LorcanitoCard | undefined> {
  return getAllCards().then((data) =>
    data.cards.find(
      (card: LorcanitoCard) =>
        cardNameToUrlSafeString(card.name, card.title) === name ||
        cardNameToUrlSafeString(card.name, card.title) ===
          cardNameToUrlSafeString(name, title),
    ),
  );
}

export async function allLorcanitoCardNames(): Promise<string[]> {
  return getAllCards().then((data) =>
    data.cards.map((card: LorcanitoCard) =>
      cardNameToUrlSafeString(card.name, card.title),
    ),
  );
}
