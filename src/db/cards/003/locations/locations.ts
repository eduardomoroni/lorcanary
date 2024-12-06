import type { LorcanitoLocationCard } from "@lorcanito/lorcana-engine";
import {
  atTheStartOfYourTurn,
  evasiveAbility,
  gainAbilityWhileHere,
  resistAbility,
  rushAbility,
  wardAbility,
  whenChallengedAndBanished,
  wheneverQuests,
  whenThisCharacterBanished,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  banishChallengingCharacter,
  putThisCardIntoYourInkwellExerted,
  youMayDrawThenChooseAndDiscard,
} from "@lorcanito/lorcana-engine/effects/effects";
import { thisCharacter } from "@lorcanito/lorcana-engine/abilities/targets";

export const forbiddenMountainMaleficentsCastle: LorcanitoLocationCard = {
  id: "k31",
  type: "location",
  name: "Forbidden Mountain",
  title: "Maleficent's Castle",
  characteristics: ["location"],
  flavour: "",
  inkwell: true,
  color: "amethyst",
  cost: 2,
  willpower: 6,
  lore: 1,
  moveCost: 1,
  illustrator: "Jimmy Lo",
  number: 66,
  set: "ITI",
  rarity: "common",
};

export const neverLandMermaidLagoon: LorcanitoLocationCard = {
  id: "waj",
  type: "location",
  name: "Never Land",
  title: "Mermaid Lagoon",
  characteristics: ["location"],
  flavour:
    "The mermaids told Peter they'd seen some items floating by several days earlier, but they were more concerned that one of their sisters had gone missing.",
  inkwell: true,
  color: "amber",
  cost: 1,
  moveCost: 1,
  willpower: 4,
  lore: 1,
  illustrator: "Cecile Carre",
  number: 32,
  set: "ITI",
  rarity: "common",
};

export const prideLandsPrideRock: LorcanitoLocationCard = {
  id: "e1l",
  type: "location",
  missingTestCase: true,
  name: "Pride Lands",
  title: "Pride Rock",
  characteristics: ["location"],
  text: "**WE ARE ALL CONNECTED** Characters get +2 ⛨ while here.\n\n\n**LION HOME** If you have a Prince or King character here, you pay 1 ⬡ less to play characters.",
  abilities: [
    {
      type: "while-static",
      name: "Lion Home",
      text: "If you have a Prince or King character here, you pay 1 ⬡ less to play characters.",
      whileCondition: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 1 },
          filters: [
            {
              filter: "characteristics",
              value: ["prince", "king"],
              conjunction: "or",
            },
          ],
        },
      ],
      ability: {
        type: "static",
        ability: "effects",
        effects: [
          {
            type: "attribute",
            attribute: "cost",
            amount: 1,
            modifier: "subtract",
            duration: "static",
            target: {
              type: "card",
              value: "all",
              filters: [
                { filter: "owner", value: "self" },
                { filter: "type", value: "character" },
                { filter: "zone", value: "hand" },
              ],
            },
          },
        ],
      },
    },
    gainAbilityWhileHere({
      name: "WE ARE ALL CONNECTED",
      text: "Characters get +2 ⛨ while here.",
      ability: {
        type: "property-static",
        ability: "attribute",
        effects: [
          {
            type: "attribute",
            attribute: "willpower",
            amount: 2,
            modifier: "add",
            duration: "static",
            target: {
              type: "card",
              value: "all",
              filters: [{ filter: "source", value: "self" }],
            },
          },
        ],
      },
    }),
  ],
  color: "amber",
  cost: 2,
  willpower: 7,
  lore: 1,
  moveCost: 2,
  illustrator: "Beverly Arce / Jonathan Livslyst",
  number: 33,
  set: "ITI",
  rarity: "rare",
};
export const tianasPalaceJazzRestaurant: LorcanitoLocationCard = {
  id: "sfq",
  type: "location",
  name: "Tiana's Palace",
  title: "Jazz Restaurant",
  characteristics: ["location"],
  text: "**NIGHT OUT** Characters can't be challenged while here.",
  abilities: [
    gainAbilityWhileHere({
      name: "Night Out",
      text: "Characters can't be challenged while here.",
      ability: {
        type: "static",
        ability: "effects",
        name: "Night Out",
        text: "Characters can't be challenged while here.",
        effects: [
          {
            type: "restriction",
            restriction: "be-challenged",
            target: thisCharacter,
          },
        ],
      },
    }),
  ],
  flavour: "In New Orleans, dreams can come true.",
  color: "amber",
  cost: 3,
  willpower: 8,
  lore: 1,
  moveCost: 2,
  illustrator: "Valerio Buonfantino",
  number: 34,
  set: "ITI",
  rarity: "uncommon",
};

