import type { LorcanitoItemCard } from "@lorcanito/lorcana-engine/cards/cardTypes";
import type {
  ActivatedAbility,
  ResolutionAbility,
  TriggeredAbility,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import type {
  AbilityEffect,
  ExertEffect,
} from "@lorcanito/lorcana-engine/effects/effectTypes";
import type {
  AttributeEffect,
  TargetConditionalEffect,
  DrawEffect,
  HealEffect,
  ReplacementEffect,
} from "@lorcanito/lorcana-engine/effects/effectTypes";
import {
  wheneverPlays,
  wheneverTargetPlays,
} from "@lorcanito/lorcana-engine/abilities/abilities";
import {
  CardEffectTarget,
  EffectTargets,
} from "@lorcanito/lorcana-engine/effects/effectTargets";
import {
  chosenCharacterCantChallengeDuringNextTurn,
  chosenCharacterGetLoreThisTurn,
  putOneOnTheTopAndTheOtherOnTheBottomOfYourDeck,
  readyAndCantQuest,
} from "@lorcanito/lorcana-engine/effects/effects";
import { BanishTrigger } from "@lorcanito/lorcana-engine/abilities/triggers";

export const dingleHopper: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "qef",

  name: "Dinglehopper",
  text: "**STRAIGHTEN HAIR** ↷ - Remove up to 1 damage from chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Straighten Hair",
      text: "↷ - Remove up to 1 damage from chosen character.",
      optional: false,
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "heal",
          amount: 1,
          target: {
            type: "card",
            value: 1,
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
  flavour: "Enjoy the finest of human hairstyles.",
  inkwell: true,
  color: "amber",
  cost: 1,
  illustrator: "Eri Welli",
  number: 32,
  set: "TFC",
  rarity: "common",
};
export const lantern: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "ub2",

  name: "Lantern",
  text: "**BIRTHDAY LIGHTS** ↷ - You pay 1 ⬡ less for the next character you play this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Birthday Lights",
      text: "↷ - You pay 1 ⬡ less for the next character you play this turn.",
      optional: false,
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "replacement",
          replacement: "cost",
          duration: "next",
          amount: 1,
          target: {
            type: "card",
            value: "all",
            filters: [{ filter: "type", value: "character" }],
          },
        },
      ],
    } as ActivatedAbility,
  ],
  flavour:
    "Lanterns fill the sky on one special night, beacons of hope and love.",
  color: "amber",
  cost: 2,
  illustrator: "Eri Welli",
  number: 33,
  set: "TFC",
  rarity: "rare",
};
export const ursulaShellNecklace: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "nba",

  name: "Ursula's Shell Necklace",
  text: "**NOW, SING!** Whenever you play a song, you may pay 1 ⬡ to draw a card.",
  type: "item",
  abilities: [
    wheneverPlays({
      triggerTarget: {
        type: "card",
        value: 1,
        filters: [
          { filter: "type", value: "action" },
          { filter: "characteristics", value: ["song"] },
          { filter: "owner", value: "self" },
        ],
      },
      costs: [{ type: "ink", amount: 1 }],
      optional: true,
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
  flavour:
    "“Singing is a lovely pastime . . . if you've got the voice for it.” −Ursula",
  color: "amber",
  cost: 3,
  illustrator: "Jenna Gray",
  number: 34,
  set: "TFC",
  rarity: "rare",
};
export const magicMirror: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "bql",

  name: "Magic Mirror",
  text: "**Speak** ↷, 4 ⬡ - Draw a card.",
  type: "item",
  abilities: [
    {
      type: "activated",
      costs: [{ type: "exert" }, { type: "ink", amount: 4 }],
      name: "Speak",
      text: "↷, 4 ⬡ - Draw a card.",
      effects: [
        {
          type: "draw",
          amount: 1,
          target: {
            type: "player",
            value: "self",
          } as EffectTargets,
        },
      ],
    } as ActivatedAbility,
  ],
  flavour: '"What wouldst thou know, my Queen?"',
  color: "amethyst",
  cost: 2,
  illustrator: "Andrew Trabbold",
  number: 66,
  set: "TFC",
  rarity: "rare",
};
export const ursulaCaldron: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "fkd",

  name: "Ursula's Cauldron",
  text: "**PEER INTO THE DEPTHS** ↷ − Look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Peer Into The Depths",
      text: "↷ − Look at the top 2 cards of your deck. Put one on the top of your deck and the other on the bottom.",
      costs: [{ type: "exert" }],
      effects: [putOneOnTheTopAndTheOtherOnTheBottomOfYourDeck],
    } as ActivatedAbility,
  ],
  flavour: "Perfect for mixing potions and stealing voices.",
  color: "amethyst",
  cost: 2,
  number: 67,
  set: "TFC",
  rarity: "uncommon",
  illustrator: "TBD",
};
export const whiteRabbitPocketWatch: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "u45",

  name: "White Rabbit's Pocket Watch",
  text: "**I'm late!** ↷, 1 ⬡ - Chosen character gains **Rush** this turn. _(They can challenge the turn they're played.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "I'm late!",
      text: "Chosen character gains **Rush** this turn. _(They can challenge the turn they're played.)_",
      costs: [{ type: "exert" }, { type: "ink", amount: 1 }],
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
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
            ],
          },
        } as AbilityEffect,
      ],
    } as ActivatedAbility,
  ],
  flavour:
    '"No wonder you\'re late. Why, this clock is exactly two days slow." −The Mad Hatter',
  inkwell: true,
  color: "amethyst",
  cost: 3,
  illustrator: "Kamil Murzyn",
  number: 68,
  set: "TFC",
  rarity: "rare",
};
export const drFacilierCards: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "s8n",

  name: "Dr. Facilier's Cards",
  text: "**THE CARDS WILL TELL** ↷ − You pay 1 ⬡ less for the next action you play this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "The Cards Will Tell",
      text: "You pay 1 ⬡ less for the next action you play this turn.",
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "replacement",
          replacement: "cost",
          duration: "next",
          amount: 1,
          target: {
            type: "card",
            value: "all",
            filters: [{ filter: "type", value: "action" }],
          },
        },
      ],
    } as ActivatedAbility,
  ],
  flavour: "“Take a little trip into your future with me!” \n−Dr. Facilier",
  color: "emerald",
  cost: 2,
  illustrator: "Koni",
  number: 101,
  set: "TFC",
  rarity: "uncommon",
};
const targetingAladdin: AttributeEffect = {
  type: "attribute",
  attribute: "strength",
  amount: 2,
  modifier: "add",
  duration: "turn",
  target: {
    type: "card",
    value: 1,
    filters: [
      { filter: "type", value: "character" },
      { filter: "zone", value: "play" },
      {
        filter: "attribute",
        value: "name",
        comparison: { operator: "eq", value: "aladdin" },
      },
    ],
  },
};
const notTargetingAladdin: AttributeEffect = {
  type: "attribute",
  attribute: "strength",
  amount: 1,
  modifier: "add",
  duration: "turn",
  target: {
    type: "card",
    value: 1,
    filters: [
      { filter: "type", value: "character" },
      { filter: "zone", value: "play" },
    ],
  },
};
export const stolenScimitar: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "h98",

  name: "Stolen Scimitar",
  text: "**SLASH** ↷ − Chosen character get +1 ※ this turn. If a character named Aladdin is chosen, he gets +2 ※ instead.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Slash",
      text: "Chosen character get +1 ※ this turn. If a character named Aladdin is chosen, he gets +2 ※ instead.",
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "target-conditional",
          autoResolve: false,
          // move condition to a separate object, so the filter is the same
          effects: [targetingAladdin],
          fallback: [notTargetingAladdin],
          // TODO: Re implement conditional target
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "type", value: "character" },
              { filter: "zone", value: "play" },
              {
                filter: "attribute",
                value: "name",
                comparison: { operator: "eq", value: "aladdin" },
              },
            ],
          },
        } as TargetConditionalEffect,
      ],
    } as ActivatedAbility,
  ],
  flavour: "Sometimes you've got to take what you can get.",
  inkwell: true,
  color: "emerald",
  cost: 2,
  illustrator: "Kendall Hale",
  number: 102,
  set: "TFC",
  rarity: "common",
};
const chosenCharacter: CardEffectTarget = {
  type: "card",
  value: 1,
  filters: [
    { filter: "type", value: "character" },
    { filter: "zone", value: "play" },
  ],
};
export const poisonedApple: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "g0y",

  name: "Poisoned Apple",
  text: "**TAKE A BITE . . . ** 1 ⬡, Banish this item − Exert chosen character. If a Princess character is chosen, banish her instead.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Poisoned Apple",
      text: "Banish this item − Exert chosen character. If a Princess character is chosen, banish her instead.",
      costs: [{ type: "banish" }, { type: "ink", amount: 1 }],
      effects: [
        {
          type: "target-conditional",
          autoResolve: false,
          // TODO: RE implement conditional target, this is not correct
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "characteristics", value: ["princess"] },
              { filter: "type", value: "character" },
              { filter: "zone", value: "play" },
            ],
          },
          effects: [
            {
              type: "banish",
              target: {
                type: "card",
                value: 1,
                filters: [
                  { filter: "characteristics", value: ["princess"] },
                  { filter: "type", value: "character" },
                  { filter: "zone", value: "play" },
                ],
              },
            },
          ],
          fallback: [
            {
              type: "exert",
              exert: true,
              target: chosenCharacter,
            } as ExertEffect,
          ],
        } as TargetConditionalEffect,
      ],
    } as ActivatedAbility,
  ],
  flavour:
    "“One taste of the poisoned apple, and the victim's eyes will close forever. . . .” \n−The Queen",
  color: "ruby",
  cost: 3,
  illustrator: "Andrew Trabbold",
  number: 134,
  set: "TFC",
  rarity: "rare",
};
export const shieldOfVirtue: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "pn4",

  name: "Shield of Virtue",
  text: "**FIREPROOF** ↷, 3 ⬡ − Ready chosen character. They can't quest for the rest of this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Fireproof",
      text: "Ready chosen character. They can't quest for the rest of this turn.",
      costs: [{ type: "exert" }, { type: "ink", amount: 3 }],
      effects: readyAndCantQuest(chosenCharacter),
    } as ActivatedAbility,
  ],
  flavour:
    "“Arm thyself with this enchanted Shield of Virtue and this mighty Sword of Truth, for these weapons of righteousness will triumph over evil.” \n−Flora",
  inkwell: true,
  color: "ruby",
  cost: 1,
  illustrator: "Eri Welli",
  number: 135,
  set: "TFC",
  rarity: "uncommon",
};
export const swordOfTruth: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "jpg",

  name: "Sword of Truth",
  text: "**FINAL ENCHANTMENT** Banish this item − Banish chosen Villain character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Final Enchantment",
      text: "Banish this item − Banish chosen Villain character.",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "banish",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
              { filter: "characteristics", value: ["villain"] },
            ],
          },
        },
      ],
    } as ActivatedAbility,
  ],
  flavour: "Almost as powerful as True Love's Kiss.",
  color: "ruby",
  cost: 4,
  illustrator: "Andrew Trabbold",
  number: 136,
  set: "TFC",
  rarity: "rare",
};
export const coconutbasket: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "hoh",

  name: "Coconut Basket",
  text: "**CONSIDER THE COCONUT** Whenever you play a character,\ryou may remove up to 2 damage from chosen character.",
  type: "item",
  abilities: [
    wheneverTargetPlays({
      optional: true,
      name: "Consider the Coconut",
      text: "Whenever you play a character, you may remove up to 2 damage from chosen character.",
      triggerFilter: [
        { filter: "owner", value: "self" },
        { filter: "type", value: "character" },
        { filter: "zone", value: "play" },
      ],
      effects: [
        {
          type: "heal",
          amount: 2,
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
            ],
          },
        },
      ],
    }),
  ],
  flavour:
    "The coconut is a versatile gift from the gods, used to make nearly everything - including baskets to carry more coconuts.",
  inkwell: true,
  color: "sapphire",
  cost: 2,
  illustrator: "Milica Celikovic",
  number: 166,
  set: "TFC",
  rarity: "uncommon",
};
export const eyeOfTheFate: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "jgm",

  name: "Eye of the Fates",
  text: "**SEE THE FUTURE** ↷ − Chosen character gets +1 ◆ this turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "See the Future",
      text: "Chosen character gets +1 ◆ this turn.",
      costs: [{ type: "exert" }],
      effects: [chosenCharacterGetLoreThisTurn(1)],
    } as ActivatedAbility,
  ],
  flavour: "You can change the future once you know what you're looking at.",
  inkwell: true,
  color: "sapphire",
  cost: 4,
  illustrator: "Ron Baird",
  number: 167,
  set: "TFC",
  rarity: "uncommon",
};

