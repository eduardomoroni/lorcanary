import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import type { DeckStats } from "@/spaces/lists/types";

export default function DeckStatsPage({ data }: { data: DeckStats }) {
  const deckStats: DeckStats = data;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Deck Stats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Stats Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <strong>Colors:</strong>
                  {deckStats.metadata?.colors.map((color) => (
                    <Badge key={color} className="ml-2 capitalize">
                      {color}
                    </Badge>
                  ))}
                </div>
                <p>
                  <strong>Total Games:</strong> {deckStats.total_games}
                </p>
                <p>
                  <strong>On the Draw:</strong> {deckStats.total_games_otd}
                </p>
                <p>
                  <strong>On the Play:</strong> {deckStats.total_games_otp}
                </p>
                <p>
                  <strong>Mirror Matches:</strong>{" "}
                  {deckStats.total_games_mirror}
                </p>
              </div>
              <div>
                <p>
                  <strong>Overall Win Rate:</strong>{" "}
                  {deckStats.win_rate.toFixed(2)}%
                </p>
                <p>
                  <strong>Win Rate (On the Draw):</strong>{" "}
                  {deckStats.win_rate_otd.toFixed(2)}%
                </p>
                <p>
                  <strong>Win Rate (On the Play):</strong>{" "}
                  {deckStats.win_rate_otp.toFixed(2)}%
                </p>
                <p>
                  <strong>Avg. Duration:</strong>{" "}
                  {Math.round(deckStats.avg_duration / 60000)} minutes
                </p>
                <p>
                  <strong>Median Duration:</strong>{" "}
                  {Math.round(deckStats.median_duration / 60000)} minutes
                </p>
                <p>
                  <strong>Total Players:</strong>{" "}
                  {Math.round(deckStats.distinct_players)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Card ID</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deckStats.cards.map((card) => (
                    <TableRow key={card.cardId}>
                      <TableCell>{card.cardId}</TableCell>
                      <TableCell>{card.qty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Players</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <ul className="space-y-2">
                {deckStats.currentPlayers.map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Live Games</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-6">
                {deckStats.liveGames.map((gameId) => (
                  <Link
                    href={`https://play.lorcanito.com/games/${gameId}?referrer=deck-list-lorcanary`}
                    target="_blank"
                    key={gameId}
                    className="block hover:bg-muted p-4 rounded-lg transition-colors"
                  >
                    <div className="mb-2">
                      <h3 className="text-xl font-bold">
                        Significant Cursed Merfolk Keeper Of Ancient Stories
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span>Starkey Selfless Protector (1521)</span>
                        <div className="flex gap-1">
                          <Badge className="bg-emerald-500/20 text-emerald-500">
                            E
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-500">
                            A
                          </Badge>
                        </div>
                      </div>
                      <span className="font-medium">VS</span>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <Badge className="bg-purple-500/20 text-purple-500">
                            A
                          </Badge>
                          <Badge className="bg-slate-500/20 text-slate-500">
                            S
                          </Badge>
                        </div>
                        <span>Hiram Flaversham Creative Thinker (1618)</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
