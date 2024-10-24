import type { MetadataRoute } from "next";

function createCardPageSitemap(
  cardNumber: number | string,
): MetadataRoute.Sitemap {
  const set = "004";
  const number = cardNumber.toString().padStart(3, "0");

  const sitemap: MetadataRoute.Sitemap = [
    {
      priority: 1,
      url: `https://lorcanary.com/cards/${number}`,
      lastModified: "2024-10-24",
      changeFrequency: "weekly",
      images: [
        `https://six-inks.pages.dev/assets/images/cards/${set}/art_only/${number}.webp`,
        `https://six-inks.pages.dev/assets/images/cards/EN/${set}/${number}.webp`,
        `https://six-inks.pages.dev/assets/images/cards/EN/${set}/art_and_name/${number}.webp`,
      ],
      alternates: {
        languages: {
          fr: `https://lorcanary.com/fr/cards/${number}`,
          de: `https://lorcanary.com/de/cards/${number}`,
          en: `https://lorcanary.com/en/cards/${number}`,
        },
      },
    },
  ];

  return sitemap;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Array.from({ length: 204 }, (_, i) => i + 1).flatMap((cardNumber) =>
    createCardPageSitemap(cardNumber),
  );
}
