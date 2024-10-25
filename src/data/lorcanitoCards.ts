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

export async function getCardByName(
  name: string,
): Promise<LorcanitoCard | undefined> {
  return fetch(`https://play.lorcanito.com/api/sets/all`, {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data) =>
      data.cards.find(
        (card: LorcanitoCard) =>
          cardNameToUrlSafeString(card.name, card.title) === name,
      ),
    );
}