export const theQueensCastleMirrorChamber: LorcanitoLocationCard = {
  id: "vbq",
  type: "location",
  name: "The Queen's Castle",
  title: "Mirror Chamber",
  characteristics: ["location"],
  text: "**USING THE MIRROR** At the start of your turn, for each character you have here, you may draw a card.",
  abilities: [
    atTheStartOfYourTurn({
      name: "Using the Mirror",
      text: "At the start of your turn, for each character you have here, you may draw a card.",
      optional: true,
      effects: [
        // TODO: this effect is not quite right, it's drawing X cards instead of creating X layers that draw 1 card each
        {
          type: "draw",
          amount: {
            dynamic: true,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "play" },
              { filter: "location", value: "source" },
            ],
          },
          target: {
            type: "player",
            value: "self",
          },
        },
      ],
    }),
  ],
  flavour:
    "Those who visit the mirror can choose their question−but not the answer.",
  inkwell: true,
  color: "amethyst",
  cost: 4,
  willpower: 7,
  lore: 2,
  moveCost: 1,
  illustrator: "Matthew Oates",
  number: 67,
  set: "ITI",
  rarity: "rare",
};
export const theSorcerersTowerWondrousWorkspace: LorcanitoLocationCard = {
  id: "sen",
  type: "location",
  missingTestCase: true,
  name: "The Sorcerer's Tower",
  title: "Wondrous Workspace",
  characteristics: ["location"],
  text: "**BROOM CLOSET** Your characters named Magic Broom may move here for free.\n\n\n**MAGICAL POWER** Characters get +1 ◆ while here.",
  abilities: [
    // {
    //   name: "**BROOM CLOSET** Your characters named Magic Broom may move here for free.\n\n\n",
    // },
    gainAbilityWhileHere({
      name: "Magical Power",
      text: "Characters get +1 ◆ while here.",
      ability: {
        type: "property-static",
        ability: "attribute",
        effects: [
          {
            type: "attribute",
            attribute: "lore",
            amount: 1,
            modifier: "add",
            duration: "static",
            target: {
              type: "card",
              value: "all",
              filters: [{ filter: "source", value: "self" }],
            },
          },
        ],
      },
    }),
  ],
  flavour: "Everything you need to make some magic.",
  inkwell: true,
  color: "amethyst",
  cost: 3,
  willpower: 7,
  lore: 0,
  moveCost: 2,
  movementDiscounts: [
    {
      filters: [
        {
          filter: "attribute",
          value: "name",
          comparison: { operator: "eq", value: "Magic Broom" },
        },
      ],
      amount: 0,
    },
  ],
  illustrator: "Wietse Treurniet",
  number: 68,
  set: "ITI",
  rarity: "uncommon",
};

export const deVilManorCruellasEstate: LorcanitoLocationCard = {
  id: "p6j",
  type: "location",
  name: "De Vil Manor",
  title: "Cruella's Estate",
  characteristics: ["location"],
  flavour:
    "“They say the ol' place is haunted, or bewitched, or some such fiddle-faddle.”\n–Colonel",
  inkwell: true,
  color: "emerald",
  cost: 1,
  willpower: 4,
  lore: 1,
  moveCost: 1,
  illustrator: "Ryan Moeck",
  number: 100,
  set: "ITI",
  rarity: "common",
};

export const fangRiverCity: LorcanitoLocationCard = {
  id: "pji",
  type: "location",
  name: "Fang",
  title: "River City",
  characteristics: ["location"],
  text: "**SURROUNDED BY WATER** Characters gain **Ward** and **Evasive** while here. _(Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)_",
  abilities: [
    gainAbilityWhileHere({
      name: "Surrounded by Water",
      text: "Characters gain **Ward** and **Evasive** while here. _(Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)_",
      ability: wardAbility,
    }),
    gainAbilityWhileHere({
      name: "Surrounded by Water",
      text: "Characters gain **Ward** and **Evasive** while here. _(Opponents can't choose them except to challenge. Only characters with Evasive can challenge them.)_",
      ability: evasiveAbility,
    }),
  ],
  flavour:
    "A nation protected by fierce assassins and their even fiercer cats.",
  inkwell: true,
  color: "emerald",
  cost: 4,
  willpower: 6,
  lore: 2,
  moveCost: 2,
  illustrator: "Michael Guimont",
  number: 101,
  set: "ITI",
  rarity: "rare",
};
export const kuzcosPalaceHomeOfTheEmperor: LorcanitoLocationCard = {
  id: "d8d",
  type: "location",
  missingTestCase: true,
  name: "Kuzco's Palace",
  title: "Home of the Emperor",
  characteristics: ["location"],
  text: "**CITY WALLS** Whenever a character is challenged and banished while here, banish the challenging character.",
  abilities: [
    gainAbilityWhileHere({
      name: "City Walls",
      text: "Whenever a character is challenged and banished while here, banish the challenging character.",
      ability: whenChallengedAndBanished({
        name: "City Walls",
        text: "Whenever a character is challenged and banished while here, banish the challenging character.",
        effects: [banishChallengingCharacter],
      }),
    }),
  ],
  flavour:
    "“Sure it's a little small, but also it DOESN'T HAVE A POOL!” −Kuzco",
  inkwell: true,
  color: "emerald",
  cost: 3,
  willpower: 7,
  lore: 1,
  moveCost: 3,
  illustrator: "Andreas Rocha",
  number: 102,
  set: "ITI",
  rarity: "uncommon",
};

