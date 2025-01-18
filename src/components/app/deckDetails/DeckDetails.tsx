import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeckWithCards } from "@/db/drizzle/types";
import { CardList } from "@/components/app/deckDetails/DeckDetailsCardList";
import { use } from "react";

interface DeckDetailProps {
  deckPromise: Promise<DeckWithCards>;
}

export function DeckDetail({ deckPromise }: DeckDetailProps) {
  const deck = use(deckPromise);
  const characterCards = deck.currentVersion.cards.filter(
    (card) => card.lorcanitoCard.type === "character",
  );
  const actionCards = deck.currentVersion.cards.filter(
    (card) => card.lorcanitoCard.type === "action",
  );
  const locationCards = deck.currentVersion.cards.filter(
    (card) => card.lorcanitoCard.type === "location",
  );
  const itemCards = deck.currentVersion.cards.filter(
    (card) => card.lorcanitoCard.type === "item",
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-2">
            <h1 className="text-2xl font-bold">{deck.name}</h1>
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

        <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <CardList
              title="Characters"
              cards={characterCards}
              count={characterCards.length}
            />
            <CardList
              title="Actions"
              cards={actionCards}
              count={actionCards.length}
            />
            <CardList
              title="Locations"
              cards={locationCards}
              count={locationCards.length}
            />
            <CardList
              title="Items"
              cards={itemCards}
              count={itemCards.length}
            />
          </div>

          <div className="space-y-6">
            <Card className="p-4">
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
              <Button className="w-full">Shop Missing Cards</Button>
            </Card>

            <Card className="p-4">
              <h3 className="mb-4 font-semibold">Cost curve</h3>
              {/*<CostCurveChart data={deck.costCurve} />*/}
            </Card>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="p-6">
                <h3 className="mb-4 text-sm font-medium">Colors</h3>
                {/*<CustomPieChart data={deck.colors} />*/}
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-sm font-medium">Inkable</h3>
                {/*<CustomPieChart data={deck.inkable} />*/}
              </Card>
              <Card className="p-6">
                <h3 className="mb-4 text-sm font-medium">Card types</h3>
                {/*<CustomPieChart data={deck.cardTypes} />*/}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
