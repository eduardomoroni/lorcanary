import type { LorcanitoLocationCard } from "@lorcanito/lorcana-engine";
import {
  chosenExertedCharacterCantReadyWhileThisIsInPlace,
  gainAbilityWhileHere,
  recklessAbility,
  wardAbility,
  whenThisCharacterBanished,
  whenYouMoveACharacterHere,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  dealDamageToChosenCharacter,
  drawACard,
} from "@lorcanito/lorcana-engine/effects/effects";
import { thisCharacter } from "@lorcanito/lorcana-engine/abilities/targets";

export const rapunzelsTowerSecludedPrison: LorcanitoLocationCard = {
  id: "nva",
  missingTestCase: true,
  name: "Rapunzel's Tower",
  title: "Secluded Prison",
  characteristics: ["location"],
  text: "**SAFE AND SOUND** Characters get +3 ⛨️ while here.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Safe and Sound",
      text: "Characters get +3 ⛨ while here.",
      ability: {
        type: "property-static",
        ability: "attribute",
        effects: [
          {
            type: "attribute",
            attribute: "willpower",
            amount: 3,
            modifier: "add",
            duration: "static",
            target: thisCharacter,
          },
        ],
      },
    }),
  ],
  flavour: "“It's a scary world out there.”\n—Mother Gothel",
  inkwell: true,
  color: "amber",
  cost: 2,
  willpower: 8,
  lore: 0,
  illustrator: "Jeremy Adams",
  number: 33,
  set: "SSK",
  rarity: "uncommon",
  moveCost: 1,
};
export const prideLandsJungleOasis: LorcanitoLocationCard = {
  id: "peo",
  name: "Pride Lands",
  title: "Jungle Oasis",
  characteristics: ["location"],
  text: "**OUR HUMBLE HOME** While you have 3 or more characters here, you may banish this location to play a character from your discard for free.",
  type: "location",
  abilities: [
    {
      type: "activated",
      name: "**OUR HUMBLE HOME**",
      text: "While you have 3 or more characters here, you may banish this location to play a character from your discard for free.",
      costs: [{ type: "banish" }],
      conditions: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 3 },
        },
      ],
      effects: [
        {
          type: "play",
          forFree: true,
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "discard" },
              { filter: "type", value: "character" },
            ],
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 3,
  willpower: 8,
  lore: 1,
  illustrator: "Matthew Oates",
  number: 34,
  set: "SSK",
  rarity: "rare",
  moveCost: 2,
};

