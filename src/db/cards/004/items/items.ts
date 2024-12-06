import type {
  AbilityEffect,
  AttributeEffect,
  LorcanitoItemCard,
} from "@lorcanito/lorcana-engine";
import {
  ActivatedAbility,
  moveDamageAbility,
  atTheStartOfYourTurn,
  chosenCharacterGains,
  StaticAbilityWithEffect,
  wheneverChallengesAnotherChar,
  wheneverOneOfYourCharChallengesAnotherChar,
  wheneverOpponentPlaysASong,
  wheneverPlays,
  wheneverYouPlayACharacter,
  wheneverYouPlayASong,
  whenYouPlayMayDrawACard,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  chosenCharacter,
  chosenCharacterOfYours,
  chosenCharacterOrLocation,
  chosenHeroCharacter,
  chosenLocation,
  chosenOpposingCharacter,
} from "@lorcanito/lorcana-engine/abilities/targets";
import {
  drawACard,
  getLoreThisTurn,
  healEffect,
  moveDamageEffect,
  readyAndCantQuest,
  youGainLore,
  youPayXLessToPlayNextCharThisTurn,
} from "@lorcanito/lorcana-engine/effects/effects";
import { forEachCardInYourHand } from "@lorcanito/lorcana-engine/abilities/amounts";
import { ifYouHaveCharacterNamed } from "@lorcanito/lorcana-engine/abilities/conditions/conditions";

export const miracleCandle: LorcanitoItemCard = {
  id: "ohm",
  missingTestCase: true,
  name: "Miracle Candle",
  characteristics: ["item"],
  text: "**ABUELA'S GIFT** Banish this item − If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Abuela's Gift",
      costs: [{ type: "banish" }],
      conditions: [
        {
          type: "filter",
          comparison: { operator: "gte", value: 3 },
          filters: chosenCharacterOfYours.filters,
        },
      ],
      text: "Banish this item − If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.",
      effects: [youGainLore(2), healEffect(2, chosenLocation)],
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 2,
  illustrator: "Kuya Jaypi",
  number: 31,
  set: "URR",
  rarity: "rare",
};
export const recordPlayer: LorcanitoItemCard = {
  id: "jvf",
  name: "Record Player",
  characteristics: ["item"],
  text: "**LOOK AT THIS!** Whenever you play a song, chosen character gets -2 ※ until the start of your next turn.\n\n**HIT PARADE** Your characters named Stitch count as having +1 cost to sing songs.",
  type: "item",
  abilities: [
    wheneverYouPlayASong({
      name: "LOOK AT THIS!",
      text: "Whenever you play a song, chosen character gets -2 ※ until the start of your next turn.",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          modifier: "subtract",
          amount: 2,
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        },
      ],
    }),
    {
      type: "property-static",
      ability: "attribute",
      name: "HIT PARADE",
      text: "Your characters named Stitch count as having +1 cost to sing songs.",
      effects: [
        {
          type: "attribute",
          attribute: "singCost",
          amount: 1,
          modifier: "add",
          target: {
            type: "card",
            value: "all",
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "play" },
              {
                filter: "attribute",
                value: "name",
                comparison: { operator: "eq", value: "stitch" },
              },
            ],
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 2,
  illustrator: "Simone Buonfantino",
  number: 32,
  set: "URR",
  rarity: "common",
};
export const mysticalRose: LorcanitoItemCard = {
  id: "d8l",
  missingTestCase: true,
  name: "Mystical Rose",
  characteristics: ["item"],
  text: "**DISPEL THE ENTANGLEMENT** Banish this item − Chosen character named Beast gets +2 ◆ this turn. If you have a character named Belle in play, move up to 3 damage counters from chosen character to chosen opposing character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "banish" }],
      name: "Dispel The Entanglement",
      text: "Banish this item − Chosen character named Beast gets +2 ◆ this turn. If you have a character named Belle in play, move up to 3 damage counters from chosen character to chosen opposing character.",
      effects: [
        getLoreThisTurn(2, {
          type: "card",
          value: 1,
          filters: [
            { filter: "type", value: "character" },
            { filter: "zone", value: "play" },
            {
              filter: "attribute",
              value: "name",
              comparison: { operator: "eq", value: "beast" },
            },
          ],
        }),
        moveDamageEffect({
          amount: 3,
          from: chosenCharacter,
          to: chosenOpposingCharacter,
          conditions: [ifYouHaveCharacterNamed("belle")],
        }),
      ],
    },
  ],
  flavour:
    "Ink surrounded Belle's last hope to heal the Beast. With no other choice, she reached out for it . . .",
  inkwell: true,
  color: "amethyst",
  cost: 2,
  illustrator: "Olivier Désirée",
  number: 64,
  set: "URR",
  rarity: "rare",
};

