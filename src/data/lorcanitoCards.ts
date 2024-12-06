import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { cardNameToUrlSafeString } from "@/shared/strings";
import { mock } from "@/data/mock";

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
