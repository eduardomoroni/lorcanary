"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useLiveGamesByDeckListId } from "@/db/instant/instant.client";

const icons = {
  amber: "https://lorcana-cards.pages.dev/assets/icons/amber.svg",
  amethyst: "https://lorcana-cards.pages.dev/assets/icons/amethyst.svg",
  emerald: "https://lorcana-cards.pages.dev/assets/icons/emerald.svg",
  ruby: "https://lorcana-cards.pages.dev/assets/icons/ruby.svg",
  sapphire: "https://lorcana-cards.pages.dev/assets/icons/sapphire.svg",
  steel: "https://lorcana-cards.pages.dev/assets/icons/steel.svg",
} as const;

export function LiveGames({ idOrPublicId }: { idOrPublicId: string }) {
  const { data, error, isLoading } = useLiveGamesByDeckListId(idOrPublicId);

  return (
    <Card className="md:col-span-2 bg-main dark:bg-secondaryBlack text-black dark:text-white">
      <CardHeader>
        <CardTitle>Live Games</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-6">
            {data.map((lobby) => {
              const players = Object.values(lobby.players);

              const href = `https://play.lorcanito.com/games/${lobby.id}?referrer=deck-list-lorcanary`;

              return (
                <Link
                  href={href}
                  target="_blank"
                  key={lobby.id}
                  className="block hover:bg-muted p-2 rounded-lg transition-colors border border-black"
                >
                  <div className="">
                    <h3 className="text-xl font-bold">{lobby.name}</h3>
                  </div>
                  <div className="flex  text-muted-foreground">
                    <div className="flex items-center">
                      <span>{players[0].name + " "}</span>
                      {/*<div className="flex gap-1">*/}
                      {/*  <Badge className="bg-emerald-500/20 text-emerald-500">*/}
                      {/*    E*/}
                      {/*  </Badge>*/}
                      {/*  <Badge className="bg-purple-500/20 text-purple-500">*/}
                      {/*    A*/}
                      {/*  </Badge>*/}
                      {/*</div>*/}
                    </div>
                    <span className="font-extrabold mx-2"> VS </span>
                    <div className="flex items-center">
                      <div className="flex">
                        {/*<Badge className="bg-purple-500/20 text-purple-500">*/}
                        {/*  A*/}
                        {/*</Badge>*/}
                        {/*<Badge className="bg-slate-500/20 text-slate-500">*/}
                        {/*  S*/}
                        {/*</Badge>*/}
                      </div>
                      <span>{" " + players[1].name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