// Same as Genie - Main Attraction
export const elsasIcePalacePlaceOfSolitude: LorcanitoLocationCard = {
  id: "f0m",
  missingTestCase: true,
  name: "Elsa's Ice Palace",
  title: "Place of Solitude",
  characteristics: ["location"],
  text: "**ETERNAL WINTER** When you play this location, choose an exerted character. While this location is in play, that character can't ready at the start of their turn.",
  type: "location",
  abilities: [
    {
      ...chosenExertedCharacterCantReadyWhileThisIsInPlace,
      name: "Eternal Winter",
      text: "When you play this location, choose an exerted character. While this location is in play, that character can't ready at the start of their turn.",
    },
  ],
  color: "amethyst",
  cost: 3,
  willpower: 4,
  lore: 1,
  illustrator: "Wietse Treurniet",
  number: 67,
  set: "SSK",
  rarity: "rare",
  moveCost: 1,
};
export const theLibraryAGiftForBelle: LorcanitoLocationCard = {
  id: "xz3",
  name: "The Library",
  title: "A Gift for Belle",
  characteristics: ["location"],
  text: "**LOST IN A BOOK** Whenever a character is banished while here, you may draw a card.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Lost In a Book",
      text: "Whenever a character is banished while here, you may draw a card.",
      ability: whenThisCharacterBanished({
        name: "Lost In a Book",
        optional: true,
        text: "Whenever a character is banished while here, you may draw a card.",
        effects: [drawACard],
      }),
    }),
  ],
  inkwell: true,
  color: "amethyst",
  cost: 3,
  willpower: 8,
  lore: 1,
  illustrator: "Roberto Gatto",
  number: 68,
  set: "SSK",
  rarity: "uncommon",
  moveCost: 1,
};
export const sherwoodForestOutlawHideaway: LorcanitoLocationCard = {
  id: "pi0",
  name: "Sherwood Forest",
  title: "Outlaw Hideaway",
  characteristics: ["location"],
  text: '**FOREST HOME** Your characters named Robin Hood may move here for free. **FAMILIAR TERRAIN** Characters gain **Ward** and "↷ ,1 ⬡ −Deal 2 damage to chosen damaged character" while here. _(Opponents can\'t choose them except to challenge.)_',
  type: "location",
  abilities: [
    // {
    //   name: "**FOREST HOME**",
    //   text: "Your characters named Robin Hood may move here for free.",
    //   TODO: This is currently done as an if condition inside the onMove function in the CharacterModel
    // },
    gainAbilityWhileHere({
      name: "Familiar Terrain",
      text: "Characters gain **Ward**",
      ability: wardAbility,
    }),
    gainAbilityWhileHere({
      name: "Familiar Terrain",
      text: "↷ – Deal 2 damage to chosen damaged character or location.",
      ability: {
        type: "activated",
        name: "Familiar Terrain",
        text: "↷ , 1 ⬡ − Deal 2 damage to chosen damaged character",
        costs: [{ type: "exert" }, { type: "ink", amount: 1 }],
        effects: [
          {
            type: "damage",
            amount: 2,
            target: {
              type: "card",
              value: 1,
              filters: [
                { filter: "type", value: ["character"] },
                { filter: "zone", value: "play" },
                {
                  filter: "status",
                  value: "damage",
                  comparison: { operator: "gte", value: 1 },
                },
              ],
            },
          },
        ],
      },
    }),
  ],
  inkwell: true,
  color: "emerald",
  cost: 2,
  willpower: 7,
  illustrator: "Douglas De La Hoz",
  number: 101,
  set: "SSK",
  rarity: "rare",
  moveCost: 2,
  movementDiscounts: [
    {
      filters: [
        {
          filter: "attribute",
          value: "name",
          comparison: { operator: "eq", value: "Robin Hood" },
        },
      ],
      amount: 0,
    },
  ],
};
export const tropicalRainforestJaguarLair: LorcanitoLocationCard = {
  id: "voi",
  missingTestCase: true,
  name: "Tropical Rainforest",
  title: "Jaguar Lair",
  characteristics: ["location"],
  text: "**SNACK TIME** Opposing damaged characters gain **Reckless**. _(They can’t quest and must challenge if able.)_",
  type: "location",
  abilities: [
    {
      type: "static",
      ability: "gain-ability",
      name: "Snack Time",
      text: "Opposing damaged characters gain **Reckless**. _(They can’t quest and must challenge if able.)_",
      gainedAbility: recklessAbility,
      target: {
        type: "card",
        value: "all",
        excludeSelf: true,
        filters: [
          { filter: "zone", value: "play" },
          { filter: "type", value: "character" },
          { filter: "owner", value: "opponent" },
          {
            filter: "status",
            value: "damage",
            comparison: { operator: "gte", value: 1 },
          },
        ],
      },
    },
  ],
  inkwell: true,
  color: "emerald",
  cost: 3,
  willpower: 6,
  lore: 1,
  illustrator: "Andreas Rocha",
  number: 102,
  set: "SSK",
  rarity: "uncommon",
  moveCost: 1,
};
export const sugarRushSpeedwayStartingLine: LorcanitoLocationCard = {
  id: "vy0",
  name: "Sugar Rush Speedway",
  title: "Starting Line",
  characteristics: ["location"],
  text: "**ON YOUR MARKS!** Once per turn, you may ↷ chosen character here and deal them 1 damage to move them to another location for free.",
  type: "location",
  abilities: [
    {
      type: "activated",
      name: "On Your Marks",
      dependentEffects: true,
      costs: [],
      text: "Once per turn, you may ↷ chosen character here and deal them 1 damage to move them to another location for free.",
      oncePerTurn: true,
      effects: [
        {
          type: "move-to-location",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
              { filter: "location", value: "source" },
              { filter: "status", value: "ready" },
              { filter: "status", value: "dry" },
            ],
          },
          to: {
            type: "card",
            value: 1,
            excludeSelf: true,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "play" },
              { filter: "type", value: "location" },
              { filter: "characteristics", value: ["location"] },
            ],
          },
        },
        {
          type: "damage",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
              { filter: "location", value: "source" },
              { filter: "status", value: "ready" },
              { filter: "status", value: "dry" },
            ],
          },
          amount: 1,
        },
        {
          type: "exert",
          exert: true,
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
              { filter: "location", value: "source" },
              { filter: "status", value: "ready" },
              { filter: "status", value: "dry" },
            ],
          },
        },
      ],
    },
  ],
  color: "ruby",
  cost: 1,
  willpower: 5,
  illustrator: "Cristian Romero",
  number: 135,
  set: "SSK",
  rarity: "rare",
  moveCost: 0,
};

