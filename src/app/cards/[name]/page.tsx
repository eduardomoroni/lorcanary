import Image from "next/image";
import { createCardUrl } from "@/spaces/cards/utils";
import type { Metadata, ResolvingMetadata } from "next";

interface Card {
  id: string;
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
export const dynamicParams = true; // or false, to 404 on unknown paths

const url = "https://play.lorcanito.com/api/sets/004";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateStaticParams() {
  return [...Array(204).keys()].map((i) => {
    return {
      params: {
        id: i.toString(),
      },
    };
  });
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  console.log(params);
  const metadata: Metadata = {
    openGraph: {
      title: "Lorcanary Card Database",
      description: "Your Lorcana Library!",
      url: "https://lorcanary.com",
      siteName: "Lorcanary",
      images: [
        {
          url: "https://nextjs.org/og.png",
          width: 800,
          height: 600,
        },
        {
          url: "https://nextjs.org/og-alt.png",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };

  return metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const id = (await params).name;

  const card: Card = await fetch(url)
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
