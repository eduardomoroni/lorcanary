"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Home, Heart, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";

interface DeckData {
  decks: {
    id: number;
    hash: string;
    publicId: string;
    metadata: {
      colors: string[];
    };
    createdAt: string;
    updatedAt: string;
    cards: Array<{
      qty: number;
      cardId: number;
    }>;
    currentPlayers: Array<{
      id: number;
      name: string;
    }>;
    deck_id: number;
    total_games: number;
    total_games_otd: number;
    total_games_otp: number;
    total_games_mirror: number;
    win_rate: number;
    win_rate_otd: number;
    win_rate_otp: number;
    avg_duration: number;
    median_duration: number;
  };
  liveGames: string[];
}

interface CardData {
  id: number;
  name: string;
  cost: number;
  color: string;
  type: string;
  inkable: boolean;
}

// Mock card data (replace this with actual data from your API)
const cardData: { [key: number]: CardData } = {
  270: {
    id: 270,
    name: "Chernabog's Followers",
    cost: 1,
    color: "amethyst",
    type: "Character",
    inkable: true,
  },
  274: {
    id: 274,
    name: "Clarabelle",
    cost: 2,
    color: "emerald",
    type: "Character",
    inkable: false,
  },
  // ... add more card data as needed
};

export default function DeckListPage({ data }: { data: DeckData }) {
  const { decks } = data;

  // // Prepare data for cost curve chart
  // const costCurveData = decks.cards
  //   .reduce(
  //     (acc, card) => {
  //       const cost = cardData[card.cardId]?.cost;
  //       const existingCost = acc.find((item) => item?.cost === cost);
  //       if (existingCost) {
  //         existingCost.count += card.qty;
  //       } else {
  //         acc.push({ cost: cost.toString(), count: card.qty });
  //       }
  //       return acc;
  //     },
  //     [] as { cost: string; count: number }[],
  //   )
  //   .sort((a, b) => parseInt(a.cost) - parseInt(b.cost));
  //
  // // Prepare data for pie charts
  // const colorData = decks.cards.reduce(
  //   (acc, card) => {
  //     const color = cardData[card.cardId].color;
  //     acc[color] = (acc[color] || 0) + card.qty;
  //     return acc;
  //   },
  //   {} as { [key: string]: number },
  // );
  //
  // const inkableData = decks.cards.reduce(
  //   (acc, card) => {
  //     const inkable = cardData[card.cardId].inkable ? "Inkable" : "Not Inkable";
  //     acc[inkable] = (acc[inkable] || 0) + card.qty;
  //     return acc;
  //   },
  //   {} as { [key: string]: number },
  // );
  //
  // const typeData = decks.cards.reduce(
  //   (acc, card) => {
  //     const type = cardData[card.cardId].type;
  //     acc[type] = (acc[type] || 0) + card.qty;
  //     return acc;
  //   },
  //   {} as { [key: string]: number },
  // );

  const costCurveData = [];
  const colorData = {};
  const inkableData = {};
  const typeData = {};

  const pieChartColors = {
    emerald: "#10b981",
    amethyst: "#a855f7",
    inkable: "#60a5fa",
    "not inkable": "#9ca3af",
    character: "#f59e0b",
    action: "#3b82f6",
    item: "#10b981",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Home className="h-4 w-4" />
        <span>/</span>
        <span>Decks</span>
        <span>/</span>
        <span>Artabax</span>
        <span>/</span>
        <span className="text-white">Artabax GP aggro</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-emerald-600 rounded-lg"></div>
          <div>
            <h1 className="text-2xl font-bold">Artabax GP aggro</h1>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <div className="h-4 w-4 rounded-full border border-slate-400"></div>
                {decks.cards.reduce((sum, card) => sum + card.qty, 0)}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                {decks.currentPlayers.length}
              </span>
              <span className="flex items-center gap-1">
                <div className="h-4 w-4 rounded-full border border-slate-400"></div>
                {decks.total_games}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {(decks.total_games / 1000).toFixed(1)}K
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Total</div>
              <div className="text-xl font-bold text-emerald-400">$154.05</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4">
              <div className="text-sm text-slate-400">Collection</div>
              <div className="text-xl font-bold">0.0%</div>
            </CardContent>
          </Card>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Shop
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Card List */}
        <div className="col-span-7">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" className="text-slate-400">
              Characters{" "}
              <span className="ml-2 text-white">
                {decks.cards.reduce((sum, card) => sum + card.qty, 0)}
              </span>
            </Button>
            <Button variant="ghost" className="text-slate-400">
              View <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {decks.cards.map((card) => {
              return null;
              const cardInfo = cardData[card.cardId];
              return (
                <div
                  key={card.cardId}
                  className="flex items-center justify-between bg-slate-900 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">{card.qty}x</span>
                    <div
                      className={`w-6 h-6 rounded-full bg-${cardInfo.color}-600`}
                    ></div>
                    <span>{cardInfo.name}</span>
                  </div>
                  <span className="text-slate-400">
                    ${(card.qty * 1.97).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Charts */}
        {/*<div className="col-span-5">*/}
        {/*  <Card className="bg-slate-900 border-slate-800">*/}
        {/*    <CardHeader>*/}
        {/*      <CardTitle className="text-sm font-normal text-slate-400">*/}
        {/*        Cost curve*/}
        {/*      </CardTitle>*/}
        {/*    </CardHeader>*/}
        {/*    <CardContent>*/}
        {/*      <ChartContainer className="h-[200px]">*/}
        {/*        <ResponsiveContainer width="100%" height="100%">*/}
        {/*          <BarChart*/}
        {/*            data={costCurveData}*/}
        {/*            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}*/}
        {/*          >*/}
        {/*            <Bar dataKey="count" fill="#059669" radius={[4, 4, 0, 0]} />*/}
        {/*          </BarChart>*/}
        {/*        </ResponsiveContainer>*/}
        {/*      </ChartContainer>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}

        {/*  <div className="grid grid-cols-3 gap-4 mt-6">*/}
        {/*    <Card className="bg-slate-900 border-slate-800">*/}
        {/*      <CardHeader>*/}
        {/*        <CardTitle className="text-sm font-normal text-slate-400">*/}
        {/*          Colors*/}
        {/*        </CardTitle>*/}
        {/*      </CardHeader>*/}
        {/*      <CardContent>*/}
        {/*        <ResponsiveContainer width="100%" height={100}>*/}
        {/*          <PieChart>*/}
        {/*            <Pie*/}
        {/*              data={Object.entries(colorData || {}).map(*/}
        {/*                ([key, value]) => ({*/}
        {/*                  name: key,*/}
        {/*                  value,*/}
        {/*                }),*/}
        {/*              )}*/}
        {/*              dataKey="value"*/}
        {/*              nameKey="name"*/}
        {/*              cx="50%"*/}
        {/*              cy="50%"*/}
        {/*              outerRadius={50}*/}
        {/*            >*/}
        {/*              {Object.entries(colorData || {}).map(([key]) => (*/}
        {/*                <Cell*/}
        {/*                  key={`cell-${key}`}*/}
        {/*                  fill={*/}
        {/*                    pieChartColors[*/}
        {/*                      key.toLowerCase() as keyof typeof pieChartColors*/}
        {/*                    ]*/}
        {/*                  }*/}
        {/*                />*/}
        {/*              ))}*/}
        {/*            </Pie>*/}
        {/*          </PieChart>*/}
        {/*        </ResponsiveContainer>*/}
        {/*      </CardContent>*/}
        {/*    </Card>*/}
        {/*    <Card className="bg-slate-900 border-slate-800">*/}
        {/*      <CardHeader>*/}
        {/*        <CardTitle className="text-sm font-normal text-slate-400">*/}
        {/*          Inkable*/}
        {/*        </CardTitle>*/}
        {/*      </CardHeader>*/}
        {/*      <CardContent>*/}
        {/*        <ResponsiveContainer width="100%" height={100}>*/}
        {/*          <PieChart>*/}
        {/*            <Pie*/}
        {/*              data={Object.entries(inkableData || {}).map(*/}
        {/*                ([key, value]) => ({*/}
        {/*                  name: key,*/}
        {/*                  value,*/}
        {/*                }),*/}
        {/*              )}*/}
        {/*              dataKey="value"*/}
        {/*              nameKey="name"*/}
        {/*              cx="50%"*/}
        {/*              cy="50%"*/}
        {/*              outerRadius={50}*/}
        {/*            >*/}
        {/*              {Object.entries(inkableData || {}).map(([key]) => (*/}
        {/*                <Cell*/}
        {/*                  key={`cell-${key}`}*/}
        {/*                  fill={*/}
        {/*                    pieChartColors[*/}
        {/*                      key.toLowerCase() as keyof typeof pieChartColors*/}
        {/*                    ]*/}
        {/*                  }*/}
        {/*                />*/}
        {/*              ))}*/}
        {/*            </Pie>*/}
        {/*          </PieChart>*/}
        {/*        </ResponsiveContainer>*/}
        {/*      </CardContent>*/}
        {/*    </Card>*/}
        {/*    <Card className="bg-slate-900 border-slate-800">*/}
        {/*      <CardHeader>*/}
        {/*        <CardTitle className="text-sm font-normal text-slate-400">*/}
        {/*          Card types*/}
        {/*        </CardTitle>*/}
        {/*      </CardHeader>*/}
        {/*      <CardContent>*/}
        {/*        <ResponsiveContainer width="100%" height={100}>*/}
        {/*          <PieChart>*/}
        {/*            <Pie*/}
        {/*              data={Object.entries(typeData || {}).map(*/}
        {/*                ([key, value]) => ({*/}
        {/*                  name: key,*/}
        {/*                  value,*/}
        {/*                }),*/}
        {/*              )}*/}
        {/*              dataKey="value"*/}
        {/*              nameKey="name"*/}
        {/*              cx="50%"*/}
        {/*              cy="50%"*/}
        {/*              outerRadius={50}*/}
        {/*            >*/}
        {/*              {Object.entries(typeData || {}).map(([key]) => (*/}
        {/*                <Cell*/}
        {/*                  key={`cell-${key}`}*/}
        {/*                  fill={*/}
        {/*                    pieChartColors[*/}
        {/*                      key.toLowerCase() as keyof typeof pieChartColors*/}
        {/*                    ]*/}
        {/*                  }*/}
        {/*                />*/}
        {/*              ))}*/}
        {/*            </Pie>*/}
        {/*          </PieChart>*/}
        {/*        </ResponsiveContainer>*/}
        {/*      </CardContent>*/}
        {/*    </Card>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
