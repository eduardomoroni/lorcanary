import { cardNameToUrlSafeString } from "@/shared/strings";
import { allCards } from "@/db/cards/cards";

export async function getCardBySetAndNumber(set: string, number: string) {
  return getAllCards().then((data) =>
    data.find((card) => Number(card.number) === Number(number)),
  );
}

export async function getAllCards() {
  return allCards;
}

export async function getCardByName(name: string, title?: string) {
  return getAllCards().then((data) =>
    data.find(
      (card) =>
        cardNameToUrlSafeString(card.name, card.title) === name ||
        cardNameToUrlSafeString(card.name, card.title) ===
          cardNameToUrlSafeString(name, title),
    ),
  );
}

export async function allLorcanitoCardNames(): Promise<string[]> {
  return getAllCards().then((data) =>
    data.map((card) => cardNameToUrlSafeString(card.name, card.title)),
  );
}
