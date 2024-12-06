import type { LorcanitoItemCard } from "@lorcanito/lorcana-engine/cards/cardTypes";
import type { AbilityEffect } from "@lorcanito/lorcana-engine/effects/effectTypes";
import {
  CardEffectTarget,
  PlayerEffectTarget,
} from "@lorcanito/lorcana-engine/effects/effectTargets";
import {
  ActivatedAbility,
  type EffectStaticAbility,
  exertCharCost,
  type GainAbilityStaticAbility,
  wardAbility,
  wheneverTargetPlays,
  whenYouPlayMayDrawACard,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  chosenCharacterGainsResist,
  damageCharacterOfYours,
} from "@lorcanito/lorcana-engine/effects/effects";

const self: PlayerEffectTarget = {
  type: "player",
  value: "self",
};

const chosenCharacter: CardEffectTarget = {
  type: "card",
  value: 1,
  filters: [
    { filter: "zone", value: "play" },
    { filter: "type", value: "character" },
  ],
};

const chosenCharacterOfYours: CardEffectTarget = {
  type: "card",
  value: 1,
  filters: [
    { filter: "zone", value: "play" },
    { filter: "type", value: "character" },
    { filter: "owner", value: "self" },
  ],
};

export const dragonGem: LorcanitoItemCard = {
  id: "mwf",
  name: "Dragon Gem",
  characteristics: ["item"],
  text: "**BRING BACK TO LIFE** ↷, 3 ⬡ − Return a character card with **Support** from your discard to your hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Bring Back to Life",
      text: "↷, 3 ⬡ − Return a character card with **Support** from your discard to your hand.",
      costs: [{ type: "exert" }, { type: "ink", amount: 3 }],
      effects: [
        {
          type: "move",
          to: "hand",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "type", value: "character" },
              { filter: "zone", value: "discard" },
              { filter: "ability", value: "support" },
            ],
          },
        },
      ],
    },
  ],
  flavour: "Hope shines in even the darkest situations.",
  color: "amber",
  cost: 3,
  illustrator: "Andrew Trabbold",
  number: 33,
  set: "ROF",
  rarity: "rare",
};
export const sleepysFlute: LorcanitoItemCard = {
  id: "fn4",
  name: "Sleepy's Flute",
  characteristics: ["item"],
  text: "**A SILLY SONG** ↷ − If you played a song this turn, gain 1 lore.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "A Silly Song",
      text: "↷ − If you played a song this turn, gain 1 lore.",
      optional: false,
      costs: [{ type: "exert" }],
      conditions: [{ type: "played-songs" }],
      effects: [
        {
          type: "lore",
          amount: 1,
          modifier: "add",
          target: {
            type: "player",
            value: "self",
          },
        },
      ],
    },
  ],
  color: "amber",
  cost: 2,
  illustrator: "Antonia Flechsig",
  number: 34,
  set: "ROF",
  rarity: "rare",
};
export const bindingContract: LorcanitoItemCard = {
  id: "n9a",

  name: "Binding Contract",
  characteristics: ["item"],
  text: "**FOR ALL ETERNITY** ↷, ↷ one of your characters − Exert chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "For All Eternity",
      text: "↷, ↷ one of your characters − Exert chosen character.",
      costs: [{ type: "exert" }, exertCharCost(1)],
      effects: [
        {
          type: "exert",
          exert: true,
          target: chosenCharacter,
        },
      ],
    },
  ],
  flavour: "Just a standard form, nothing to worry about.",
  color: "amethyst",
  cost: 4,
  illustrator: "Kasia Brzezinska",
  number: 65,
  set: "ROF",
  rarity: "uncommon",
};
export const croquetMallet: LorcanitoItemCard = {
  id: "kn8",

  name: "Croquet Mallet",
  characteristics: ["item"],
  text: "**HURTLING HEDGEHOG** Banish this item − Chosen character gains **Rush** this turn. _(They can challenge the turn they're played.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Hurtling Hedgehog",
      text: "Banish this item − Chosen character gains **Rush** this turn. _(They can challenge the turn they're played.)_",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "ability",
          ability: "rush",
          amount: 1,
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
        } as AbilityEffect,
      ],
    },
  ],
  color: "amethyst",
  cost: 1,
  illustrator: "Matt Chapman",
  number: 66,
  set: "ROF",
  rarity: "common",
};
export const perplexingSignposts: LorcanitoItemCard = {
  id: "i4b",

  name: "Perplexing Signposts",
  characteristics: ["item"],
  text: "**TO WONDERLAND** Banish this item – Return chosen character of yours to your hand.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "To Wonderland",
      text: "Banish this item – Return chosen character of yours to your hand.",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "move",
          to: "hand",
          target: chosenCharacterOfYours,
        },
      ],
    },
  ],
  flavour:
    "Alice: “I just wanted to ask you which way I ought to go.” \nCheshire Cat: “Well, that depends on where you want to get to.”",
  color: "amethyst",
  cost: 2,
  illustrator: "Andrew Trabbold",
  number: 67,
  set: "ROF",
  rarity: "rare",
};
export const theSorcerersSpellbook: LorcanitoItemCard = {
  id: "gdz",

  name: "The Sorcerer's Spellbook",
  characteristics: ["item"],
  text: "**KNOWLEDGE** ↷, 1 ⬡ − Gain 1 lore.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Knowledge",
      text: "↷, 1 ⬡ − Gain 1 lore.",
      optional: false,
      costs: [{ type: "exert" }, { type: "ink", amount: 1 }],
      effects: [
        {
          type: "lore",
          amount: 1,
          modifier: "add",
          target: {
            type: "player",
            value: "self",
          },
        },
      ],
    },
  ],
  flavour:
    "Illumineers seek the power of knowledge−but must be aware of the price.",
  color: "amethyst",
  cost: 3,
  illustrator: "Julie Vu",
  number: 68,
  set: "ROF",
  rarity: "rare",
};
export const ratigansMarvelousTrap: LorcanitoItemCard = {
  id: "ihx",

  name: "Ratigan's Marvelous Trap",
  characteristics: ["item"],
  text: "**SNAP! BOOM! TWANG!** Banish this item − Each opponent loses 2 lore.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Snap! Boom! Twang!",
      text: "Banish this item − Each opponent loses 2 lore.",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "lore",
          amount: 2,
          modifier: "subtract",
          target: {
            type: "player",
            value: "opponent",
          },
        },
      ],
    },
  ],
  flavour: "Simple in purpose, elaborate in execution−just like Ratigan.",
  color: "emerald",
  cost: 3,
  illustrator: "Leonardo Giammichele",
  number: 102,
  set: "ROF",
  rarity: "rare",
};

