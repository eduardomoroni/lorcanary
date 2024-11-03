import { cardFullName, cardNameToUrlSafeString } from "@/shared/strings";
import {
  allLorcanitoCardNames,
  getCardByName,
  getCardBySetAndNumber,
} from "@/data/lorcanitoCards";
import Head from "next/head";
import { CardImage } from "@/spaces/cards/CardImage";
import { createCardUrl } from "@/spaces/cards/utils";
import CardPageLayout from "@/spaces/cards/CardPageLayout";

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

    return <CardPageLayout card={card} />;
  } catch (error) {
    return {
      status: 404,
      error: error,
    };
  }
}
