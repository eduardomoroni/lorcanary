import { MatchupData, ProcessedMatchupData } from "./types";

export function processMatchupData(data: MatchupData[]): ProcessedMatchupData {
  const processed: ProcessedMatchupData = {};

  data.forEach((matchup) => {
    if (!processed[matchup.deck]) {
      processed[matchup.deck] = {};
    }
    processed[matchup.deck][matchup.versus] = matchup;
  });

  return processed;
}

export function calculateOverallStats(deckData: {
  [versus: string]: MatchupData;
}) {
  const totalMatches = Object.values(deckData).reduce(
    (sum, matchup) => sum + parseInt(matchup.total_matches),
    0,
  );

  const totalWins = Object.values(deckData).reduce(
    (sum, matchup) => sum + parseInt(matchup.wins),
    0,
  );

  const totalMatchesOnPlay = Object.values(deckData).reduce(
    (sum, matchup) => sum + parseInt(matchup.matches_on_play),
    0,
  );

  const totalWinsOnPlay = Object.values(deckData).reduce(
    (sum, matchup) => sum + parseInt(matchup.wins_on_play),
    0,
  );

  const totalMatchesOnDraw = Object.values(deckData).reduce(
    (sum, matchup) => sum + parseInt(matchup.matches_on_draw),
    0,
  );

  const totalWinsOnDraw = Object.values(deckData).reduce(
    (sum, matchup) => sum + parseInt(matchup.wins_on_draw),
    0,
  );

  return {
    total_matches: totalMatches.toString(),
    wins: totalWins.toString(),
    overall_winrate: ((totalWins / totalMatches) * 100).toFixed(2),
    matches_on_play: totalMatchesOnPlay.toString(),
    wins_on_play: totalWinsOnPlay.toString(),
    play_winrate: ((totalWinsOnPlay / totalMatchesOnPlay) * 100).toFixed(2),
    matches_on_draw: totalMatchesOnDraw.toString(),
    wins_on_draw: totalWinsOnDraw.toString(),
    draw_winrate: ((totalWinsOnDraw / totalMatchesOnDraw) * 100).toFixed(2),
    deck: "OVERALL",
    versus: "overall",
    mirror_matches: "0",
  };
}

export function getUniqueDecks(data: MatchupData[]): string[] {
  const decks = new Set<string>();
  data.forEach((matchup) => {
    decks.add(matchup.deck);
    decks.add(matchup.versus);
  });
  return Array.from(decks).filter((deck) => deck.includes("/"));
}

export function getCellColor(winrate: number): string {
  if (winrate >= 60) return "bg-green-600";
  if (winrate >= 50) return "bg-green-500";
  if (winrate >= 45) return "bg-yellow-600";
  if (winrate >= 40) return "bg-orange-600";
  return "bg-red-600";
}

export function sortDecks(
  decks: string[],
  data: ProcessedMatchupData,
  sortType: "matches" | "winrate" | "alphabetical",
): string[] {
  return [...decks].sort((a, b) => {
    if (sortType === "alphabetical") {
      return a.localeCompare(b);
    }

    const aStats = Object.values(data[a] || {}).reduce(
      (acc, matchup) => {
        acc.matches += parseInt(matchup.total_matches);
        acc.wins += parseInt(matchup.wins);
        return acc;
      },
      { matches: 0, wins: 0 },
    );

    const bStats = Object.values(data[b] || {}).reduce(
      (acc, matchup) => {
        acc.matches += parseInt(matchup.total_matches);
        acc.wins += parseInt(matchup.wins);
        return acc;
      },
      { matches: 0, wins: 0 },
    );

    if (sortType === "matches") {
      return bStats.matches - aStats.matches;
    }

    const aWinrate = (aStats.wins / aStats.matches) * 100;
    const bWinrate = (bStats.wins / bStats.matches) * 100;
    return bWinrate - aWinrate;
  });
}