export const dinnerBell: LorcanitoItemCard = {
  id: "s78",

  name: "Dinner Bell",
  characteristics: ["item"],
  text: "**YOU KNOW WHAT HAPPENS** ↷, 2 ⬡ − Draw cards equal to the damage on chosen character of yours, then banish them.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "You Know What Happens",
      text: "↷, 2 ⬡ − Draw cards equal to the damage on chosen character of yours, then banish them.",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [
        {
          type: "draw",
          target: self,
          amount: {
            dynamic: true,
            // TODO: This should be the amount of damage in the char, not the amount of damaged cards.
            filters: damageCharacterOfYours,
          },
        },
        {
          type: "banish",
          target: {
            type: "card",
            value: 1,
            filters: damageCharacterOfYours,
          },
        },
      ],
    },
  ],

  flavour: "The delicate sound of impending doom.",
  color: "ruby",
  cost: 4,
  illustrator: "Peter Brockhammer",
  number: 134,
  set: "ROF",
  rarity: "rare",
};
export const peterPansDagger: LorcanitoItemCard = {
  id: "z0a",

  name: "Peter Pan's Dagger",
  characteristics: ["item"],
  text: "Your characters with **Evasive** get +1 ※.",
  type: "item",
  abilities: [
    {
      type: "static",
      ability: "effects",
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 1,
          modifier: "add",
          duration: "turn",
          target: {
            type: "card",
            value: "all",
            filters: [
              { filter: "zone", value: "play" },
              { filter: "owner", value: "self" },
              { filter: "ability", value: "evasive" },
            ],
          },
        },
      ],
    } as EffectStaticAbility,
  ],
  flavour:
    "Like so much other lore, Peter Pan's dagger was safe in the Great Illuminary until the flood.",
  color: "ruby",
  cost: 2,
  illustrator: "Leonardo Giammichele",
  number: 135,
  set: "ROF",
  rarity: "common",
};
export const swordInTheStone: LorcanitoItemCard = {
  id: "cml",

  name: "Sword In The Stone",
  characteristics: ["item"],
  text: "↷, 2 ⬡ - Chosen character gets +1 ※ this turn for each 1 damage on them.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Sword In The Stone",
      text: "↷, 2 ⬡ - Chosen character gets +1 ※ this turn for each 1 damage on them.",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
          amount: {
            dynamic: true,
            target: { attribute: "damage" },
          },
        },
      ],
    },
  ],
  flavour:
    "“Whoso pulleth out this sword of this stone and anvil is rightwise king born of England.”",
  color: "ruby",
  cost: 1,
  illustrator: "Gaku Kumatori",
  number: 136,
  set: "ROF",
  rarity: "uncommon",
};
export const fangCrossbow: LorcanitoItemCard = {
  id: "ob5",

  name: "Fang Crossbow",
  characteristics: ["item"],
  text: "**CAREFUL AIM** ↷, 2 ⬡ – Chosen character gets -2 ※ this turn.\n\n**STAY BACK!** ↷, Banish this item – Banish chosen Dragon character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Careful Aim",
      text: "↷, 2 ⬡ – Chosen character gets -2 ※ this turn.",
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
      effects: [
        {
          type: "attribute",
          attribute: "strength",
          amount: 2,
          modifier: "subtract",
          duration: "turn",
          target: chosenCharacter,
        },
      ],
    },
    {
      type: "activated",
      name: "Stay Back!",
      text: "↷, Banish this item – Banish chosen Dragon character.",
      costs: [{ type: "exert" }, { type: "banish" }],
      effects: [
        {
          type: "banish",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
              { filter: "characteristics", value: ["dragon"] },
            ],
          },
        },
      ],
    },
  ],
  inkwell: true,
  color: "sapphire",
  cost: 3,
  illustrator: "Antonia Flechsig",
  number: 166,
  set: "ROF",
  rarity: "uncommon",
};
export const gumboPot: LorcanitoItemCard = {
  id: "xf3",

  name: "Gumbo Pot",
  characteristics: ["item"],
  text: "**THE BEST I'VE EVER TASTED** ↷ − Remove 1 damage each from up to 2 chosen characters.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "The Best I've Ever Tasted",
      text: "↷ − Remove 1 damage each from up to 2 chosen characters.",
      optional: false,
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "heal",
          amount: 1,
          target: {
            type: "card",
            value: 2,
            upTo: true,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "type", value: "character" },
              { filter: "zone", value: "play" },
            ],
          },
        },
      ],
    } as ActivatedAbility,
  ],
  flavour: "“A gift this special just got to be shared.” \n−James",
  inkwell: true,
  color: "sapphire",
  cost: 2,
  illustrator: "Tanisha Cherislin",
  number: 167,
  set: "ROF",
  rarity: "common",
};
export const mauricesWorkshop: LorcanitoItemCard = {
  id: "oja",

  name: "Maurice's Workshop",
  characteristics: ["item"],
  text: "**LOOKING FOR THIS?** Whenever you play another item, you may pay 1 ⬡ to draw a card.",
  type: "item",
  abilities: [
    wheneverTargetPlays({
      name: "Looking For This?",
      text: "Whenever you play another item, you may pay 1 ⬡ to draw a card.",
      optional: true,
      costs: [{ type: "ink", amount: 1 }],
      excludeSelf: true,
      triggerFilter: [
        { filter: "type", value: "item" },
        { filter: "owner", value: "self" },
      ],
      effects: [
        {
          type: "draw",
          amount: 1,
          target: {
            type: "player",
            value: "self",
          },
        },
      ],
    }),
  ],
  flavour: "The solution you need could be just a few adjustments away.",
  color: "sapphire",
  cost: 3,
  illustrator: "Antonia Flechsig",
  number: 168,
  set: "ROF",
  rarity: "rare",
};
export const pawpsicle: LorcanitoItemCard = {
  id: "qu5",

  name: "Pawpsicle",
  characteristics: ["item"],
  text: "**JUMBO POP** When you play this item, you may draw a card.\n\n**THAT'S REDWOOD** Banish this item − Remove up to 2 damage from chosen character.",
  type: "item",
  abilities: [
    {
      ...whenYouPlayMayDrawACard,
      name: "Jumbo Pop",
    },
    {
      type: "activated",
      name: "That's Redwood",
      text: "Banish this item − Remove up to 2 damage from chosen character.",
      optional: true,
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "heal",
          amount: 2,
          target: chosenCharacter,
        },
      ],
    } as ActivatedAbility,
  ],
  inkwell: true,
  color: "sapphire",
  cost: 1,
  illustrator: "Isaiah Mesq",
  number: 169,
  set: "ROF",
  rarity: "common",
};
export const sardineCan: LorcanitoItemCard = {
  id: "sdr",

  name: "Sardine Can",
  characteristics: ["item"],
  text: "**FLIGHT CABIN** Your exerted characters gain **Ward**. _(Opponents can’t choose them except to challenge.)_",
  type: "item",
  abilities: [
    {
      type: "static",
      ability: "gain-ability",
      name: "Flight Cabin",
      text: "Your exerted characters gain **Ward**.",
      gainedAbility: wardAbility,
      target: {
        type: "card",
        value: "all",
        filters: [
          { filter: "owner", value: "self" },
          { filter: "zone", value: "play" },
          { filter: "type", value: "character" },
          { filter: "status", value: "exerted" },
        ],
      },
    } as GainAbilityStaticAbility,
  ],
  flavour: "“Flight 3759 boarding now! Let’s go get that lore!” \n–Orville",
  inkwell: true,
  color: "sapphire",
  cost: 4,
  illustrator: "Peter Brockhammer",
  number: 170,
  set: "ROF",
  rarity: "uncommon",
};