export const fishboneQuill: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "k4a",

  name: "Fishbone Quill",
  text: "**GO AHEAD AND SIGN** ↷ − Put any card from your hand into your inkwell facedown.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Go Ahead And Sign",
      text: "Put any card from your hand into your inkwell facedown.",
      costs: [{ type: "exert" }],
      isPrivate: true,
      effects: [
        {
          type: "move",
          to: "inkwell",
          exerted: false,
          isPrivate: true,
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "owner", value: "self" },
              { filter: "zone", value: "hand" },
            ],
          },
        },
      ],
    } as ActivatedAbility,
  ],
  flavour:
    "“If you want to cross the bridge, my sweet, you've got to pay the toll.” \n−Ursula",
  inkwell: true,
  color: "sapphire",
  cost: 3,
  number: 168,
  set: "TFC",
  rarity: "rare",
  illustrator: "TBD",
};
export const magicGoldenFlower: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "foq",

  name: "Magic Golden Flower",
  text: "**HEALING POLLEN** Banish this item - Remove up to 3 damage from chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Healing Pollen",
      text: "Banish this item - Remove up to 3 damage from chosen character.",
      costs: [{ type: "banish" }],
      effects: [
        {
          type: "heal",
          amount: 3,
          target: {
            type: "card",
            value: 1,
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
  flavour:
    "“Once upon a time, a single drop of sunlight fell from the heavens. . . .” \n−Flynn Rider",
  inkwell: true,
  color: "sapphire",
  cost: 1,
  illustrator: "Cory Godbey",
  number: 169,
  set: "TFC",
  rarity: "common",
};
export const scepterOfArendelle: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "ao2",

  name: "Scepter Of Arendelle",
  text: "**COMMAND** ↷ − Chosen character gains **Support** this turn. _(Whenever they quest, you may add their ※ to another chosen character's ※ this turn.)_",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Command",
      text: "Chosen character gains **Support** this turn.",
      costs: [{ type: "exert" }],
      effects: [
        {
          type: "ability",
          ability: "support",
          modifier: "add",
          duration: "turn",
          target: {
            type: "card",
            value: 1,
            filters: [
              { filter: "zone", value: "play" },
              { filter: "type", value: "character" },
            ],
          },
        } as AbilityEffect,
      ],
    } as ActivatedAbility,
  ],
  inkwell: true,
  color: "sapphire",
  cost: 1,
  illustrator: "Grace Tran",
  number: 170,
  set: "TFC",
  rarity: "uncommon",
};
export const beastMirror: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "ysg",

  name: "Beast's Mirror",
  text: "**SHOW ME** ↷, 3 ⬡ - If you have no cards in your hand, draw a card.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Show Me",
      text: "If you have no cards in your hand, draw a card.",
      costs: [{ type: "exert" }, { type: "ink", amount: 3 }],
      effects: [
        {
          type: "draw",
          amount: 1,
          target: {
            type: "player",
            value: "self",
          } as EffectTargets,
        },
      ],
      conditions: [
        {
          type: "hand",
          amount: 0,
        },
      ],
    } as ActivatedAbility,
  ],
  flavour:
    "Ashamed of his monstrous form, the Beast concealed himself inside his castle, with a magic mirror as his only window to the outside world.",
  inkwell: true,
  color: "steel",
  cost: 2,
  illustrator: "Samanta Erdini",
  number: 201,
  set: "TFC",
  rarity: "common",
};
export const fryingPan: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "r9f",

  name: "Frying Pan",
  text: "**CLANG!** Banish this item - Chosen character can't challenge during their next turn.",
  type: "item",
  abilities: [
    {
      type: "activated",
      optional: false,
      costs: [{ type: "banish" }],
      effects: [chosenCharacterCantChallengeDuringNextTurn],
    },
  ],
  flavour:
    "It's a fine piece of cookware, but as a weapon it's truly stunning.",
  inkwell: true,
  color: "steel",
  cost: 2,
  illustrator: "Kamil Murzyn",
  number: 202,
  set: "TFC",
  rarity: "uncommon",
};
export const musketeerTabard: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "j3v",

  name: "Musketeer Tabard",
  text: "**ALL FOR ONE AND ONE FOR ALL** Whenever one of your characters with **Bodyguard** is banished, you may draw a card.",
  type: "item",
  abilities: [
    {
      type: "static-triggered",
      optional: false,
      trigger: {
        on: "banish",
        filters: [
          { filter: "owner", value: "self" },
          { filter: "type", value: "character" },
          { filter: "ability", value: "bodyguard" },
        ],
      } as BanishTrigger,
      layer: {
        type: "resolution",
        optional: true,
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
      },
    } as TriggeredAbility,
  ],
  flavour: "There's no such thing as a lone musketeer.",
  color: "steel",
  cost: 4,
  illustrator: "Dav Augereau / Guykua Ruva",
  number: 203,
  set: "TFC",
  rarity: "rare",
};
export const plasmaBlaster: LorcanitoItemCard = {
  characteristics: ["item"],
  id: "t4y",

  name: "Plasma Blaster",
  text: "**QUICK SHOT** ↷, 2 ⬡ − Deal 1 damage to chosen character.",
  type: "item",
  abilities: [
    {
      type: "activated",
      name: "Quick Shot",
      text: "Deal 1 damage to chosen character.",
      optional: false,
      effects: [
        {
          type: "damage",
          amount: 1,
          target: chosenCharacter,
        },
      ],
      costs: [{ type: "exert" }, { type: "ink", amount: 2 }],
    } as ActivatedAbility,
  ],
  flavour:
    "“You don't have to say 'pew pew' when you use it, but it doesn't hurt.” \n−Lilo, galactic hero",
  color: "steel",
  cost: 3,
  number: 204,
  set: "TFC",
  rarity: "rare",
  illustrator: "TBD",
};
