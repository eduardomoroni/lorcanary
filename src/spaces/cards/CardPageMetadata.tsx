import type { Metadata, ResolvingMetadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import type { CardPageProps } from "@/spaces/cards/CardPage";
import { getCardByName, getCardBySetAndNumber } from "@/data/lorcanitoCards";
import { cardFullName, cardNameToUrlSafeString } from "@/shared/strings";
import { LorcanitoCard } from "@/shared/types/lorcanito";

export async function generateMetadata(
  { params }: CardPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { number, setOrName, locale } = await params;

  const isSet = !!number && !isNaN(Number(setOrName));

  const card = await (isSet
    ? getCardBySetAndNumber(setOrName, number)
    : getCardByName(setOrName));

  if (!card) {
    return {
      title: "Lorcanito",
      description: "Disney Lorcana Card Library",
      keywords: ["Disney Lorcana", "Lorcana", "TCG", "Card Database"],
    };
  }

  const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

  const description = card.text || "Lorcanito Disney Lorcana Card Library";
  const title = cardFullName(card.name, card.title);
  const alt = title;

  const metadata: Metadata = {
    keywords: [
      "Disney Lorcana",
      "Lorcana",
      "TCG",
      "DLC",
      card.title ? card.title : "",
      card.name,
      alt,
    ],
    robots: "index, follow",
    openGraph: createOpenGraphForCard(card),
    title: title,
    description: description,
    applicationName: "Lorcanito DB",
    alternates: {
      canonical: `https://db.lorcanito.com/en/cards/${urlSafeName}`,
      languages: {
        fr: `https://db.lorcanito.com/fr/cards/${urlSafeName}`,
        de: `https://db.lorcanito.com/de/cards/${urlSafeName}`,
        en: `https://db.lorcanito.com/en/cards/${urlSafeName}`,
      },
    },
  };

  return metadata;
}

function createOpenGraphForCard(card?: LorcanitoCard) {
  if (!card) {
    return undefined;
  }

  const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

  const description = card.text || "Lorcanito Disney Lorcana Card Library";
  const title = cardFullName(card.name, card.title);
  const alt = title;
  const cardNumber = String(card.number).padStart(3, "0");
  const cardSet = String(card.set).padStart(3, "0");

  const openGraph: OpenGraph = {
    title: title,
    description: description,
    url: `https://db.lorcanito.com/cards/${urlSafeName}`,
    siteName: "Lorcanito DB",
    // We need to add other locales here
    locale: "en",
    type: "website",
    images: [
      {
        url: `https://cdn-1.lorcanary.com/assets/images/cards/${cardSet}/art_only/${cardNumber}.webp`,
        width: 734,
        height: 603,
        alt: alt,
      },
      {
        url: `https://cdn-1.lorcanary.com/assets/images/cards/EN/${cardSet}/${cardNumber}.webp`,
        width: 734,
        height: 1024,
        alt: alt,
      },
      {
        url: `https://cdn-1.lorcanary.com/assets/images/cards/EN/${cardSet}/art_and_name/${cardNumber}.webp`,
        width: 734,
        height: 767,
        alt: alt,
      },
    ],
  };

  return openGraph;
}