export const lastCannon: LorcanitoItemCard = {
  id: "mbx",

  name: "Last Cannon",
  characteristics: ["item"],
  text: "**ARM YOURSELF** 1 ⬡, Banish this item − Chosen character gains **Challenger** +3 this turn. _(They get +3 ※ while challenging.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Arm Yourself",
      text: "1 ⬡, Banish this item − Chosen character gains **Challenger** +3 this turn. _(They get +3 ※ while challenging.)_",
      costs: [{ type: "banish" }, { type: "ink", amount: 1 }],
      effects: [
        {
          type: "ability",
          ability: "challenger",
          amount: 3,
          modifier: "add",
          duration: "turn",
          target: chosenCharacter,
        } as AbilityEffect,
      ],
    },
  ],
  flavour: "One shot can change everything.",
  inkwell: true,
  color: "steel",
  cost: 1,
  illustrator: "Jared Nickerl",
  number: 202,
  set: "ROF",
  rarity: "common",
};

export const mouseArmor: LorcanitoItemCard = {
  id: "xso",

  name: "Mouse Armor",
  characteristics: ["item"],
  text: "**PROTECTION** ↷ − Chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Protection",
      text: "↷ − Chosen character gains **Resist** +1 until the start of your next turn. _(Damage dealt to them is reduced by 1.)_",
      costs: [{ type: "exert" }],
      effects: [chosenCharacterGainsResist(1)],
    },
  ],
  flavour: "Built by the tiniest of hands for the bravest of hearts.",
  color: "steel",
  cost: 2,
  illustrator: "Gaku Kumatori",
  number: 203,
  set: "ROF",
  rarity: "uncommon",
};
export const weightSet: LorcanitoItemCard = {
  id: "k1c",

  name: "Weight Set",
  characteristics: ["item"],
  text: "**TRAINING** Whenever you play a character with 4 ※ or more, you may pay 1 ⬡ to draw a card.",
  type: "item",
  abilities: [
    wheneverTargetPlays({
      name: "Training",
      text: "Whenever you play a character with 4 ※ or more, you may pay 1 ⬡ to draw a card.",
      optional: true,
      costs: [{ type: "ink", amount: 1 }],
      triggerFilter: [
        { filter: "type", value: "character" },
        { filter: "owner", value: "self" },
        {
          filter: "attribute",
          value: "strength",
          comparison: { operator: "gte", value: 4 },
        },
      ],
      effects: [
        {
          type: "draw",
          amount: 1,
          target: {
            type: "player",
            value: "self",
          },
        },
      ],
    }),
  ],
  flavour: "Personally endorsed by Hercules himself!",
  inkwell: true,
  color: "steel",
  cost: 3,
  illustrator: "Antonia Flechsig",
  number: 204,
  set: "ROF",
  rarity: "rare",
};
