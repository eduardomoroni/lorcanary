import { getAllCards } from "@/data/lorcanitoCards";
import { CardsList, SSRCardsListFallback } from "@/components/app/CardsList";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";

import {
  CardSearchFilter,
  SSRCardSearchFilterFallback,
} from "@/components/app/CardSearchFilter";
import { ClientOnly } from "@/components/app/ClientSideOnly";
// const CardSearchFilter = dynamic(
//   () => import("@/components/app/CardSearchFilter"),
//   {
//     ssr: true,
//     loading: () => <p>Loading your game...</p>,
//   },
// );

export default async function CardsListPage() {
  const cards = await getAllCards();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ClientOnly loading={<SSRCardSearchFilterFallback />}>
            <CardSearchFilter />
          </ClientOnly>
        </div>
        <ClientOnly loading={<SSRCardsListFallback cards={cards} />}>
          <CardsList cards={cards} />
        </ClientOnly>
      </div>
    </main>
  );
}
