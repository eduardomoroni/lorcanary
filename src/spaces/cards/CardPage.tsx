import Image from "next/image";
import { createCardUrl } from "@/spaces/cards/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { LorcanitoCard } from "@/shared/types/lorcanito";
import { cardFullName, cardNameToUrlSafeString } from "@/shared/strings";
import { getCardByName, getCardBySetAndNumber } from "@/data/lorcanitoCards";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 86400; // 24 hours

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = false; // or false, to 404 on unknown paths

export const dynamic = "force-static";

type Props = {
  params: Promise<{ setOrName: string; number?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateStaticParams() {
  const allCardNames: LorcanitoCard[] = await fetch(
    "https://play.lorcanito.com/api/sets/all",
    { cache: "force-cache" },
  )
    .then((res) => res.json())
    .then((data) => {
      return data.cards.map((card: LorcanitoCard) =>
        cardNameToUrlSafeString(card.name, card.title),
      );
    });

  // This returns all possible permutations of card numbers and set names
  // Allowing the server to know what pages to generate at build time
  // Currently the pages are being generated at runtime, so improve build time
  const paths = [...Array(204).keys()].map((i) => {
    return {
      params: {
        number: i.toString().padStart(3, "0"),
        setOrName: ["001", "002", "003", "004", "005", "006", ...allCardNames],
      },
    };
  });
  return paths;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  console.log(resolvedParams);
  const alt = "Card Name";
  const cardNumber = resolvedParams.number?.padStart(3, "0");

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
    keywords: ["Disney Lorcana", "Lorcana", alt],
    robots: "index, follow",
    openGraph: openGraph,
    title: "Lorcanary Card Database",
    description: "Your Lorcana Library!",
    applicationName: "Lorcanary",
    alternates: {
      languages: {
        fr: `https://lorcanary.com/fr/cards/${cardNumber}`,
        de: `https://lorcanary.com/de/cards/${cardNumber}`,
        en: `https://lorcanary.com/en/cards/${cardNumber}`,
      },
    },
  };

  return metadata;
}

export default async function Page({ params }: Props) {
  const { number, setOrName } = await params;

  const isSet = !!number && !isNaN(Number(setOrName));

  const card = await (isSet
    ? getCardBySetAndNumber(setOrName, number)
    : getCardByName(setOrName));

  if (!card) {
    return {
      status: 404,
      error: new Error("Card not found"),
    };
  }

  return (
    <main>
      <h1>{cardNameToUrlSafeString(card.name, card.title)}</h1>
      <p>{JSON.stringify(card)}</p>
      <Image
        unoptimized
        src={createCardUrl(card.set, Number(card.number))}
        alt={cardFullName(card.name, card.title)}
        height={1024}
        width={734}
      />
    </main>
  );
}
