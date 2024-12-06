import type {
  AbilityEffect,
  CardEffectTarget,
  LorcanitoItemCard,
  NumericComparison,
  TargetConditionalEffect,
  TargetFilter,
} from "@lorcanito/lorcana-engine";
import {
  chosenCardFromYourHand,
  chosenCharacter,
  eachOfYourCharacters,
  opponent,
  self,
  yourCharacters,
} from "@lorcanito/lorcana-engine/abilities/targets";
import {
  ActivatedAbility,
  atTheEndOfOpponentTurn,
  atTheStartOfYourTurn,
  wheneverOneOfYourCharactersIsBanishedInAChallenge,
  whenYouPlayThisForEachYouPayLess,
  whenYourOtherCharactersIsBanished,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  chosenCharacterGainsResist,
  chosenCharacterGetLoreThisTurn,
  dealDamageToChosenCharacter,
  drawACard,
  entersPlayExerted,
  opponentLoseLore,
  revealTopOfDeckPutInHandOrDeck,
  youGainLore,
} from "@lorcanito/lorcana-engine/effects/effects";

export const healingDecanterItem: LorcanitoItemCard = {
  id: "t6p",
  missingTestCase: true,
  name: "Healing Decanter",
  characteristics: ["item"],
  text: "**RENEWING ESSENCE** ↷ – Remove up to 2 damage from chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }],
      name: "RENEWING ESSENCE",
      text: "↷ – Remove up to 2 damage from chosen character.",
      effects: [
        {
          type: "heal",
          amount: 2,
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 2,
  illustrator: "Alex Accorsi",
  number: 30,
  set: "SSK",
  rarity: "common",
};
export const queensSensorCoreItem: LorcanitoItemCard = {
  id: "rj3",
  name: "Queen's Sensor Core",
  characteristics: ["item"],
  text: "**SYMBOL OF NOBILITY** At the start of your turn, if you have a Princess or Queen character in play, gain 1 lore.<br>\n**ROYAL SEARCH** ↷, 2 ⬡ – Reveal the top card of your deck. If it’s a Princess or Queen character card, you may put it into your hand. Otherwise, put it on the top of your deck.",
  type: "item",
  abilities: [
    atTheStartOfYourTurn({
      name: "SYMBOL OF NOBILITY",
      text: "At the start of your turn, if you have a Princess or Queen character in play, gain 1 lore.",
      resolutionConditions: [
        {
          type: "filter",
          comparison: { operator: "gte", value: 1 },
          filters: [
            { filter: "type", value: "character" },
            { filter: "zone", value: "play" },
            { filter: "owner", value: "self" },
            {
              filter: "characteristics",
              conjunction: "or",
              value: ["princess", "queen"],
            },
          ],
        },
      ],
      effects: [youGainLore(1)],
    }),
    {
      type: "activated",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      name: "Royal Search",
      text: "↷, 2 ⬡ – Reveal the top card of your deck. If it’s a Princess or Queen character card, you may put it into your hand. Otherwise, put it on the top of your deck.",
      effects: revealTopOfDeckPutInHandOrDeck({
        mode: "top",
        tutorFilters: [
          { filter: "type", value: "character" },
          { filter: "owner", value: "self" },
          {
            filter: "characteristics",
            conjunction: "or",
            value: ["princess", "queen"],
          },
        ],
      }),
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 2,
  lore: 1,
  illustrator: "Juan Diego Leon",
  number: 31,
  set: "SSK",
  rarity: "rare",
};
export const amberChromiconItem: LorcanitoItemCard = {
  id: "ny4",
  missingTestCase: true,
  name: "Amber Chromicon",
  characteristics: ["item"],
  text: "**AMBER LIGHT** ↷ – Remove up to 1 damage from each of your characters.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }],
      name: "AMBER LIGHT",
      text: "↷ – Remove up to 1 damage from each of your characters.",
      effects: [
        {
          type: "heal",
          amount: 1,
          target: eachOfYourCharacters,
        },
      ],
    },
  ],
  flavour: "“Comfort the weak and weary.”\n–Inscription",
  inkwell: true,
  color: "amber",
  cost: 2,
  illustrator: "Dustin Panzino",
  number: 32,
  set: "SSK",
  rarity: "uncommon",
};
export const retrosphere: LorcanitoItemCard = {
  id: "i9p",
  name: "Retrosphere",
  characteristics: ["item"],
  text: "**EXTRACT OF AMETHYST** 2 ⬡, Banish this item – Return chosen character, item, or location with cost 3 or less to their player’s hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "**EXTRACT OF AMETHYST**",
      text: "2 ⬡, Banish this item – Return chosen character, item, or location with cost 3 or less to their player’s hand.",
      costs: [{ type: "ink", amount: 2 }, { type: "banish" }],
      effects: [
        {
          type: "move",
          to: "hand",
          target: {
            type: "card",
            value: 1,
            filters: [
              {
                filter: "attribute",
                value: "cost",
                comparison: { operator: "lte", value: 3 },
              },
              { filter: "type", value: ["character", "item", "location"] },
              { filter: "zone", value: "play" },
            ],
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "amethyst",
  cost: 1,
  illustrator: "Stefano Zanchi",
  number: 64,
  set: "SSK",
  rarity: "common",
};
export const halfHexwellCrown: LorcanitoItemCard = {
  id: "tj0",
  missingTestCase: true,
  name: "Half Hexwell Crown",
  characteristics: ["item"],
  text: "**AN UNEXPECTED FIND**, ↷, 2 ⬡ — Draw a card. *A PERILOUS POWER** ↷, 2 ⬡, Discard a card – Exert chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "AN UNEXPECTED FIND",
      text: "↷, 2 ⬡ — Draw a card.",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [drawACard],
    },
    {
      type: "activated",
      name: "A PERILOUS POWER",
      text: "↷, 2 ⬡, Discard a card – Exert chosen character.",
      costs: [
        { type: "exert" },
        { type: "ink", amount: 2 },
        {
          type: "card",
          action: "discard",
          amount: 1,
          filters: chosenCardFromYourHand.filters,
        },
      ],
      effects: [drawACard],
    },
  ],
  flavour: "The broken crown holds dark and mysterious powers.",
  color: "amethyst",
  cost: 6,
  illustrator: "John Loren",
  number: 65,
  set: "SSK",
  rarity: "rare",
};
export const amethystChromicon: LorcanitoItemCard = {
  id: "onp",
  missingTestCase: true,
  name: "Amethyst Chromicon",
  characteristics: ["item"],
  text: "**AMETHYST LIGHT** ↷ − Each player may draw a card.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Amethyst Light",
      text: "↷ − Each player may draw a card.",
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "create-layer-for-player",
          target: self,
          layer: {
            type: "resolution",
            name: "Amethyst Light",
            text: "You may draw a card.",
            optional: true,
            effects: [drawACard],
          },
        },
        {
          type: "create-layer-for-player",
          target: opponent,
          layer: {
            type: "resolution",
            name: "Amethyst Light",
            text: "You may draw a card.",
            optional: true,
            responder: "opponent",
            effects: [drawACard],
          },
        },
      ],
    },
  ],
  flavour: "“Seek not power for its own sake.”\n–Inscription",
  inkwell: true,
  color: "amethyst",
  cost: 2,
  illustrator: "Dustin Panzino",
  number: 66,
  set: "SSK",
  rarity: "uncommon",
};
export const princeJohnsMirror: LorcanitoItemCard = {
  id: "l9o",
  name: "Prince John's Mirror",
  characteristics: ["item"],
  text: "**YOU LOOK REGAL** If you have a character named Prince John in play, you pay 1 ⬡ less to play this item. **A FEELING OF POWER** At the end of each opponent’s turn, if they have more than 3 cards in their hand, they discard until they have 3 cards in their hand.",
  type: "item",
  abilities: [
    whenYouPlayThisForEachYouPayLess({
      name: "You Look Regal",
      text: "If you have a character named Prince John in play, you pay 1 ⬡ less to play this item.",
      amount: 1,
      conditions: [
        {
          type: "filter",
          comparison: {
            operator: "gte",
            value: 1,
          },
          filters: [
            {
              filter: "attribute",
              value: "name",
              comparison: { operator: "eq", value: "Prince John" },
            },
            { filter: "type", value: "character" },
            { filter: "zone", value: "play" },
            { filter: "owner", value: "self" },
          ],
        },
      ],
    }),
    atTheEndOfOpponentTurn({
      name: "A Feeling Of Power",
      text: "At the end of each opponent’s turn, if they have more than 3 cards in their hand, they discard until they have 3 cards in their hand.",
      responder: "opponent",
      conditions: [
        {
          type: "filter",
          comparison: { operator: "gt", value: 3 },
          filters: [
            { filter: "zone", value: "hand" },
            { filter: "owner", value: "opponent" },
          ],
        },
      ],
      effects: [
        {
          type: "discard",
          // TODO: We should remove amount from here
          amount: {
            dynamic: true,
            difference: 3,
            filters: [
              { filter: "zone", value: "hand" },
              { filter: "owner", value: "opponent" },
            ],
          },
          target: {
            type: "card",
            value: {
              dynamic: true,
              difference: 3,
              filters: [
                { filter: "zone", value: "hand" },
                { filter: "owner", value: "opponent" },
              ],
            },
            filters: [
              { filter: "zone", value: "hand" },
              { filter: "owner", value: "self" },
            ],
          },
        },
      ],
    }),
  ],
  inkwell: true,
  color: "emerald",
  cost: 3,
  illustrator: "Stefano Zanchi",
  number: 98,
  set: "SSK",
  rarity: "rare",
};
export const obscurosphere: LorcanitoItemCard = {
  id: "z4x",
  missingTestCase: true,
  name: "Obscurosphere",
  characteristics: ["item"],
  text: "**EXTRACT OF EMERALD** 2 ⬡, Banish this item – Your characters gain **Ward** until the start of your next turn. _(Opponents can't choose them except to challenge.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "**EXTRACT OF EMERALD**",
      text: "2 ⬡, Banish this item – Your characters gain **Ward** until the start of your next turn. _(Opponents can't choose them except to challenge.)_",
      costs: [{ type: "ink", amount: 2 }, { type: "banish" }],
      effects: [
        {
          type: "ability",
          ability: "ward",
          modifier: "add",
          duration: "next_turn",
          until: true,
          target: yourCharacters,
        } as AbilityEffect,
      ],
    },
  ],
  inkwell: true,
  color: "emerald",
  cost: 1,
  illustrator: "Stefano Zanchi",
  number: 99,
  set: "SSK",
  rarity: "common",
};
export const emeraldChromiconItem: LorcanitoItemCard = {
  id: "ewm",
  name: "Emerald Chromicon",
  characteristics: ["item"],
  text: "**EMERALD LIGHT** During opponents’ turns, whenever one of your characters is banished, you may return chosen character to their player’s hand.",
  type: "item",
  abilities: [
    whenYourOtherCharactersIsBanished({
      name: "Emerald Light",
      text: "During opponents’ turns, whenever one of your characters is banished, you may return chosen character to their player’s hand.",
      optional: true,
      conditions: [
        {
          type: "during-turn",
          value: "opponent",
        },
      ],
      effects: [
        {
          type: "move",
          to: "hand",
          target: chosenCharacter,
        },
      ],
    }),
  ],
  flavour: "“Trust in the winds of change.”\n–Inscription",
  color: "emerald",
  cost: 3,
  illustrator: "Dustin Panzino",
  number: 100,
  set: "SSK",
  rarity: "uncommon",
};
const targetingVillain = {
  type: "card",
  value: 1,
  filters: [
    { filter: "type", value: "character" },
    { filter: "zone", value: "play" },
    {
      filter: "characteristics",
      value: ["villain"],
    },
  ],
};
export const potionOfMight: LorcanitoItemCard = {
  id: "a59",
  missingTestCase: true,
  name: "Potion of Might",
  characteristics: ["item"],
  text: "**VILE CONCOCTION** 1 ⬡ Banish this item – Chosen character gets +3 ※ this turn. If a Villain character is chosen, they get +4 ※ instead.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "VILE CONCOCTION",
      text: "1 ⬡ Banish this item – Chosen character gets +3 ※ this turn. If a Villain character is chosen, they get +4 ※ instead.",
      costs: [{ type: "ink", amount: 1 }, { type: "banish" }],
      effects: [
        {
          type: "target-conditional",
          effects: [
            {
              type: "attribute",
              attribute: "strength",
              amount: 4,
              modifier: "add",
              duration: "turn",
              target: targetingVillain,
            },
          ],
          fallback: [
            {
              type: "attribute",
              attribute: "strength",
              amount: 3,
              modifier: "add",
              duration: "turn",
              target: chosenCharacter,
            },
          ],
          // TODO: Re implement conditional target
          target: targetingVillain,
        } as TargetConditionalEffect,
      ],
    },
  ],
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Kendall Hale",
  number: 132,
  set: "SSK",
  rarity: "common",
};
export const theSwordReleased: LorcanitoItemCard = {
  id: "v7f",
  missingTestCase: true,
  name: "The Sword Released",
  characteristics: ["item"],
  text: "**POWER APPOINTED** At the start of your turn, if you have a character in play with more ※ than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.",
  type: "item",
  abilities: [
    atTheStartOfYourTurn({
      name: "Power Appointed",
      text: "At the start of your turn, if you have a character in play with more ※ than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.",
      conditions: [{ type: "have-strongest-character" }],
      effects: [youGainLore(1), opponentLoseLore(1)],
    }),
  ],
  color: "ruby",
  cost: 3,
  illustrator: "Mario Oscar Gabriele",
  number: 133,
  set: "SSK",
  rarity: "rare",
};
export const rubyChromicon: LorcanitoItemCard = {
  id: "bzl",
  missingTestCase: true,
  name: "Ruby Chromicon",
  characteristics: ["item"],
  text: "**RUBY LIGHT** ↷ − Chosen character gets +1 ※ this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }],
      text: "Ruby Light",
      name: "↷ − Chosen character gets +1 ※ this turn.",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 1,
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
        },
      ],
    },
  ],
  flavour: "“Leave fear behind.”\n−Inscription",
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Dustin Panzino",
  number: 134,
  set: "SSK",
  rarity: "uncommon",
};
export const medalOfHeroes: LorcanitoItemCard = {
  id: "xz9",
  missingTestCase: true,
  name: "Medal of Heroes",
  characteristics: ["item"],
  text: "**CONGRATULATIONS, SOLDIER**↷, 2 ⬡, Banish this item − Chosen character of yours gets +2 ◆ this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Congratulations, Soldier",
      text: "↷, 2 ⬡, Banish this item − Chosen character of yours gets +2 ◆ this turn.",
      costs: [{ type: "ink", amount: 2 }, { type: "banish" }],
      effects: [chosenCharacterGetLoreThisTurn(2)],
    },
  ],
  flavour:
    "“You have etched in the rock of virtue a legacy beyond compare.”\n–General Hologram",
  inkwell: true,
  color: "sapphire",
  cost: 2,
  illustrator: "Toni Bruno",
  number: 165,
  set: "SSK",
  rarity: "common",
};
export const merlinsCarpetbag: LorcanitoItemCard = {
  id: "izc",
  missingTestCase: true,
  name: "Merlin's Carpetbag",
  characteristics: ["item"],
  text: "**Hockety Pockety**↷, 1 ⬡ – Return an item card from your discard to your hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Hockety Pockety",
      text: "↷, 1 ⬡ – Return an item card from your discard to your hand.",
      costs: [{ type: "exert" }, { type: "ink", amount: 1 }],
      effects: [
        {
          type: "move",
          to: "hand",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "type", value: "item" },
              { filter: "zone", value: "discard" },
              { filter: "owner", value: "self" },
            ],
          },
        },
      ],
    },
  ],
  flavour: "“What a way to pack!”\n–Arthur",
  color: "sapphire",
  cost: 5,
  illustrator: "Gaku Kumatori",
  number: 167,
  set: "SSK",
  rarity: "uncommon",
};
export const sapphireChromicon: LorcanitoItemCard = {
  id: "f9o",
  missingTestCase: true,
  name: "Sapphire Chromicon",
  characteristics: ["item"],
  text: "**POWERING UP** This item enters play exerted.<br>**SAPPHIRE LIGHT** ↷, 2 ⬡, Banish one of your items – Gain 2 lore.",
  type: "item",
  abilities: [
    entersPlayExerted({
      name: "Powering UP",
    }),
    {
      type: "activated",
      name: "Sapphire Light",
      text: "↷, 2 ⬡, Banish one of your items – Gain 2 lore.",
      costs: [
        { type: "exert" },
        { type: "ink", amount: 2 },
        { type: "banish" },
      ],
      effects: [youGainLore(2)],
    },
  ],
  flavour: "“Knowledge is eternal.”\n–Inscription",
  color: "sapphire",
  cost: 4,
  illustrator: "Dustin Panzino",
  number: 168,
  set: "SSK",
  rarity: "uncommon",
};
export const shieldOfArendelle: LorcanitoItemCard = {
  id: "ws0",
  name: "Shield of Arendelle",
  characteristics: ["item"],
  text: "**DEFLECT** Banish this item – Chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Deflect",
      text: "Banish this item – Chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "ability",
          ability: "resist",
          amount: 1,
          modifier: "add",
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        } as AbilityEffect,
      ],
    },
  ],
  inkwell: true,
  color: "steel",
  cost: 1,
  illustrator: "Eva Widermann",
  number: 200,
  set: "SSK",
  rarity: "common",
};
export const plateArmor: LorcanitoItemCard = {
  id: "pwi",
  missingTestCase: true,
  name: "Plate Armor",
  characteristics: ["item"],
  text: "**WELL CRAFTED** ↷ – Chosen character gains **Resist** +2 until the start of your next turn. _(Damage dealt to them is reduced by 2.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Well Crafted",
      text: " ↷ – Chosen character gains **Resist** +2 until the start of your next turn. _(Damage dealt to them is reduced by 2.)_",
      costs: [{ type: "exert" }],
      effects: [chosenCharacterGainsResist(2)],
    },
  ],
  color: "steel",
  cost: 4,
  illustrator: "Gaku Kumatori",
  number: 201,
  set: "SSK",
  rarity: "rare",
};
export const steelChromicon: LorcanitoItemCard = {
  id: "yz9",
  missingTestCase: true,
  name: "Steel Chromicon",
  characteristics: ["item"],
  text: "**STEEL LIGHT** ↷ – Deal 1 damage to chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "STEEL LIGHT",
      text: "↷ – Deal 1 damage to chosen character.",
      costs: [{ type: "exert" }],
      effects: [dealDamageToChosenCharacter(1)],
    },
  ],
  flavour: "“Strong in will, strong in battle.”\n−Inscription",
  color: "steel",
  cost: 6,
  illustrator: "Dustin Panzino",
  number: 202,
  set: "SSK",
  rarity: "uncommon",
};
export const basilsMagnifyingGlass: LorcanitoItemCard = {
  id: "q09",
  missingTestCase: true,
  name: "Basil's Magnifying Glass",
  characteristics: [],
  text: "**FIND WHAT’S HIDDEN** ↷, 2 ⬡ - Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "FIND WHAT’S HIDDEN",
      text: "↷, 2 ⬡ - Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [
        {
          type: "scry",
          amount: 3,
          mode: "bottom",
          shouldRevealTutored: true,
          target: self,
          limits: {
            bottom: 3,
            inkwell: 0,
            top: 0,
            hand: 1,
          },
          tutorFilters: [
            { filter: "owner", value: "self" },
            { filter: "zone", value: "deck" },
            { filter: "type", value: "item" },
          ],
        },
      ],
    },
  ],
  flavour: '"I say, a piece of the Hexwell Crown!" -Basil',
  inkwell: true,
  color: "sapphire",
  cost: 2,
  illustrator: "McKay Anderson",
  number: 166,
  set: "SSK",
  rarity: "rare",
};
