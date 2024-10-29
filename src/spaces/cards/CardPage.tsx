import { cardFullName, cardNameToUrlSafeString } from "@/shared/strings";
import {
  allLorcanitoCardNames,
  getCardByName,
  getCardBySetAndNumber,
} from "@/data/lorcanitoCards";
import Head from "next/head";
import { CardImage } from "@/spaces/cards/CardImage";
import { createCardUrl } from "@/spaces/cards/utils";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 86400; // 24 hours

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export const dynamic = "force-static";

export type CardPageProps = {
  params: Promise<{ setOrName: string; number?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata
export async function generateStaticParams() {
  const allCardNames = await allLorcanitoCardNames();

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

export default async function Page({ params }: CardPageProps) {
  try {
    const { number, setOrName } = await params;

    const isSet = !!number && !isNaN(Number(setOrName));

    const card = await (isSet
      ? getCardBySetAndNumber(setOrName, number)
      : getCardByName(setOrName, number));

    if (!card) {
      return {
        status: 404,
        error: new Error("Card not found"),
      };
    }

    const alt = cardFullName(card.name, card.title);
    const urlSafeName = cardNameToUrlSafeString(card.name, card.title);
    const imageUrl = createCardUrl(card.set, Number(card.number), {
      language: "EN",
    });

    return (
      <>
        <Head>
          <link rel="preload" href={imageUrl} as="image" />
          <link
            rel="alternate"
            hrefLang="en"
            href={`https://lorcanary.com/cards/en/${urlSafeName}`}
          />
          <link
            rel="alternate"
            hrefLang="de"
            href={`https://lorcanary.com/cards/de/${urlSafeName}`}
          />
          <link
            rel="alternate"
            hrefLang="fr"
            href={`https://lorcanary.com/cards/fr/${urlSafeName}`}
          />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`https://lorcanary.com/cards/${urlSafeName}`}
          />
          {/*https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls*/}
          <link
            rel="canonical"
            href={`https://lorcanary.com/cards/${urlSafeName}`}
          />
        </Head>
        <main>
          <h1>{alt}</h1>
          <CardImage card={card} />
          <h2>{cardNameToUrlSafeString(card.name, card.title)}</h2>

          {Object.entries(card).map(([key, value]) => {
            if (key === "abilities") {
              return null;
            }

            return (
              <p key={key}>
                <strong>{key}</strong>: {value}
              </p>
            );
          })}
        </main>
      </>
    );
  } catch (error) {
    return {
      status: 404,
      error: error,
    };
  }
}
