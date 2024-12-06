import { LorcanitoLocationCard } from "@lorcanito/lorcana-engine";
import {
  gainAbilityWhileHere,
  wheneverACharacterQuestsWhileHere,
  wheneverBanishesAnotherCharacterInChallenge,
  wheneverChallengesAnotherChar,
  wheneverQuests,
  whenThisCharacterBanishedInAChallenge,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  allOpposingCharacters,
  chosenCharacter,
  self,
  thisCard,
  thisCharacter,
  thisLocation,
} from "@lorcanito/lorcana-engine/abilities/targets";
import {
  healEffect,
  returnThisCardToHand,
  youGainLore,
  youMayDrawThenChooseAndDiscard,
} from "@lorcanito/lorcana-engine/effects/effects";
import { yourOtherLocations } from "@lorcanito/lorcana-engine/abilities/target";

export const snugglyDucklingDisreputablePub: LorcanitoLocationCard = {
  id: "ut6",
  name: "Snuggly Duckling",
  title: "Disreputable Pub",
  characteristics: ["location"],
  text: "**ROUTINE RUCKUS** Whenever a character with 3 ※ or more challenges another character while here, gain 1 lore. If the challenging character has 6 ※ or more, gain 3 lore instead.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Routine Ruckus",
      text: "Whenever a character with 3 ※ or more challenges another character while here, gain 1 lore. If the challenging character has 6 ※ or more, gain 3 lore instead.",
      ability: wheneverChallengesAnotherChar({
        name: "Routine Ruckus",
        text: "Whenever a character with 3 ※ or more challenges another character while here, gain 1 lore. If the challenging character has 6 ※ or more, gain 3 lore instead.",
        attackerFilters: [
          {
            filter: "attribute",
            value: "strength",
            comparison: { operator: "gte", value: 3 },
          },
          {
            filter: "attribute",
            value: "strength",
            comparison: { operator: "lt", value: 6 },
          },
        ],
        effects: [youGainLore(1)],
      }),
    }),
    gainAbilityWhileHere({
      name: "Routine Ruckus",
      text: "Whenever a character with 3 ※ or more challenges another character while here, gain 1 lore. If the challenging character has 6 ※ or more, gain 3 lore instead.",
      ability: wheneverChallengesAnotherChar({
        name: "Routine Ruckus",
        text: "Whenever a character with 3 ※ or more challenges another character while here, gain 1 lore. If the challenging character has 6 ※ or more, gain 3 lore instead.",
        attackerFilters: [
          {
            filter: "attribute",
            value: "strength",
            comparison: { operator: "gte", value: 6 },
          },
        ],
        effects: [youGainLore(3)],
      }),
    }),
  ],
  inkwell: true,
  color: "ruby",
  cost: 2,
  moveCost: 2,
  willpower: 9,
  illustrator: "Roberto Gatto",
  number: 135,
  set: "URR",
  // Not sure
  rarity: "rare",
};

export const thebesTheBigOlive: LorcanitoLocationCard = {
  id: "pph",
  name: "Thebes",
  title: "The Big Olive",
  characteristics: ["location"],
  text: "**IF YOU CAN MAKE IT HERE...** During your turn, whenever a character banishes another character in a challenge while here, you gain 2 lore.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "If You Can Make It Here...",
      text: "During your turn, whenever a character banishes another character in a challenge while here, you gain 2 lore.",
      conditions: [
        {
          type: "during-turn",
          value: "self",
        },
      ],
      ability: wheneverBanishesAnotherCharacterInChallenge({
        name: "If You Can Make It Here...",
        text: "During your turn, whenever a character banishes another character in a challenge while here, you gain 2 lore.",
        effects: [
          {
            type: "lore",
            amount: 2,
            modifier: "add",
            target: self,
          },
        ],
      }),
    }),
  ],
  inkwell: true,
  color: "steel",
  cost: 2,
  moveCost: 1,
  willpower: 7,
  illustrator: "Nicolas Ky",
  number: 204,
  set: "URR",
  rarity: "common",
};

export const theWallBorderFortress: LorcanitoLocationCard = {
  id: "w4d",
  name: "The Wall",
  title: "Border Fortress",
  characteristics: ["location"],
  text: "**PROTECT THE REALM** While you have an exerted character here, your other locations can't be challenged.",
  type: "location",
  abilities: [
    {
      type: "static",
      ability: "gain-ability",
      name: "Protect the Realm",
      text: "While you have an exerted character here, your other locations can't be challenged.",
      conditions: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 1 },
          filters: [
            {
              filter: "status",
              value: "exerted",
            },
          ],
        },
      ],
      target: yourOtherLocations,
      gainedAbility: {
        type: "static",
        ability: "effects",
        name: "Protect the Realm",
        text: "While you have an exerted character here, your other locations can't be challenged.",
        effects: [
          {
            type: "restriction",
            restriction: "be-challenged",
            target: thisLocation,
          },
        ],
      },
    },
  ],
  inkwell: true,
  color: "steel",
  cost: 4,
  moveCost: 2,
  willpower: 8,
  illustrator: "Jimmy Lo",
  number: 203,
  set: "URR",
  rarity: "rare",
};

