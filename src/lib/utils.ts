import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CardWithQuantity } from "@/db/drizzle/types";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const objectHash = require("object-hash");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeDeckInput(
  cards: CardWithQuantity[] = [],
): CardWithQuantity[] {
  return Object.values<CardWithQuantity>(
    cards.reduce<Record<string, CardWithQuantity>>((acc, c) => {
      if (!acc[c.publicId]) {
        acc[c.publicId] = { publicId: c.publicId, qty: c.qty };
      } else {
        acc[c.publicId].qty += c.qty;
      }

      return acc;
    }, {}),
  )
    .filter((c) => c.qty > 0)
    .sort((a, b) => a.publicId.localeCompare(b.publicId));
}

export function hashDeck(cards: CardWithQuantity[]): string {
  const data = normalizeDeckInput(cards)
    .map((c) => `${c.publicId}:${c.qty}`)
    .sort((a, b) => a.localeCompare(b));

  return objectHash.MD5(data);
}
