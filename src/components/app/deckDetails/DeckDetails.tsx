import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DBCardWIthCardJson, DeckWithCards } from "@/db/drizzle/types";
import { CardList } from "@/components/app/deckDetails/DeckDetailsCardList";
import { use } from "react";

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
        <div className="mb-6">
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
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-8">
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
            <Card className="p-4 bg-main dark:bg-secondaryBlack">
              <div className="mb-4 flex items-center justify-between">
                {/*  <div>*/}
                {/*    <div className="text-sm text-gray-400">Total</div>*/}
                {/*    <div className="text-2xl font-bold text-green-400">*/}
                {/*      ${deck.stats.price.toFixed(2)}*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*  <div>*/}
                {/*    <div className="text-sm text-gray-400">Collection</div>*/}
                {/*    <div className="text-2xl font-bold">*/}
                {/*      {deck.stats.collectionPercent.toFixed(1)}%*/}
                {/*    </div>*/}
                {/*  </div>*/}
              </div>
              <Button className="w-full bg-main dark:bg-secondaryBlack text-black dark:text-white">
                Shop Missing Cards
              </Button>
            </Card>

            <Card className="p-4 bg-main dark:bg-secondaryBlack">
              <h3 className="mb-4 font-semibold text-black dark:text-white">
                Cost curve
              </h3>
              {/*<CostCurveChart data={deck.costCurve} />*/}
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="p-6 bg-main dark:bg-secondaryBlack">
                <h3 className="mb-4 text-sm font-medium text-black dark:text-white">
                  Colors
                </h3>
                {/*<CustomPieChart data={deck.colors} />*/}
              </Card>
              <Card className="p-6 bg-main dark:bg-secondaryBlack">
                <h3 className="mb-4 text-sm font-medium text-black dark:text-white">
                  Inkable
                </h3>
                {/*<CustomPieChart data={deck.inkable} />*/}
              </Card>
              <Card className="p-6 bg-main dark:bg-secondaryBlack">
                <h3 className="mb-4 text-sm font-medium text-black dark:text-white">
                  Card types
                </h3>
                {/*<CustomPieChart data={deck.cardTypes} />*/}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
