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

  console.log(locale);

  const card = await (isSet
    ? getCardBySetAndNumber(setOrName, number)
    : getCardByName(setOrName));

  if (!card) {
    return {
      title: "Lorcanary",
      description: "Disney Lorcana Card Library",
      keywords: ["Disney Lorcana", "Lorcana", "TCG", "Card Database"],
    };
  }

  const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

  const description = card.text || "Lorcanary Disney Lorcana Card Library";
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
    applicationName: "Lorcanary",
    alternates: {
      languages: {
        fr: `https://lorcanary.com/fr/cards/${urlSafeName}`,
        de: `https://lorcanary.com/de/cards/${urlSafeName}`,
        en: `https://lorcanary.com/en/cards/${urlSafeName}`,
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

  const description = card.text || "Lorcanary Disney Lorcana Card Library";
  const title = cardFullName(card.name, card.title);
  const alt = title;
  const cardNumber = String(card.number).padStart(3, "0");
  const cardSet = String(card.set).padStart(3, "0");

  const openGraph: OpenGraph = {
    title: title,
    description: description,
    url: `https://lorcanary.com/cards/${urlSafeName}`,
    siteName: "Lorcanary",
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
