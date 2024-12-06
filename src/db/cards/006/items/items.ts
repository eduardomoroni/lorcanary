import type { LorcanitoItemCard } from "@lorcanito/lorcana-engine";
import {
  banishChosenItem,
  chosenCharacterGainsBodyguard,
  drawACard,
  enterPlaysExerted,
  mayBanish,
  millOpponentXCards,
  moveToLocation,
  readyAndCantQuest,
  removeDamageEffect,
  returnChosenCharacterWithCostLess,
  revealTopOfDeckPutInHandOrDeck,
  youGainLore,
  youMayDrawThenChooseAndDiscard,
} from "@lorcanito/lorcana-engine/effects/effects";
import {
  anyTarget,
  chosenCharacter,
  chosenCharacterOfYours,
  chosenDamagedCharacter,
  eachOfYourCharacters,
  oneOfYourOpponentsCharactersItemsOrLocations,
} from "@lorcanito/lorcana-engine/abilities/targets";
import {
  atTheStartOfYourTurn,
  challengerAbility,
  exertCharCost,
  resistAbility,
  wheneverIsReturnedToHand,
  yourOtherCharactersGet,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import { forEachItemYouHaveInPlay } from "@lorcanito/lorcana-engine/abilities/amounts";
import { yourDamagedCharacters } from "@lorcanito/lorcana-engine/abilities/target";

export const madHattersTeapot: LorcanitoItemCard = {
  id: "n9n",
  name: "Mad Hatter's Teapot",
  characteristics: ["item"],
  text: "**NO ROOM, NO ROOM**, ↷, 1 ⬡ – Each opponent puts the top card of their deck into their discard.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "ink", amount: 1 }, { type: "exert" }],
      name: "No Room, No Room",
      text: "↷, 1 ⬡ – Each opponent puts the top card of their deck into their discard.",
      effects: millOpponentXCards(1),
    },
  ],
  flavour:
    "Alice: “My goodness, the tea missed the cup!” \nMad Hatter: “No, no, my dear—the cup missed the tea!”",
  inkwell: true,
  color: "amethyst",
  cost: 2,

  illustrator: "Andrea Parisi",
  number: 66,
  set: "006",
  rarity: "common",
};

export const poohPirateShip: LorcanitoItemCard = {
  id: "snl",
  missingTestCase: true,
  name: "Pooh Pirate Ship",
  characteristics: ["item"],
  text: "MAKE A RESCUE ↷, 3 {I} – Return a Pirate character card from your discard to your hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "ink", amount: 3 }, { type: "exert" }],
      name: "Make A Rescue",
      text: "Return a Pirate character card from your discard to your hand.",
      effects: [
        {
          type: "move",
          to: "hand",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "type", value: ["character"] },
              { filter: "characteristics", value: ["pirate"] },
              { filter: "zone", value: "discard" },
            ],
          },
        },
      ],
    },
  ],
  inkwell: false,
  color: "amber",
  cost: 1,
  illustrator: "Kaitlin Cuthbertson",
  number: 32,
  set: "006",
  rarity: "rare",
};
export const pixieDust: LorcanitoItemCard = {
  id: "t1s",
  missingTestCase: true,
  name: "Pixie Dust",
  characteristics: ["item"],
  text: "FAITH AND TRUST ↷, {2} {I} - Chosen character gains Challenger +2 and Evasive until the start of your next turn. (While challenging, they get +2 {1}. Only characters with Evasive can challenge them.)",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "ink", amount: 2 }, { type: "exert" }],
      effects: [
        {
          type: "ability",
          ability: "evasive",
          modifier: "add",
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        },
        {
          type: "ability",
          ability: "custom",
          customAbility: challengerAbility(2),
          modifier: "add",
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: false,
  color: "amethyst",
  cost: 4,
  illustrator: "Ellie Horie / Mara Tango",
  number: 67,
  set: "006",
  rarity: "uncommon",
};
export const goldCoin: LorcanitoItemCard = {
  id: "jmx",
  missingTestCase: true,
  name: "Gold Coin",
  characteristics: ["item"],
  text: "GLITTERING ACCESS ↷, 1 {I}, Banish this item – Ready chosen character of yours. They can't quest for the rest of this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [
        { type: "ink", amount: 1 },
        { type: "exert" },
        { type: "banish" },
      ],
      effects: readyAndCantQuest(chosenCharacterOfYours),
    },
  ],
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Gabriel Angelo",
  number: 133,
  set: "006",
  rarity: "common",
};
export const jumboPop: LorcanitoItemCard = {
  id: "z6k",
  missingTestCase: true,
  name: "Jumbo Pop",
  characteristics: ["item"],
  text: "HERE YOU GO Banish this item – Remove up to 2 damage from each of your characters. Draw a card.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "banish" }],
      effects: [removeDamageEffect(2, eachOfYourCharacters), drawACard],
    },
  ],
  inkwell: false,
  color: "sapphire",
  cost: 3,
  illustrator: "Alexandra Hefez",
  number: 168,
  set: "006",
  rarity: "common",
};

