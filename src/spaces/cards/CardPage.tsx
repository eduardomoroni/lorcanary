import {
  allLorcanitoCardNames,
  getCardByName,
  getCardBySetAndNumber,
} from "@/data/lorcanitoCards";
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

export default async function Page({ params, ...rest }: CardPageProps) {
  try {
    const { number, setOrName } = await params;

    for (const key in rest) {
      console.log(key, await rest[key]);
    }

    const isSet = !!number && !isNaN(Number(setOrName));

    const card = await (isSet
      ? getCardBySetAndNumber(setOrName, number)
      : getCardByName(setOrName, number));

    if (!card) {
      return (
        <main>
          <p>{`Card not found: ${number} ${setOrName}`}</p>
        </main>
      );
    }

    return <CardPageLayout card={card} />;
  } catch (error) {
    return <p>Status: {JSON.stringify(error)}</p>;
  }
}
