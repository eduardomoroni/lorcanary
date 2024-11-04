import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { LorcanitoCard } from "@/shared/types/lorcanito";
import { CardImage } from "@/spaces/cards/CardImage";
import { cardFullName } from "@/shared/strings";
import { clsx } from "clsx";

const SET_MAP: Record<LorcanitoCard["set"], string> = {
  TFC: "The First Chapter",
  ROF: "Rise of the Floodborn",
  ITI: "Into the Inklands",
  URR: "Ursula's Return",
  SSK: "Shimmering Skies",
  "006": "Azurite Sea",
};

const RARITY_MAP: Record<LorcanitoCard["rarity"], string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  super_rare: "Super Rare",
  legendary: "Legendary",
};

export default function CardPageLayout({ card }: { card: LorcanitoCard }) {
  const fullName = cardFullName(card.name, card.title);

  return (
    <div className="min-h-screen bg-background">
      {/*<header className="border-b">*/}
      {/*  <div className="container flex items-center gap-2 h-14">*/}
      {/*    <Link href="#" className="text-muted-foreground hover:text-primary">*/}
      {/*      <Home className="h-5 w-5" />*/}
      {/*    </Link>*/}
      {/*    <ChevronRight className="h-4 w-4 text-muted-foreground" />*/}
      {/*    <Link href="#" className="text-muted-foreground hover:text-primary">*/}
      {/*      Lorcana Cards*/}
      {/*    </Link>*/}
      {/*    <ChevronRight className="h-4 w-4 text-muted-foreground" />*/}
      {/*    <span className="text-primary">The Bare Necessities</span>*/}
      {/*  </div>*/}
      {/*</header>*/}

      {/* Main Content */}
      <main className="container py-4 grid gap-6 lg:grid-cols-[1fr,400px] mx-auto">
        <div
          className={
            "bg-amethyst bg-amber bg-ruby bg-emerald bg-sapphire bg-steel"
          }
          style={{ display: "none", height: 0, width: 0 }}
        />

        {/* Left Column - Card Image & Versions */}
        <div className="space-y-4">
          <Card
            className={clsx(
              "border-2 border-muted p-2 w-fit mx-auto",
              `bg-${card.color}`,
            )}
          >
            <CardImage card={card} />
          </Card>

          {/*<div className="space-y-4">*/}
          {/*  <h3 className="text-lg font-semibold">Available Versions</h3>*/}
          {/*  <div className="flex gap-4">*/}
          {/*    <Image*/}
          {/*      src="/placeholder.svg?height=100&width=71"*/}
          {/*      alt="Regular version"*/}
          {/*      width={71}*/}
          {/*      height={100}*/}
          {/*      className="rounded border-2 border-primary"*/}
          {/*    />*/}
          {/*    <Image*/}
          {/*      src="/placeholder.svg?height=100&width=71"*/}
          {/*      alt="Foil version"*/}
          {/*      width={71}*/}
          {/*      height={100}*/}
          {/*      className="rounded border-2 border-muted hover:border-primary cursor-pointer"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        {/* Right Column - Card Details */}
        <div className="space-y-4 mx-8 sm:mx-0">
          <div className="space-y-4 flex-col flex items-center">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{fullName}</h1>
                <p className="text-muted-foreground">
                  {`${card.set}-${String(card.number).padStart(3, "0")} ${fullName}`}
                </p>
              </div>
              {/*<Button variant="default" size="icon">*/}
              {/*  <X className="h-4 w-4" />*/}
              {/*</Button>*/}
            </div>

            <div className="flex gap-2">
              <Badge variant="default" className={`bg-${card.color}`}>
                {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
              </Badge>
              {card.characteristics.map((characteristic) => (
                <Badge key={characteristic} variant="neutral">
                  {characteristic.charAt(0).toUpperCase() +
                    characteristic.slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className={clsx("pt-6", `bg-${card.color}`)}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cost</p>
                    <p className="font-semibold">{card.cost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Set</p>
                    <p className="font-semibold">{SET_MAP[card.set]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rarity</p>
                    <p className="font-semibold">{RARITY_MAP[card.rarity]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">
                      {card.color.charAt(0).toUpperCase() + card.color.slice(1)}
                    </p>
                  </div>
                </div>

                {/*<Separator />*/}

                {/*<div>*/}
                {/*  <h3 className="font-semibold mb-2">Description</h3>*/}
                {/*  <p className="text-sm text-muted-foreground">*/}
                {/*    A character with cost 2 or more can exert to sing this song*/}
                {/*    for free.*/}
                {/*  </p>*/}
                {/*  <p className="text-sm">*/}
                {/*    Chosen opponent reveals their hand and discards a*/}
                {/*    non-character card of your choice.*/}
                {/*  </p>*/}
                {/*</div>*/}

                {/*<Separator />*/}

                {/*<div>*/}
                {/*  <h3 className="font-semibold mb-2">Flavor Text</h3>*/}
                {/*  <p className="text-sm italic text-muted-foreground">*/}
                {/*    {card.flavour}*/}
                {/*  </p>*/}
                {/*</div>*/}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className={clsx("pt-6", `bg-${card.color}`)}>
              {Object.entries(card).map(([key, value]) => {
                if (
                  [
                    "abilities",
                    "implemented",
                    "alternativeUrl",
                    "language",
                  ].includes(key)
                ) {
                  return null;
                }

                return (
                  <p key={key}>
                    <strong>{key}</strong>: {value}
                  </p>
                );
              })}
            </CardContent>
          </Card>

          {/*<Card>*/}
          {/*  <CardContent className="pt-6">*/}
          {/*    <div className="space-y-4">*/}
          {/*      <div className="flex justify-between items-center">*/}
          {/*        <div>*/}
          {/*          <p className="text-sm text-muted-foreground">*/}
          {/*            Current Price*/}
          {/*          </p>*/}
          {/*          <p className="text-2xl font-bold">$1.63</p>*/}
          {/*        </div>*/}
          {/*        <div className="flex gap-2">*/}
          {/*          <TooltipProvider>*/}
          {/*            <Tooltip>*/}
          {/*              <TooltipTrigger asChild>*/}
          {/*                <Button variant="default" size="icon">*/}
          {/*                  <Minus className="h-4 w-4" />*/}
          {/*                </Button>*/}
          {/*              </TooltipTrigger>*/}
          {/*              <TooltipContent>*/}
          {/*                <p>Decrease quantity</p>*/}
          {/*              </TooltipContent>*/}
          {/*            </Tooltip>*/}
          {/*          </TooltipProvider>*/}
          {/*          <span className="w-12 text-center flex items-center justify-center font-medium">*/}
          {/*            1*/}
          {/*          </span>*/}
          {/*          <TooltipProvider>*/}
          {/*            <Tooltip>*/}
          {/*              <TooltipTrigger asChild>*/}
          {/*                <Button variant="default" size="icon">*/}
          {/*                  <Plus className="h-4 w-4" />*/}
          {/*                </Button>*/}
          {/*              </TooltipTrigger>*/}
          {/*              <TooltipContent>*/}
          {/*                <p>Increase quantity</p>*/}
          {/*              </TooltipContent>*/}
          {/*            </Tooltip>*/}
          {/*          </TooltipProvider>*/}
          {/*        </div>*/}
          {/*      </div>*/}

          {/*      <div className="grid grid-cols-2 gap-4">*/}
          {/*        <Button className="w-full">Buy Now</Button>*/}
          {/*        <Button variant="default" className="w-full">*/}
          {/*          Add to Collection*/}
          {/*        </Button>*/}
          {/*      </div>*/}

          {/*      <Button variant="default" className="w-full">*/}
          {/*        <ExternalLink className="h-4 w-4 mr-2" />*/}
          {/*        View on TCGPlayer*/}
          {/*      </Button>*/}
          {/*    </div>*/}
          {/*  </CardContent>*/}
          {/*</Card>*/}
        </div>
      </main>
    </div>
  );
}