export const roseLantern: LorcanitoItemCard = {
  id: "xin",
  missingTestCase: true,
  name: "Rose Lantern",
  characteristics: ["item"],
  text: "MYSTICAL PETALS  ↷, 2 ⬡ − Move 1 damage counter from chosen character to chosen opposing character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Mystical Petals",
      text: "↷, 2 ⬡ − Move 1 damage counter from chosen character to chosen opposing character.",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [
        moveDamageEffect({
          amount: 1,
          from: chosenCharacter,
          to: chosenOpposingCharacter,
        }),
      ],
    },
  ],
  flavour:
    "The transformed rose made short work of the Beast's wound. But even the gentlest magic comes at a cost.",
  inkwell: true,
  color: "amethyst",
  cost: 2,
  illustrator: "Gabriel Angelo",
  number: 65,
  set: "URR",
  rarity: "common",
};

const effect: AttributeEffect = {
  type: "attribute",
  attribute: "strength",
  modifier: "add",
  target: chosenCharacter,
  amount: {
    dynamic: true,
    filters: [
      { filter: "zone", value: "hand" },
      { filter: "owner", value: "self" },
    ],
  },
};

const gainedAbility: StaticAbilityWithEffect = {
  type: "static",
  ability: "effects",
  name: "Symbol Of Power",
  text: "Chosen character gets +1 ※ this turn for each card in your hand.",
  effects: [effect],
};

export const tritonsTrident: LorcanitoItemCard = {
  id: "tom",
  missingTestCase: true,
  name: "Triton's Trident",
  characteristics: ["item"],
  text: "**SYMBOL OF POWER** Banish this item — Chosen character gets +1 ※ this turn for each card in your hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Symbol Of Power",
      text: "Banish this item — Chosen character gets +1 ※ this turn for each card in your hand.",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
          amount: forEachCardInYourHand,
        },
      ],
    },
  ],
  flavour: '"Just imagine all this power in the wrong hands..." — Ursula',
  inkwell: true,
  color: "amethyst",
  cost: 2,
  illustrator: "Matt Chapman",
  number: 66,
  set: "URR",
  rarity: "uncommon",
};