export const galacticCommunicator: LorcanitoItemCard = {
  id: "ryf",
  missingTestCase: true,
  name: "Galactic Communicator",
  characteristics: ["item"],
  text: "RESOURCE ALLOCATION 1 {I}, Banish this item - Return chosen character with 2 {S} or less to their player's hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "ink", amount: 1 }, { type: "banish" }],
      effects: [returnChosenCharacterWithCostLess(2)],
    },
  ],
  inkwell: false,
  color: "emerald",
  cost: 2,
  illustrator: "Jiahui Eva Gao",
  number: 99,
  set: "006",
  rarity: "common",
};
export const baymaxsHealthcareChip: LorcanitoItemCard = {
  id: "ele",
  missingTestCase: true,
  name: "Baymax's Healthcare Chip",
  characteristics: ["item"],
  text: "10,000 MEDICAL PROCEDURES {E} - Choose one:\n* Remove up to 1 damage from chosen character. \n* If you have a Robot character in play, remove up to 3 damage from chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "modal",
          // TODO: Get rid of target
          target: chosenCharacter,
          modes: [
            {
              id: "1",
              text: "Remove up to 1 damage from chosen character.",
              effects: [removeDamageEffect(1, chosenCharacter)],
            },
            {
              id: "2",
              text: "If you have a Robot character in play, remove up to 3 damage from chosen character.",
              effects: [removeDamageEffect(3, chosenCharacter)],
            },
          ],
        },
      ],
    },
  ],
  inkwell: true,
  color: "sapphire",
  cost: 2,
  illustrator: "Rudy Hill",
  number: 166,
  set: "006",
  rarity: "uncommon",
};
export const sunglasses: LorcanitoItemCard = {
  id: "lqp",
  missingTestCase: true,
  name: "Sunglasses",
  characteristics: ["item"],
  text: "SPYCRAFT {E} - Draw a card, then choose and discard a card.",
  type: "item",
  abilities: [
    {
      ...youMayDrawThenChooseAndDiscard,
      type: "activated",
      costs: [{ type: "exert" }],
    },
  ],
  inkwell: true,
  color: "steel",
  cost: 4,
  illustrator: "Kuya Jaypi",
  number: 202,
  set: "006",
  rarity: "common",
};

