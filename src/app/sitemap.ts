import type { MetadataRoute } from "next";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { getAllCards } from "@/data/lorcanitoCards";
import { cardNameToUrlSafeString } from "@/shared/strings";
import { convertCardSet } from "@/spaces/cards/utils";

const lastModified = "2024-10-27";
const baseUrl = `https://lorcanary.com`;

function generateAlternates(url: string) {
  return {
    languages: {
      fr: url.replace(".com/cards", ".com/fr/cards"),
      de: url.replace(".com/cards", ".com/de/cards"),
      en: url.replace(".com/cards", ".com/en/cards"),
    },
  } as const;
}

function createCardPageSitemap(card: LorcanitoCard): MetadataRoute.Sitemap {
  const set = convertCardSet(card.set);
  const number = card.number.toString().padStart(3, "0");
  const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

  const images = [
    // `https://six-inks.pages.dev/assets/images/cards/${set}/art_only/${number}.webp`,
    `https://six-inks.pages.dev/assets/images/cards/EN/${set}/${number}.webp`,
    `https://six-inks.pages.dev/assets/images/cards/FR/${set}/${number}.webp`,
    `https://six-inks.pages.dev/assets/images/cards/DE/${set}/${number}.webp`,
    // `https://six-inks.pages.dev/assets/images/cards/EN/${set}/art_and_name/${number}.webp`,
  ];

  const sitemap: MetadataRoute.Sitemap = [
    {
      priority: 0.5,
      lastModified: lastModified,
      changeFrequency: "weekly",
      images,
      url: `https://lorcanary.com/cards/${set}/${number}`,
      alternates: generateAlternates(
        `https://lorcanary.com/cards/${set}/${number}`,
      ),
    },
    {
      priority: 1,
      lastModified: lastModified,
      changeFrequency: "weekly",
      images,
      url: `https://lorcanary.com/cards/${urlSafeName}`,
      alternates: generateAlternates(
        `https://lorcanary.com/cards/${urlSafeName}`,
      ),
    },
  ];

  if (card.title) {
    const endpoint = `${cardNameToUrlSafeString(card.name)}/${cardNameToUrlSafeString(card.title)}`;
    sitemap.push({
      priority: 0.75,
      lastModified: lastModified,
      changeFrequency: "weekly",
      images,
      url: `${baseUrl}/cards/${endpoint}`,
      alternates: generateAlternates(`${baseUrl}/cards/${endpoint}`),
    });
  }

  return sitemap;
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cards = await getAllCards();

  return cards.map((card) => createCardPageSitemap(card)).flat();
}