export const agrabahMarketplace: LorcanitoLocationCard = {
  id: "hjx",
  type: "location",
  name: "Agrabah",
  title: "Marketplace",
  characteristics: ["location"],
  flavour:
    "“Welcome to Agrabah, city of mystery, of enchantment, and the finest merchandise this side of the river.” \n–Merchant",
  inkwell: true,
  color: "ruby",
  cost: 3,
  willpower: 5,
  moveCost: 1,
  lore: 2,
  illustrator: "Kaitlin Cuthbertson",
  number: 134,
  set: "ITI",
  rarity: "common",
};
export const jollyRogerHooksShip: LorcanitoLocationCard = {
  id: "g68",
  type: "location",
  name: "Jolly Roger",
  title: "Hook's Ship",
  characteristics: ["location"],
  text: "**LOOK ALIVE, YOU SWABS!** Characters gain **Rush** while here. _(They can challenge the turn they're played.)_\n\n\n**ALL HANDS ON DECK!** Your Pirate characters may move here for free.",
  movementDiscounts: [
    {
      filters: [{ filter: "characteristics", value: ["pirate"] }],
      amount: 0,
    },
  ],
  abilities: [
    gainAbilityWhileHere({
      name: "LOOK ALIVE, YOU SWABS!",
      text: "Characters gain **Rush** while here. _(They can challenge the turn they're played.)_",
      ability: rushAbility,
    }),
    gainAbilityWhileHere({
      name: "ALL HANDS ON DECK!",
      text: "Your Pirate characters may move here for free.",
      ability: {
        type: "property-static",
        ability: "attribute",
        effects: [
          {
            type: "attribute",
            attribute: "moveCost",
            amount: 0,
            modifier: "add",
            target: {
              type: "card",
              value: "all",
              filters: [
                { filter: "source", value: "self" },
                { filter: "characteristics", value: ["pirate"] },
              ],
            },
          },
        ],
      },
    }),
  ],
  color: "ruby",
  cost: 1,
  willpower: 5,
  lore: 0,
  moveCost: 2,
  illustrator: "Nicolas Ky",
  number: 135,
  set: "ITI",
  rarity: "uncommon",
};
export const rlsLegacySolarGalleon: LorcanitoLocationCard = {
  id: "ok0",
  type: "location",
  name: "RLS Legacy",
  title: "Solar Galleon",
  characteristics: ["location"],
  text: "**THIS IS OUR SHIP** Characters gain **Evasive** while here. _(Only characters with Evasive can challenge them.)_\n\n\n**HEAVE TOGETHER NOW** If you have a character here, you pay 2 ⬡ less to move a character of yours here.",
  abilities: [
    {
      type: "while-static",
      name: "HEAVE TOGETHER NOW",
      text: "If you have a character here, you pay 2 ⬡ less to move a character of yours here.",
      whileCondition: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 1 },
        },
      ],
      ability: {
        type: "property-static",
        ability: "attribute",
        effects: [
          {
            type: "attribute",
            attribute: "moveCost",
            amount: 2,
            modifier: "subtract",
            target: {
              type: "card",
              value: "all",
              filters: [{ filter: "source", value: "self" }],
            },
          },
        ],
      },
    },
    gainAbilityWhileHere({
      name: "This is Our Ship",
      text: "Characters gain **Evasive** while here. _(Only characters with Evasive can challenge them.)_",
      ability: evasiveAbility,
    }),
  ],
  color: "ruby",
  cost: 4,
  willpower: 8,
  moveCost: 3,
  lore: 2,
  illustrator: "Wietse Treurniet",
  number: 136,
  set: "ITI",
  rarity: "rare",
};
export const bellesHouseMauricesWorkshop: LorcanitoLocationCard = {
  id: "rnn",
  type: "location",
  name: "Belle's House",
  title: "Maurice's Workshop",
  characteristics: ["location"],
  text: "**LABORATORY** If you have a character here, you pay 1 ⬡ less to play items.",
  abilities: [
    {
      // Pride Rock is doing this as an static ability, but I think it's better as a while-static ability
      type: "while-static",
      name: "LABORATORY",
      text: " If you have a character here, you pay 1 ⬡ less to play items.",
      whileCondition: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 1 },
        },
      ],
      ability: {
        type: "static",
        ability: "effects",
        effects: [
          {
            type: "attribute",
            attribute: "cost",
            amount: 1,
            modifier: "subtract",
            duration: "static",
            target: {
              type: "card",
              value: "all",
              filters: [
                { filter: "owner", value: "self" },
                { filter: "type", value: "item" },
                { filter: "zone", value: "hand" },
              ],
            },
          },
        ],
      },
    },
  ],
  flavour: "Some of the most important tools in Lorcana are crafted here.",
  inkwell: true,
  color: "sapphire",
  cost: 1,
  willpower: 6,
  lore: 0,
  moveCost: 2,
  illustrator: "Alex Shin",
  number: 168,
  set: "ITI",
  rarity: "rare",
};
export const motunuiIslandParadise: LorcanitoLocationCard = {
  id: "rqt",
  type: "location",
  missingTestCase: true,
  name: "Motunui",
  title: "Island Paradise",
  characteristics: ["location"],
  text: "**REINCARNATION** Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.",
  abilities: [
    gainAbilityWhileHere({
      name: "Reincarnation",
      text: "Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.",
      ability: whenThisCharacterBanished({
        name: "Reincarnation",
        text: "Whenever a character is banished while here, you may put that card into your inkwell facedown and exerted.",
        optional: true,
        effects: [putThisCardIntoYourInkwellExerted],
      }),
    }),
  ],
  inkwell: true,
  color: "sapphire",
  cost: 2,
  willpower: 5,
  lore: 1,
  moveCost: 1,
  illustrator: "Etienne Savoie",
  number: 170,
  set: "ITI",
  rarity: "uncommon",
};

