import type { DeckWithCards } from "@/db/types";

export type CardPageProps = {
  decks: DeckWithCards[];
};

export async function DecksPage(props: CardPageProps) {
  try {
    return (
      <main>
        <p>{JSON.stringify(props.decks, null, 2)}</p>
      </main>
    );
  } catch (error) {
    return <p>Status: {JSON.stringify(error)}</p>;
  }
}
