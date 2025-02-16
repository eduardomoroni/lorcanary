import { getAllCards } from "@/data/lorcanitoCards";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { CardsListAndDeckView } from "@/components/app/createDeck/CardsListAndDeckView";

type Props = {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
};

export default async function CreateDeckPage(props: Readonly<Props>) {
  const cards = await getAllCards();

  return (
    <main className="min-h-screen p-4">
      <div className="flex items-start gap-2">
        <CardsListAndDeckView {...props} cards={cards} />
      </div>
    </main>
  );
}