export const mauisPlaceOfExileHiddenIsland: LorcanitoLocationCard = {
  id: "cpd",
  type: "location",
  missingTestCase: true,
  name: "Maui's Place of Exile",
  title: "Hidden Island",
  characteristics: ["location"],
  text: "**ISOLATED** Characters gain **Resist** +1 while here. _(Damage dealt to them is reduced by 1.)_",
  abilities: [
    gainAbilityWhileHere({
      name: "ISOLATED",
      text: "Characters gain **Resist** +1 while here.",
      ability: resistAbility(1),
    }),
  ],
  flavour: "Nothing but boulders and sand-easy to miss.",
  inkwell: true,
  color: "steel",
  cost: 2,
  willpower: 5,
  lore: 0,
  moveCost: 1,
  illustrator: "Jeremy Adams",
  number: 202,
  set: "ITI",
  rarity: "rare",
};
export const nottinghamPrinceJohnsCastle: LorcanitoLocationCard = {
  id: "jc5",
  type: "location",
  name: "Nottingham",
  title: "Prince John's Castle",
  characteristics: ["location"],
  flavour:
    "Sir Hiss: “I say, ssssire, your mother’s castle would be the perfect place to bring our plan to life!” \nPrince John: “Mummy!”",
  inkwell: true,
  color: "steel",
  cost: 2,
  willpower: 6,
  lore: 1,
  moveCost: 1,
  illustrator: "Bryn Jones",
  number: 203,
  set: "ITI",
  rarity: "common",
};
export const theBayouMysteriousSwamp: LorcanitoLocationCard = {
  id: "tu0",
  type: "location",
  missingTestCase: true,
  name: "The Bayou",
  title: "Mysterious Swamp",
  characteristics: ["location"],
  text: "**SHOW ME THE WAY** Whenever a character quests while here, you may draw a card, then choose and discard a card.",
  abilities: [
    gainAbilityWhileHere({
      name: "Show me the way",
      text: "Whenever a character quests while here, you may draw a card, then choose and discard a card.",
      ability: wheneverQuests({
        ...youMayDrawThenChooseAndDiscard,
        name: "Show me the way",
        text: "Whenever a character quests while here, you may draw a card, then choose and discard a card.",
      }),
    }),
  ],
  flavour: "A place to find what you need, not just what you want.",
  inkwell: true,
  color: "steel",
  cost: 1,
  willpower: 3,
  lore: 1,
  moveCost: 1,
  illustrator: "Ryan Moeck",
  number: 204,
  set: "ITI",
  rarity: "uncommon",
};

export const mcduckManorScroogesMansion: LorcanitoLocationCard = {
  id: "qyj",
  name: "McDuck Manor",
  title: "Scrooge's Mansion",
  characteristics: ["location"],
  type: "location",
  flavour: "“It's only the coolest home in Lorcana!” \n–Webby Vanderquack",
  inkwell: true,
  color: "sapphire",
  willpower: 9,
  lore: 2,
  illustrator: "Alex Accorsi",
  number: 169,
  cost: 4,
  set: "ITI",
  rarity: "common",
  moveCost: 1,
};
