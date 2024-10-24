import type { MetadataRoute } from "next";

function createCardPageSitemap(
  cardNumber: number | string,
): MetadataRoute.Sitemap {
  const set = "004";
  const number = cardNumber.toString().padStart(3, "0");

  const sitemap: MetadataRoute.Sitemap = [
    {
      url: `https://lorcanary.com/cards/${number}`,
      lastModified: "2024-10-24",
      changeFrequency: "weekly",
      images: [
        `https://six-inks.pages.dev/assets/images/cards/004/${set}/${number}.webp`,
        `https://six-inks.pages.dev/assets/images/cards/EN/${set}/${number}.webp`,
        `https://six-inks.pages.dev/assets/images/cards/EN/${set}/art_and_name/${number}.webp`,
      ],
      priority: 1,
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