export const arielsGrottoASecretPlace: LorcanitoLocationCard = {
  id: "ip4",
  name: "Ariel's Grotto",
  title: "A Secret Place",
  characteristics: ["location"],
  text: "**TREASURE TROVE** While you have 3 or more items in play, this location gets +2 ◆.",
  type: "location",
  abilities: [
    {
      type: "property-static",
      ability: "attribute",
      text: "While you have 3 or more items in play, this location gets +2 ◆.",
      name: "Treasure Trove",
      effects: [
        {
          type: "attribute",
          attribute: "lore",
          amount: 2,
          modifier: "add",
          target: {
            type: "card",
            value: "all",
            filters: [{ filter: "source", value: "self" }],
          },
        },
      ],
      conditions: [
        {
          type: "filter",
          filters: [
            { filter: "type", value: "item" },
            { filter: "zone", value: "play" },
            { filter: "owner", value: "self" },
          ],
          comparison: {
            operator: "gte",
            value: 3,
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "sapphire",
  cost: 2,
  moveCost: 2,
  willpower: 7,
  illustrator: "Jeremy Adams",
  number: 169,
  set: "URR",
  rarity: "rare",
};
export const winterCampMedicalTent: LorcanitoLocationCard = {
  id: "ppi",
  missingTestCase: true,
  name: "Winter Camp",
  title: "Medical Tent",
  characteristics: ["location"],
  text: "**HELP THE WOUNDED** Whenever a character quests while here, remove up to 2 damage from them. If they're a Hero character, remove up to 4 damage instead.",
  type: "location",
  abilities: [
    wheneverACharacterQuestsWhileHere({
      name: "Help the Wounded",
      text: "Whenever a character quests while here, remove up to 2 damage from them. If they're a Hero character, remove up to 4 damage instead.",
      effects: [healEffect(2, thisCharacter)],
    }),
  ],
  inkwell: true,
  color: "sapphire",
  cost: 3,
  moveCost: 1,
  willpower: 8,
  lore: 1,
  illustrator: "Elodie Mondoloni",
  number: 170,
  set: "URR",
  rarity: "common",
};

export const trainingGroundsImpossiblePillar: LorcanitoLocationCard = {
  id: "c0i",
  missingTestCase: true,
  name: "Training Grounds",
  title: "Impossible Pillar",
  characteristics: ["location"],
  text: "**STRENGTH OF MIND** 1 ⬡ - Chosen character here gets +1 ※ this turn.",
  type: "location",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "ink", amount: 1 }],
      text: "Strength of Mind",
      name: "1 ⬡ - Chosen character here gets +1 ※ this turn.",
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
  inkwell: true,
  color: "ruby",
  cost: 1,
  moveCost: 1,
  willpower: 5,
  illustrator: "Matthew Oates",
  number: 136,
  set: "URR",
  rarity: "common",
};

export const ursulasGardenFullOfTheUnfortunate: LorcanitoLocationCard = {
  id: "bh5",
  name: "Ursula's Garden",
  title: "Full of the Unfortunate",
  characteristics: ["location"],
  text: "**Abandon Hope** While you have an exerted character here, opposing characters get -1 ◆.",
  type: "location",
  abilities: [
    {
      type: "static",
      ability: "effects",
      name: "Abandon Hope",
      text: "While you have an exerted character here, opposing characters get -1 ◆.",
      conditions: [
        {
          type: "chars-at-location",
          comparison: { operator: "gte", value: 1 },
          filters: [
            {
              filter: "status",
              value: "exerted",
            },
          ],
        },
      ],
      effects: [
        {
          type: "attribute",
          attribute: "lore",
          amount: 1,
          modifier: "subtract",
          duration: "static",
          target: allOpposingCharacters,
        },
      ],
    },
  ],
  inkwell: true,
  color: "emerald",
  cost: 4,
  moveCost: 2,
  willpower: 7,
  lore: 1,
  illustrator: "Jonathan Livslyst",
  number: 102,
  set: "URR",
  rarity: "rare",
};

export const hiddenCoveTranquilHaven: LorcanitoLocationCard = {
  id: "s5s",
  name: "Hidden Cove",
  title: "Tranquil Haven",
  characteristics: ["location"],
  text: "**REVITALIZING WATERS** Characters get +1 ※ and +1 ⛨️ while here.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Revitalizing Waters",
      text: "Characters get +1 ※",
      ability: {
        type: "static",
        ability: "effects",
        effects: [
          {
            type: "attribute",
            attribute: "strength",
            amount: 1,
            modifier: "add",
            duration: "static",
            target: {
              type: "card",
              value: "all",
              filters: [{ filter: "source", value: "self" }],
            },
          },
          {
            type: "attribute",
            attribute: "willpower",
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
  flavour: "“Flounder, this is perfect! I can't wait to explore it.” \n−Ariel",
  inkwell: true,
  color: "emerald",
  cost: 1,
  moveCost: 1,
  willpower: 6,
  illustrator: "Roberto Gatto",
  number: 101,
  set: "URR",
  rarity: "common",
};

export const ursulasLairEyeOfTheStorm: LorcanitoLocationCard = {
  id: "tj7",
  missingTestCase: true,
  name: "Ursula's Lair",
  title: "Eye of the Storm",
  characteristics: ["location"],
  text: "**SLIPPERY HALLS** Whenever a characters is banished in a challenge while here, you may return them to your hand. \n\n\n**SEAT OF POWER** Characters named Ursula get +1 ◆ while here.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Seat of Power",
      text: "Characters named Ursula get +1 ◆ while here.",
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
              filters: [
                { filter: "source", value: "self" },
                {
                  filter: "attribute",
                  value: "name",
                  comparison: { operator: "eq", value: "ursula" },
                },
              ],
            },
          },
        ],
      },
    }),
    gainAbilityWhileHere({
      name: "Slippery Halls",
      text: "Whenever a characters is banished in a challenge while here, you may return them to your hand.",
      ability: whenThisCharacterBanishedInAChallenge({
        name: "Slippery Halls",
        text: "Whenever a characters is banished in a challenge while here, you may return them to your hand.",
        optional: true,
        effects: [returnThisCardToHand],
      }),
    }),
  ],
  color: "amethyst",
  cost: 3,
  moveCost: 2,
  willpower: 6,
  lore: 1,
  illustrator: "Eri Welli / Sam Burley",
  number: 68,
  set: "URR",
  rarity: "rare",
};