export const trainingDummy: LorcanitoItemCard = {
  id: "r2x",
  missingTestCase: true,
  name: "Training Dummy",
  characteristics: ["item"],
  text: "HANDLE WITH CARE {E}, 2 {I} – Chosen character gains Bodyguard until the start of your next turn. (An opposing character who challenges one of your characters must choose one with Bodyguard if able.)",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [
        {
          type: "ability",
          ability: "bodyguard",
          modifier: "add",
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: true,
  color: "steel",
  cost: 2,
  illustrator: "Valentina Grzbuso",
  number: 201,
  set: "006",
  rarity: "uncommon",
};

export const megabot: LorcanitoItemCard = {
  id: "zgw",
  missingTestCase: true,
  name: "Megabot",
  characteristics: ["item"],
  text: "HAPPY FACE This item enters play exerted.\nDESTROY! {E}, Banish this item - Choose one:\n* Banish chosen item.\n* Banish chosen damaged character.",
  type: "item",
  abilities: [
    {
      type: "resolution",
      name: "Happy Face",
      text: "This item enters play exerted.",
      effects: [enterPlaysExerted],
    },
    {
      type: "activated",
      costs: [{ type: "exert" }, { type: "banish" }],
      name: "Destroy!",
      text: "Choose one:\n* Banish chosen item.\n* Banish chosen damaged character.",
      effects: [
        {
          type: "modal",
          target: anyTarget,
          modes: [
            {
              id: "1",
              text: "Banish chosen item.",
              effects: [banishChosenItem],
            },
            {
              id: "2",
              text: "Banish chosen damaged character.",
              effects: [mayBanish(chosenDamagedCharacter)],
            },
          ],
        },
      ],
    },
  ],
  inkwell: false,
  color: "emerald",
  cost: 2,
  illustrator: "Kamil Murzyn",
  number: 98,
  set: "006",
  rarity: "uncommon",
};
export const microbots: LorcanitoItemCard = {
  id: "klj",
  missingTestCase: true,
  name: "Microbots",
  characteristics: ["item"],
  text: "LIMITLESS APPLICATIONS You may have any number of cards named Microbots in your deck.\nINSPIRED TECH When you play this item, chosen character gets -1 {S} this turn for each item named Microbots you have in play.",
  type: "item",
  abilities: [
    {
      type: "resolution",
      name: "Inspired Tech",
      text: "When you play this item, chosen character gets -1 {S} this turn for each item named Microbots you have in play.",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: forEachItemYouHaveInPlay,
          modifier: "subtract",
          duration: "turn",
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: true,
  color: "sapphire",
  cost: 2,
  illustrator: "Stefano Spagnuolo",
  number: 167,
  set: "006",
  rarity: "uncommon",
};

export const naveensUkulele: LorcanitoItemCard = {
  id: "zt0",
  missingTestCase: true,
  name: "Naveen's Ukulele",
  characteristics: ["item"],
  text: "MAKE IT SING 1 {I}, Banish this item - Chosen character counts as having +3 cost to sing songs this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "banish" }, { type: "ink", amount: 1 }],
      name: "Make It Sing",
      text: "1 {I}, Banish this item - Chosen character counts as having +3 cost to sing songs this turn.",
      effects: [
        {
          type: "attribute",
          attribute: "singCost",
          amount: 3,
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 1,
  illustrator: "Levi Rogers",
  number: 31,
  set: "006",
  rarity: "common",
};
export const scrump: LorcanitoItemCard = {
  id: "jwu",
  missingTestCase: true,
  name: "Scrump",
  characteristics: [],
  text: "I MADE HER {E} one of your characters - Chosen character gets -2 {S} until the start of your next turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "I Made Her",
      text: "{E} one of your characters - Chosen character gets -2 {S} until the start of your next turn.",
      costs: [exertCharCost(1)],
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 2,
          modifier: "subtract",
          duration: "next_turn",
          until: true,
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: true,
  color: "amber",
  cost: 2,
  illustrator: "Kipik",
  number: 33,
  set: "006",
  rarity: "uncommon",
};
export const maleficentsStaff: LorcanitoItemCard = {
  id: "o37",
  name: "Maleficent's Staff",
  characteristics: ["item"],
  text: "BACK, FOOLS! Whenever one of your opponents' characters, items, or locations is returned to their hand from play, gain 1 lore.",
  type: "item",
  abilities: [
    wheneverIsReturnedToHand({
      name: "Back, Fools!",
      text: "Whenever one of your opponents' characters, items, or locations is returned to their hand from play, gain 1 lore.",
      target: oneOfYourOpponentsCharactersItemsOrLocations,
      effects: [youGainLore(1)],
    }),
  ],
  inkwell: true,
  color: "amethyst",
  cost: 2,
  illustrator: "Gabriel Angelo",
  number: 65,
  set: "006",
  rarity: "rare",
};
export const transportPod: LorcanitoItemCard = {
  id: "oas",
  name: "Transport Pod",
  characteristics: [],
  text: "GIVE 'EM A SHOW At the start of your turn, you may move a character of yours to a location for free.",
  type: "item",
  abilities: [
    atTheStartOfYourTurn({
      name: "Give 'Em A Show",
      text: "At the start of your turn, you may move a character of yours to a location for free.",
      optional: true,
      effects: [moveToLocation(chosenCharacterOfYours)],
    }),
  ],
  inkwell: true,
  color: "emerald",
  cost: 1,
  illustrator: "Eva Widermann",
  number: 100,
  set: "006",
  rarity: "uncommon",
};
export const longboat: LorcanitoItemCard = {
  id: "gci",
  name: "Longboat",
  characteristics: ["item"],
  text: "TAKE IT FOR A SPIN 2 {I} – Chosen character of yours gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Take It For A Spin",
      text: "2 {I} – Chosen character of yours gains Evasive until the start of your next turn. (Only characters with Evasive can challenge them.)",
      costs: [{ type: "ink", amount: 2 }],
      effects: [
        {
          type: "ability",
          ability: "evasive",
          duration: "next_turn",
          until: true,
          modifier: "add",
          target: chosenCharacter,
        },
      ],
    },
  ],
  inkwell: false,
  color: "ruby",
  cost: 2,
  strength: 0,
  illustrator: "Alex Shin",
  number: 132,
  set: "006",
  rarity: "uncommon",
};
export const cardSoldiersSpear: LorcanitoItemCard = {
  id: "bka",
  missingTestCase: true,
  name: "Card Soldier's Spear",
  characteristics: ["item"],
  text: "A SUITABLE WEAPON Your damaged characters get +1 {S}.",
  type: "item",
  abilities: [
    yourOtherCharactersGet({
      name: "A Suitable Weapon",
      text: "Your damaged characters get +1 {S}.",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 1,
          modifier: "add",
          target: yourDamagedCharacters,
        },
      ],
    }),
  ],
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Kristen Kuloba",
  number: 134,
  set: "006",
  rarity: "uncommon",
};

export const kingsSensorCore: LorcanitoItemCard = {
  id: "nrj",
  name: "King's Sensor Core",
  characteristics: ["item"],
  text: "**SYMBOL OF ROYALTY** Your Prince and King characters gain Resist +1. (Damage dealt to them is reduced by 1.)\n**ROYAL SEARCH** ↷, 2 ⬡ – Reveal the top card of your deck. If it's a Prince or King character card, you may put that card into your hand. Otherwise, put it on the top of your deck.",
  type: "item",
  abilities: [
    {
      type: "static",
      ability: "gain-ability",
      name: "Symbol of Royalty",
      text: "Your Prince and King characters gain Resist +1. (Damage dealt to them is reduced by 1.)",
      gainedAbility: resistAbility(1),
      target: {
        type: "card",
        value: "all",
        excludeSelf: true,
        filters: [
          { filter: "zone", value: "play" },
          { filter: "type", value: "character" },
          { filter: "owner", value: "self" },
          {
            filter: "characteristics",
            conjunction: "or",
            value: ["prince", "king"],
          },
        ],
      },
    },
    {
      type: "activated",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      name: "Royal Search",
      text: "↷, 2 ⬡ – Reveal the top card of your deck. If it’s a Prince or King character card, you may put it into your hand. Otherwise, put it on the top of your deck.",
      effects: revealTopOfDeckPutInHandOrDeck({
        mode: "top",
        tutorFilters: [
          { filter: "type", value: "character" },
          { filter: "owner", value: "self" },
          {
            filter: "characteristics",
            conjunction: "or",
            value: ["prince", "king"],
          },
        ],
      }),
    },
  ],
  inkwell: true,
  color: "steel",
  cost: 3,
  illustrator: "Juan Diego Leon",
  number: 200,
  set: "006",
  rarity: "rare",
};