export const ratigansPartySeedyBackRoom: LorcanitoLocationCard = {
  id: "dq2",
  missingTestCase: true,
  name: "Ratigan's Party",
  title: "Seedy Back Room",
  characteristics: ["location"],
  text: "**MISFITS’ REVELRY** While you have a damaged character here, this location gets +2 ◆.",
  type: "location",
  abilities: [
    {
      type: "while-static",
      name: "Misfits’ Revelry",
      text: "While you have a damaged character here, this location gets +2 ◆.",
      whileCondition: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 1 },
          filters: [
            {
              filter: "status",
              value: "damage",
              comparison: { operator: "gte", value: 1 },
            },
          ],
        },
      ],
      ability: {
        type: "property-static",
        ability: "attribute",
        effects: [
          {
            type: "attribute",
            attribute: "lore",
            amount: 2,
            modifier: "add",
            // TODO: This shouldn't be needed, but TS fails
            target: thisCharacter,
          },
        ],
      },
    },
  ],
  inkwell: true,
  color: "ruby",
  cost: 2,
  willpower: 7,
  illustrator: "Jeremy Adams",
  number: 136,
  set: "SSK",
  rarity: "uncommon",
  moveCost: 1,
};
export const theGreatIlluminaryRadiantBallroom: LorcanitoLocationCard = {
  id: "wys",
  name: "The Great Illuminary",
  title: "Radiant Ballroom",
  characteristics: ["location"],
  text: "**WARM WELCOME** Characters with **Support** get +1 ◆ and +2 ⛨️ while here.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Warm Welcome",
      text: "Characters with **Support** get +1 ◆ and +2 ⛨️ while here.",
      target: {
        type: "card",
        value: "all",
        excludeSelf: true,
        filters: [
          {
            filter: "location",
            value: "source",
          },
          { filter: "ability", value: "support" },
          { filter: "zone", value: "play" },
          { filter: "type", value: "character" },
        ],
      },
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
            target: thisCharacter,
          },
          {
            type: "attribute",
            attribute: "lore",
            amount: 1,
            modifier: "add",
            duration: "static",
            target: thisCharacter,
          },
        ],
      },
    }),
  ],
  flavour: "Every surface glows with the joy of celebration.",
  inkwell: true,
  color: "sapphire",
  cost: 3,
  willpower: 9,
  illustrator: "Carlos Ruiz",
  number: 169,
  set: "SSK",
  rarity: "rare",
  moveCost: 2,
};
export const merlinsCottageTheWizardsHome: LorcanitoLocationCard = {
  id: "d3u",
  name: "Merlin's Cottage",
  title: "The Wizard's Home",
  characteristics: ["location"],
  text: "**KNOWLEDGE IS POWER** Each player plays with the top card of their deck face up.",
  type: "location",
  abilities: [
    // {
    //   name: "**KNOWLEDGE IS POWER**",
    //   text: "Each player plays with the top card of their deck face up.",
    //   TODO: This is implemented directly in the UI
    // },
  ],
  inkwell: true,
  color: "sapphire",
  cost: 1,
  willpower: 7,
  illustrator: "Gabe",
  number: 170,
  set: "SSK",
  rarity: "uncommon",
  moveCost: 1,
};
export const badanonVillainSupportCenter: LorcanitoLocationCard = {
  id: "lvt",
  missingTestCase: true,
  name: "Bad-Anon",
  title: "Villain Support Center",
  characteristics: ["location"],
  text: "**THERE'S NO ONE I'D RATHER BE THAN ME** Villain characters gain ↷, 3 ⬡ - Play a character with the same name as this character for free\" while here.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "THERE'S NO ONE I'D RATHER BE THAN ME",
      text: 'Villain characters gain "↷, 3 ⬡ - Play a character with the same name as this character for free" while here.',
      ability: {
        type: "activated",
        name: "THERE'S NO ONE I'D RATHER BE THAN ME",
        text: "↷, 3 ⬡ - Play a character with the same name as this character for free",
        costs: [{ type: "exert" }, { type: "ink", amount: 3 }],
        effects: [
          {
            type: "play",
            forFree: true,
            target: {
              type: "card",
              value: 1,
              filters: [
                { filter: "owner", value: "self" },
                { filter: "zone", value: "hand" },
                { filter: "type", value: "character" },
                { filter: "characteristics", value: ["villain"] },
                // TODO: Check if the name is the same
              ],
            },
          },
        ],
      },
    }),
  ],
  inkwell: true,
  color: "steel",
  cost: 2,
  willpower: 7,
  lore: 1,
  illustrator: "Saulo Nate",
  number: 203,
  set: "SSK",
  rarity: "rare",
  moveCost: 1,
};
export const sevenDwarfsMineSecureFortress: LorcanitoLocationCard = {
  id: "m2o",
  name: "Seven Dwarfs' Mine",
  title: "Secure Fortress",
  characteristics: ["location"],
  text: "**MOUNTAIN DEFENSE** During your turn, the first time you move a character here, you may deal 1 damage to chosen character. If the moved character is a Knight, deal 2 damage instead.",
  type: "location",
  abilities: [
    whenYouMoveACharacterHere({
      name: "Mountain Defense",
      text: "During your turn, the first time you move a character here, you may deal 1 damage to chosen character. If the moved character is a Knight, deal 2 damage instead.",
      optional: true,
      conditions: [
        { type: "first-time-move-to-location" },
        {
          type: "during-turn",
          value: "self",
        },
      ],
      target: {
        type: "card",
        value: 1,
        filters: [
          { filter: "characteristics", value: ["knight"] },
          { filter: "type", value: "character" },
          { filter: "zone", value: "play" },
        ],
      },
      effects: [dealDamageToChosenCharacter(2)],
    }),
    whenYouMoveACharacterHere({
      name: "Mountain Defense",
      text: "During your turn, the first time you move a character here, you may deal 1 damage to chosen character. If the moved character is a Knight, deal 2 damage instead.",
      optional: true,
      conditions: [
        { type: "first-time-move-to-location" },
        {
          type: "during-turn",
          value: "self",
        },
      ],
      target: {
        type: "card",
        value: 1,
        filters: [
          { filter: "characteristics", value: ["knight"], negate: true },
          { filter: "type", value: "character" },
          { filter: "zone", value: "play" },
        ],
      },
      effects: [dealDamageToChosenCharacter(1)],
    }),
  ],
  inkwell: true,
  color: "steel",
  cost: 2,
  willpower: 6,
  lore: 1,
  illustrator: "Alexa Rockman",
  number: 204,
  set: "SSK",
  rarity: "uncommon",
  moveCost: 2,
};
