import Image from "next/image";
import { createCardUrl } from "@/spaces/cards/utils";
import type { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

interface Card {
  id: string;
  number: string;
  title: string;
  content: string;
  url: string;
  name: string;
}

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 86400; // 24 hours

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = false; // or false, to 404 on unknown paths

export const dynamic = "force-static";

const url = "https://play.lorcanito.com/api/sets/004";

type Props = {
  params: Promise<{ setOrName: string; number: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateStaticParams() {
  const paths = [...Array(204).keys()].map((i) => {
    return {
      params: {
        number: i.toString().padStart(3, "0"),
        setOrName: ["001", "002", "003", "004", "005", "006"],
      },
    };
  });
  return paths;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const resolvedParams = await params;
  console.log(resolvedParams);
  const alt = "Card Name";
  const cardNumber = resolvedParams.number.padStart(3, "0");

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
  const id = (await params).number.padStart(3, "0");

  const card: Card = await fetch(url, { cache: "force-cache" })
    .then((res) => res.json())
    .then((data) => {
      return data.cards.find(
        (card: { number: number }) => String(card.number) === String(id),
      );
    });

  return (
    <main>
      <h1>{id}</h1>
      <p>{JSON.stringify(card)}</p>
      <Image
        unoptimized
        src={createCardUrl("URR", Number(id))}
        alt={card.name}
        height={1024}
        width={734}
      />
    </main>
  );
}
