import { getAllCards } from "@/data/lorcanitoCards";
import { ClientOnly } from "@/components/app/ClientSideOnly";
import { CardsList, SSRCardsListFallback } from "@/components/app/CardsList";
import {
  CardSearchFilter,
  SSRCardSearchFilterFallback,
} from "@/components/app/CardSearchFilter";
import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { fromSearchParamsToFilters } from "@/spaces/cards/cardFilterHelpers";

type Props = {
  color?: LorcanitoCard["color"];
  type?: LorcanitoCard["type"];
};

export default async function CardsListPage(props: Props) {
  const cards = await getAllCards();

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <ClientOnly
            loading={
              <SSRCardSearchFilterFallback
                filters={fromSearchParamsToFilters(props)}
              />
            }
          >
            <CardSearchFilter {...props} />
          </ClientOnly>
        </div>
        <ClientOnly loading={<SSRCardsListFallback {...props} cards={cards} />}>
          <CardsList cards={cards} />
        </ClientOnly>
      </div>
    </main>
  );
}