export const casaMadrigalCasita: LorcanitoLocationCard = {
  id: "x5c",
  missingTestCase: true,
  name: "Casa Madrigal",
  title: "Casita",
  characteristics: ["location"],
  text: "**OUR HOME** At the start of your turn, if you have a character here, gain 1 lore.",
  type: "location",
  abilities: [
    {
      type: "while-static",
      name: "Our Home",
      text: "At the start of your turn, if you have a character here, gain 1 lore.",
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
            attribute: "lore",
            amount: 1,
            modifier: "add",
            target: thisCard,
          },
        ],
      },
    },
  ],
  inkwell: true,
  color: "amethyst",
  cost: 1,
  moveCost: 1,
  willpower: 6,
  illustrator: "Rachel Elese",
  number: 67,
  set: "URR",
  rarity: "common",
};

export const theUnderworldRiverStyx: LorcanitoLocationCard = {
  id: "ez0",
  missingTestCase: true,
  name: "The Underworld",
  title: "River Styx",
  characteristics: ["location"],
  text: "**SAVE A SOUL** Whenever a character quests while here, you may pay 3 ⬡ to return a character card from your discard to your hand.",
  type: "location",
  abilities: [
    wheneverACharacterQuestsWhileHere({
      name: "Save a Soul",
      text: "Whenever a character quests while here, you may pay 3 ⬡ to return a character card from your discard to your hand.",
      optional: true,
      costs: [{ type: "ink", amount: 3 }],
      effects: [
        {
          type: "move",
          to: "hand",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "type", value: "character" },
              { filter: "zone", value: "discard" },
              { filter: "owner", value: "self" },
            ],
          },
        },
      ],
    }),
  ],
  inkwell: true,
  color: "amber",
  cost: 2,
  moveCost: 2,
  willpower: 6,
  lore: 1,
  illustrator: "Jeremy Adams",
  number: 34,
  set: "URR",
  rarity: "rare",
};

export const atlanticaConcertHall: LorcanitoLocationCard = {
  id: "xt0",
  name: "Atlantica",
  title: "Concert Hall",
  characteristics: ["location"],
  text: "**UNDERWATER ACOUSTICS** Characters count as having +2 cost to sing songs while here.",
  type: "location",
  abilities: [
    gainAbilityWhileHere({
      name: "Underwater Acoustics",
      text: "Characters count as having +2 cost to sing songs while here.",
      ability: {
        type: "property-static",
        ability: "attribute",
        name: "Underwater Acoustics",
        text: "Characters count as having +2 cost to sing songs while here.",
        effects: [
          {
            type: "attribute",
            attribute: "singCost",
            amount: 2,
            modifier: "add",
            target: thisCharacter,
          },
        ],
      },
    }),
  ],
  inkwell: true,
  color: "amber",
  cost: 1,
  moveCost: 2,
  willpower: 6,
  illustrator: "Alex Shin",
  number: 33,
  set: "URR",
  rarity: "common",
};
