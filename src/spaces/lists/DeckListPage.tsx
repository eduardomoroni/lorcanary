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
import type { DeckStats } from "@/spaces/lists/types";
import { LiveGames } from "@/spaces/lists/LiveGames";

export default function DeckStatsPage({
  data,
  idOrPublicId,
}: {
  data: DeckStats;
  idOrPublicId: string;
}) {
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
                    <TableHead>Copies</TableHead>
                    <TableHead>Card</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deckStats.cards
                    .sort((a, b) => b.qty - a.qty)
                    .map((card) => {
                      console.log(card);
                      return (
                        <TableRow key={card.card.id}>
                          <TableCell>{card.qty}</TableCell>
                          <TableCell>{card.card.name}</TableCell>
                        </TableRow>
                      );
                    })}
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
                  <li key={player.id}>
                    {player.name}
                    {" (" + Math.round(player.rankedMMR) + ")"}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>

        <LiveGames idOrPublicId={idOrPublicId} />
      </div>
    </div>
  );
}
