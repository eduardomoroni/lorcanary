import { CardSearchFilter } from "@/components/app/CardSearchFilter";
import { getAllCards } from "@/data/lorcanitoCards";
import { CardsList } from "@/components/app/CardsList";

export default async function CardsListPage() {
  const cards = await getAllCards();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CardSearchFilter />
        </div>
        <CardsList cards={cards.cards || []} />
      </div>
    </main>
  );
}
