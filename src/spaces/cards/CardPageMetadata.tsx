import type { Metadata, ResolvingMetadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import type { CardPageProps } from "@/spaces/cards/CardPage";
import { getCardByName, getCardBySetAndNumber } from "@/data/lorcanitoCards";
import { cardFullName } from "@/shared/strings";

export async function generateMetadata(
  { params }: CardPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { number, setOrName } = await params;

  const isSet = !!number && !isNaN(Number(setOrName));

  const card = await (isSet
    ? getCardBySetAndNumber(setOrName, number)
    : getCardByName(setOrName));

  if (!card) {
    return {};
  }

  const alt = cardFullName(card.name, card.title);
  const cardNumber = String(card.number).padStart(3, "0");
  const cardSet = String(card.set).padStart(3, "0");

  const openGraph: OpenGraph = {
    title: "Lorcanary Card Database",
    description: "Your Lorcana Library!",
    url: `https://lorcanary.com/cards/${cardNumber}`,
    siteName: "Lorcanary",
    locale: "en",
    type: "website",
    images: [
      {
        url: `https://six-inks.pages.dev/assets/images/cards/004/art_only/${cardNumber}.webp`,
        width: 734,
        height: 603,
        alt: alt,
      },
      {
        url: `https://six-inks.pages.dev/assets/images/cards/EN/004/${cardNumber}.webp`,
        width: 734,
        height: 1024,
        alt: "My custom alt",
      },
      {
        url: `https://six-inks.pages.dev/assets/images/cards/EN/004/art_and_name/${cardNumber}.webp`,
        width: 734,
        height: 767,
        alt: "My custom alt",
      },
    ],
  };

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
    openGraph: openGraph,
    title: "Lorcanary Card Database",
    description: "Your Lorcana Library!",
    applicationName: "Lorcanary",
    alternates: {
      // TODO: IMPROVE THIS TO THE ACTUAL URL, not the one with alt
      languages: {
        fr: `https://lorcanary.com/fr/cards/${alt}`,
        de: `https://lorcanary.com/de/cards/${alt}`,
        en: `https://lorcanary.com/en/cards/${alt}`,
      },
    },
  };

  return metadata;
}