export const hiddenInkcaster: LorcanitoItemCard = {
  id: "efb",
  missingTestCase: true,
  name: "Hidden Inkcaster",
  characteristics: ["item"],
  text: "**FRESH INK** When you play this item, draw a card.\n\n\n**UNEXPECTED TREASURE** All cards in your hand count as having ⏣.",
  type: "item",
  abilities: [
    {
      ...whenYouPlayMayDrawACard,
      name: "Fresh Ink",
    },
  ],
  flavour: "“It looks like it's been here forever.” \n–Flounder",
  color: "emerald",
  cost: 2,
  illustrator: "Adam Fenton",
  number: 98,
  set: "URR",
  rarity: "common",
};
export const signedContract: LorcanitoItemCard = {
  id: "nxy",
  missingTestCase: true,
  name: "Signed Contract",
  characteristics: ["item"],
  text: "**FINE PRINT** Whenever an opponent plays a song, you may draw a card.",
  type: "item",
  abilities: [
    wheneverOpponentPlaysASong({
      name: "FINE PRINT",
      text: "Whenever an opponent plays a song, you may draw a card.",
      optional: true,
      effects: [drawACard],
    }),
  ],
  flavour:
    '"I Would love to help you, of course, but there\'s the little matter of the contract..."\n−Ursula',
  inkwell: true,
  color: "emerald",
  cost: 2,
  illustrator: "Andrew Peka",
  number: 99,
  set: "URR",
  rarity: "uncommon",
};
export const visionSlab: LorcanitoItemCard = {
  id: "mir",
  missingTestCase: true,
  name: "Vision Slab",
  characteristics: ["item"],
  text: "**DANGER REVEALED** At the start of your turn, if an opposing character has damage, gain 1 lore. \n\n\n**TRAPPED!** Damage counters can't be removed.",
  type: "item",
  abilities: [
    atTheStartOfYourTurn({
      name: "Danger Revealed",
      text: "At the start of your turn, if an opposing character has damage, gain 1 lore.",
      conditions: [
        {
          type: "filter",
          comparison: { operator: "gte", value: 1 },
          filters: [
            { filter: "type", value: "character" },
            { filter: "zone", value: "play" },
            { filter: "owner", value: "opponent" },
            { filter: "status", value: "damaged" },
          ],
        },
      ],
      effects: [youGainLore(1)],
    }),
  ],
  flavour: "“Tío Bruno! What's happening to him? We have to help!”\n−Mirabel",
  inkwell: true,
  color: "emerald",
  cost: 3,
  illustrator: "Jonas Petsuskas",
  number: 100,
  set: "URR",
  rarity: "uncommon",
};
export const imperialProclamation: LorcanitoItemCard = {
  id: "vlv",
  name: "Imperial Proclamation",
  characteristics: ["item"],
  text: "**CALL TO THE FRONT** Whenever one of your characters challenges another character, you pay 1 ⬡ less for the next character you play this turn.",
  type: "item",
  abilities: [
    wheneverOneOfYourCharChallengesAnotherChar({
      name: "Call To The Front",
      text: "Whenever one of your characters challenges another character, you pay 1 ⬡ less for the next character you play this turn.",
      effects: [youPayXLessToPlayNextCharThisTurn(1)],
    }),
  ],
  flavour:
    "“By order of the Emperor, one man from every family must server in the Imperial Army”\n−Chi Fu",
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Devin Yang",
  number: 131,
  set: "URR",
  rarity: "rare",
};
export const medallionWeights: LorcanitoItemCard = {
  id: "xo1",
  name: "Medallion Weights",
  characteristics: ["item"],
  text: "**DISCIPLINE AND STRENGTH** ↷, 2 ⬡ - Chosen character gets +2 ※ this turn. Whenever they challenge another character this turn, you may draw a card.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Discipline And Strength",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      text: "↷, 2 ⬡ - Chosen character gets +2 ※ this turn. Whenever they challenge another character this turn, you may draw a card.",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 2,
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
        },
        {
          type: "ability",
          ability: "custom",
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
          customAbility: wheneverChallengesAnotherChar({
            name: "Discipline And Strength",
            text: "Whenever they challenge another character this turn, you may draw a card.",
            optional: true,
            effects: [drawACard],
          }),
        },
      ],
    },
  ],
  inkwell: true,
  color: "ruby",
  cost: 2,
  illustrator: "Defne Tōzūm",
  number: 132,
  set: "URR",
  rarity: "uncommon",
};
export const thePlank: LorcanitoItemCard = {
  id: "xh7",
  name: "The Plank",
  characteristics: ["item"],
  text: "**WALK!** 2 ⬡, Banish this item - Choose one:\n· Banish chosen Hero character.\n· Ready chosen Villain character. They can't quest for the rest of this turn.",
  type: "item",
  abilities: [
    {
      name: "WALK!",
      type: "activated",
      text: "2 ⬡, Banish this item - Choose one:\n· Banish chosen Hero character.\n· Ready chosen Villain character. They can't quest for the rest of this turn.",
      costs: [{ type: "banish" }, { type: "ink", amount: 2 }],
      effects: [
        {
          type: "modal",
          target: chosenCharacter,
          modes: [
            {
              id: "1",
              text: "Banish chosen Hero character.",
              effects: [
                {
                  type: "banish",
                  target: {
                    type: "card",
                    value: 1,
                    filters: [
                      { filter: "type", value: "character" },
                      { filter: "zone", value: "play" },
                      { filter: "characteristics", value: ["hero"] },
                    ],
                  },
                },
              ],
            },
            {
              id: "2",
              text: "Ready chosen Villain character. They can't quest for the rest of this turn.",
              effects: [
                ...readyAndCantQuest({
                  type: "card",
                  value: 1,
                  filters: [
                    { filter: "type", value: "character" },
                    { filter: "zone", value: "play" },
                    { filter: "characteristics", value: ["villain"] },
                  ],
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
  flavour: "It's a once-in-a-lifetime view.",
  color: "ruby",
  cost: 3,
  illustrator: "Roberto Gatto",
  number: 133,
  set: "URR",
  rarity: "common",
};
export const vitalisphere: LorcanitoItemCard = {
  id: "x1o",
  name: "Vitalisphere",
  characteristics: ["item"],
  text: "**EXTRACT OF RUBY** 1 ⬡, Banish this item - Chosen character gains **Rush** and gets +2 ※ this turn. _(They can challenge the turn they're played.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Extract of Ruby",
      text: "1 ⬡, Banish this item - Chosen character gains **Rush** and gets +2 ※ this turn. _(They can challenge the turn they're played.)_",
      costs: [{ type: "ink", amount: 1 }, { type: "banish" }],
      effects: [
        {
          type: "ability",
          ability: "rush",
          modifier: "add",
          duration: "turn",
          target: {
            type: "card",
            value: 1,
            filters: [
              {
                filter: "owner",
                value: "self",
              },
              {
                filter: "type",
                value: "character",
              },
              { filter: "zone", value: "play" },
            ],
          },
        } as AbilityEffect,
        {
          type: "attribute",
          modifier: "add",
          attribute: "strength",
          amount: 2,
          target: {
            type: "card",
            value: 1,
            filters: [
              {
                filter: "owner",
                value: "self",
              },
              {
                filter: "type",
                value: "character",
              },
              { filter: "zone", value: "play" },
            ],
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Sandara Tang",
  number: 134,
  set: "URR",
  rarity: "common",
};
export const fieldOfIce: LorcanitoItemCard = {
  id: "r97",
  missingTestCase: true,
  name: "Field of Ice",
  characteristics: ["item"],
  text: "**ICY DEFENSE** Whenever you play a character, they gain **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_",
  type: "item",
  abilities: [
    wheneverYouPlayACharacter({
      name: "Icy Defense",
      text: "Whenever you play a character, they gain **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_",
      effects: [
        {
          type: "ability",
          ability: "resist",
          modifier: "add",
          amount: 1,
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        },
      ],
    }),
  ],
  inkwell: true,
  color: "sapphire",
  cost: 3,
  illustrator: "Mariana Moreno",
  number: 166,
  set: "URR",
  rarity: "rare",
};
export const greatStoneDragon: LorcanitoItemCard = {
  id: "jbi",
  name: "Great Stone Dragon",
  characteristics: ["item"],
  text: "**ASLEEP** This item enters play exerted.\n\n\n**AWAKEN** ↷- Put a character card from your discard into your inkwell facedown and exerted.",
  type: "item",
  abilities: [
    {
      type: "resolution",
      name: "ASLEEP",
      text: "This item enters play exerted.",
      effects: [
        {
          type: "exert",
          exert: true,
          target: {
            type: "card",
            value: 1,
            filters: [
              {
                filter: "source",
                value: "self",
              },
            ],
          },
        },
      ],
    },
    {
      type: "activated",
      name: "AWAKEN",
      text: "↷- Put a character card from your discard into your inkwell facedown and exerted.",
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "move",
          exerted: true,
          to: "inkwell",
          target: {
            type: "card",
            value: 1,
            filters: [
              {
                filter: "zone",
                value: "discard",
              },
              {
                filter: "type",
                value: "character",
              },
              {
                filter: "owner",
                value: "self",
              },
            ],
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "sapphire",
  cost: 3,
  illustrator: "Ryan Bittner",
  number: 167,
  set: "URR",
  rarity: "uncommon",
};
export const iceBlock: LorcanitoItemCard = {
  id: "i2i",
  missingTestCase: true,
  name: "Ice Block",
  characteristics: ["item"],
  text: "**CHILLY LABOR** ↷ − Chosen character gets -1 ※ this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }],
      name: "Chilly Labor",
      text: "↷ − Chosen character gets -1 ※ this turn.",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 1,
          modifier: "subtract",
          target: chosenCharacter,
        },
      ],
    },
  ],
  flavour: "Frozen ink can be harvested and processed to many useful ends.",
  color: "sapphire",
  cost: 1,
  illustrator: "Gregor Krysinski",
  number: 168,
  set: "URR",
  rarity: "common",
};
export const fortisphere: LorcanitoItemCard = {
  id: "id0",
  name: "Fortisphere",
  characteristics: ["item"],
  text: "**RESOURCEFUL** When you play this item, you may draw a card.\n\n\n**EXTRACT OF STEEL** 1 ⬡, Banish this item - Chosen character of yours gains **Bodyguard** until the start of your next turn. _(An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_",
  type: "item",
  abilities: [
    {
      ...whenYouPlayMayDrawACard,
      name: "RESOURCEFUL",
      text: "**RESOURCEFUL** When you play this item, you may draw a card.",
    },
    {
      type: "activated",
      name: "EXTRACT OF STEEL",
      text: "1 ⬡, Banish this item - Chosen character of yours gains **Bodyguard** until the start of your next turn. _(An opposing character who challenges one of your characters must choose one with Bodyguard if able.)_",
      costs: [{ type: "ink", amount: 1 }, { type: "banish" }],
      effects: [
        {
          type: "ability",
          ability: "bodyguard",
          modifier: "add",
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        } as AbilityEffect,
      ],
    } as ActivatedAbility,
  ],
  inkwell: true,
  color: "steel",
  cost: 1,
  illustrator: "Mariana Moreno Ayala",
  number: 200,
  set: "URR",
  rarity: "common",
};
export const imperialBow: LorcanitoItemCard = {
  id: "mcd",
  missingTestCase: true,
  name: "Imperial Bow",
  characteristics: ["item"],
  text: "**WITHIN RANGE** ↷, 1 ⬡ − Chosen Hero character gains **Challenger** +2 and **Evasive** this turn. _(They get +2 ※ while challenging. They can challenge characters with Evasive.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Within Range",
      text: "↷, 1 ⬡ − Chosen Hero character gains **Challenger** +2 and **Evasive** this turn. _(They get +2 ※ while challenging. They can challenge characters with Evasive.)_",
      costs: [{ type: "exert" }, { type: "ink", amount: 1 }],
      effects: [
        {
          type: "ability",
          ability: "challenger",
          amount: 2,
          modifier: "add",
          duration: "turn",
          target: chosenHeroCharacter,
        },
        {
          type: "ability",
          ability: "evasive",
          modifier: "add",
          duration: "turn",
          target: chosenHeroCharacter,
        },
      ],
    },
  ],
  inkwell: true,
  color: "steel",
  cost: 2,
  illustrator: "Yari Lute",
  number: 201,
  set: "URR",
  rarity: "uncommon",
};
export const rlsLegacysCannon: LorcanitoItemCard = {
  id: "etn",
  missingTestCase: true,
  name: "RLS Legacy's Cannon",
  characteristics: ["item"],
  text: "**BA-BOOM!** ↷, 2 ⬡, Discard a card - Deal 2 damage to chosen character or location.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "BA-BOOM!",
      costs: [
        { type: "exert" },
        {
          type: "ink",
          amount: 2,
        },
        {
          type: "card",
          amount: 1,
          action: "discard",
          filters: [
            { filter: "owner", value: "self" },
            { filter: "zone", value: "hand" },
          ],
        },
      ],
      text: "↷, 2 ⬡, Discard a card - Deal 2 damage to chosen character or location.",
      effects: [
        {
          type: "damage",
          amount: 2,
          target: chosenCharacterOrLocation,
        },
      ],
    },
  ],
  flavour:
    "“So help me, I'll use the ship's cannons to blast ya all to kingdom come!”\n−John Silver",
  color: "steel",
  cost: 3,
  illustrator: "Luigi Aime",
  number: 202,
  set: "URR",
  rarity: "rare",
};
