import type { MetadataRoute } from "next";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { getAllCards } from "@/data/lorcanitoCards";
import { cardNameToUrlSafeString } from "@/shared/strings";

function createCardPageSitemap(card: LorcanitoCard): MetadataRoute.Sitemap {
  const set = card.set.padStart(3, "0");
  const number = card.number.toString().padStart(3, "0");
  const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

  const images = [
    `https://six-inks.pages.dev/assets/images/cards/${set}/art_only/${number}.webp`,
    `https://six-inks.pages.dev/assets/images/cards/EN/${set}/${number}.webp`,
    `https://six-inks.pages.dev/assets/images/cards/EN/${set}/art_and_name/${number}.webp`,
  ];

  const sitemap: MetadataRoute.Sitemap = [
    {
      priority: 0.5,
      lastModified: "2024-10-24",
      changeFrequency: "weekly",
      images,
      url: `https://lorcanary.com/cards/${set}/${number}`,
      alternates: {
        languages: {
          fr: `https://lorcanary.com/fr/cards/${set}/${number}`,
          de: `https://lorcanary.com/de/cards/${set}/${number}`,
          en: `https://lorcanary.com/en/cards/${set}/${number}`,
        },
      },
    },
    {
      priority: 1,
      lastModified: "2024-10-24",
      changeFrequency: "weekly",
      images,
      url: `https://lorcanary.com/cards/${urlSafeName}`,
      alternates: {
        languages: {
          fr: `https://lorcanary.com/fr/cards/${urlSafeName}`,
          de: `https://lorcanary.com/de/cards/${urlSafeName}`,
          en: `https://lorcanary.com/en/cards/${urlSafeName}`,
        },
      },
    },
  ];

  return sitemap;
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { cards } = await getAllCards();

  return cards.map((card) => createCardPageSitemap(card)).flat();
}
