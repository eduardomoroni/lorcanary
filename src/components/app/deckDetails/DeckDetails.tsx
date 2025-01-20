import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DBCardWIthCardJson, DeckWithCards } from "@/db/drizzle/types";
import { CardList } from "@/components/app/deckDetails/DeckDetailsCardList";
import { use } from "react";
import { CostCurveChart } from "@/components/app/deckDetails/deckCharts/CostCurve";
import { ColorsPieChart } from "@/components/app/deckDetails/deckCharts/ColorsPieChart";
import { CardTypesPieChart } from "@/components/app/deckDetails/deckCharts/CardTypesPieChart";
import { CardInkPieChart } from "@/components/app/deckDetails/deckCharts/InkPieChart";

interface DeckDetailProps {
  deckPromise: Promise<DeckWithCards>;
}

export function DeckDetail({ deckPromise }: DeckDetailProps) {
  const deck = use(deckPromise);
  const cardCategories: { [key: string]: DBCardWIthCardJson[] } =
    deck.currentVersion.cards.reduce(
      (acc, card: DBCardWIthCardJson) => {
        const type = card.lorcanitoCard.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(card);
        return acc;
      },
      {} as { [key: string]: DBCardWIthCardJson[] },
    );

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto p-6">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
            <div className="mb-4 flex items-center gap-2">
              <h1 className="text-2xl font-bold text-black dark:text-white">
                {deck.name}
              </h1>
              <div className="flex gap-2">
                {[].map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            {/*<Stats stats={deck.stats} />*/}
            {Object.entries(cardCategories).map(([type, cards]) => (
              <CardList
                key={type}
                title={type.charAt(0).toUpperCase() + type.slice(1) + "s"}
                cards={cards}
                count={cards.reduce((acc, card) => acc + card.qty, 0)}
              />
            ))}
          </div>

          <div className="space-y-6">
            {/*<Card className="p-4 bg-main dark:bg-secondaryBlack">*/}
            {/*  <div className="mb-4 flex items-center justify-between">*/}
            {/*    /!*  <div>*!/*/}
            {/*    /!*    <div className="text-sm text-gray-400">Total</div>*!/*/}
            {/*    /!*    <div className="text-2xl font-bold text-green-400">*!/*/}
            {/*    /!*      ${deck.stats.price.toFixed(2)}*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*  </div>*!/*/}
            {/*    /!*  <div>*!/*/}
            {/*    /!*    <div className="text-sm text-gray-400">Collection</div>*!/*/}
            {/*    /!*    <div className="text-2xl font-bold">*!/*/}
            {/*    /!*      {deck.stats.collectionPercent.toFixed(1)}%*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*  </div>*!/*/}
            {/*  </div>*/}
            {/*  <Button className="w-full bg-main dark:bg-secondaryBlack text-black dark:text-white">*/}
            {/*    Shop Missing Cards*/}
            {/*  </Button>*/}
            {/*</Card>*/}

            <Card className="p-4 bg-main dark:bg-secondaryBlack">
              <h3 className="mb-4 font-semibold text-black dark:text-white">
                Cost curve
              </h3>
              <CostCurveChart data={deck.currentVersion.cards} />
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="p-6 bg-main dark:bg-secondaryBlack">
                <h3 className="mb-4 text-sm font-medium text-black dark:text-white">
                  Colors
                </h3>
                <ColorsPieChart data={deck.currentVersion.cards} />
              </Card>
              <Card className="p-6 bg-main dark:bg-secondaryBlack">
                <h3 className="mb-4 text-sm font-medium text-black dark:text-white">
                  Inkable
                </h3>
                <CardInkPieChart data={deck.currentVersion.cards} />
              </Card>
              <Card className="p-6 bg-main dark:bg-secondaryBlack">
                <h3 className="mb-4 text-sm font-medium text-black dark:text-white">
                  Card types
                </h3>
                <CardTypesPieChart data={deck.currentVersion.cards} />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
