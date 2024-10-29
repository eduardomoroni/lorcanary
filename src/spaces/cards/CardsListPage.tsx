import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";
import { getAllCards } from "@/data/lorcanitoCards";
import { createCardUrl } from "@/spaces/cards/utils";
import { cardFullName, cardNameToUrlSafeString } from "@/shared/strings";
import Image from "next/image";

export default async function CardsListPage() {
  const cards = await getAllCards();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 bg-gray-800 border-gray-700 text-white"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <Button
            aria-label="Card Search Filters"
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <SlidersHorizontal className="mr-2" size={20} />
            Filters
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {cards.cards.map((card) => {
            const alt = cardFullName(card.name, card.title);
            const urlSafeName = cardNameToUrlSafeString(card.name, card.title);

            return (
              <a
                key={card.id}
                href={`/cards/${urlSafeName}`}
                className="block cursor-pointer"
              >
                <Card
                  key={card.id}
                  className="bg-gray-800 border-gray-700 overflow-hidden aspect-[3/4] flex flex-col"
                >
                  <div className="z-10 relative flex-grow">
                    <Image
                      unoptimized
                      src={createCardUrl(card.set, Number(card.number), {
                        language: "EN",
                      })}
                      alt={alt}
                      height={1024}
                      width={734}
                      className="w-full h-full object-cover"
                    />
                    {/*<div className="absolute top-2 left-2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold">*/}
                    {/*  {card.cost}*/}
                    {/*</div>*/}
                  </div>
                  <CardContent className="z-20 p-2 flex-shrink-0">
                    <h3 className="text-lg font-bold truncate">{card.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {card.text}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {card.type}
                    </p>
                    {/*<div className="mt-1 text-sm line-clamp-2">{card.ability}</div>*/}
                    {card.flavour && (
                      <p className="mt-1 text-xs italic line-clamp-1">
                        "{card.flavour}"
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="z-20 bg-gray-700 p-2 flex justify-between items-center flex-shrink-0">
                    <div className="flex items-center space-x-1">
                      <div className="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center text-xs font-bold">
                        {card.cost}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold">
                        {card.strength}
                      </div>
                      <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold">
                        {card.willpower}
                      </div>
                    </div>
                    {/*<div className="text-green-400 font-bold">*/}
                    {/*  ${card.price.toFixed(2)}*/}
                    {/*</div>*/}
                  </CardFooter>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
