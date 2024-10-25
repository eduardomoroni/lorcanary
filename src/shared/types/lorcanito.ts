// An ability is a property of an object that influences the game by generating
// effects or by creating a layer on the stack that resolves and generates effects
export interface Ability {
  // Following https://storage.googleapis.com/fabmaster/media/documents/FaB_Comprehensive_Rules_v2.1.0_access.pdf
  // as lorcana doesn't have a rules document
  type?:
    | "static"
    | "while-static"
    | "static-triggered"
    | "property-static"
    | "play-static"
    | "resolution"
    | "activated"
    | "delayed-triggered";
  // Static abilities don't have target
  responder?: "self" | "opponent";
  // When undefined, we take name/text from card
  text?: string;
  name?: string;
  // This flag is used to indicate that this ability needs an input from the user.
  nameACard?: boolean;
  optional?: boolean;
  // Whether the player has decided to trigger the optional ability
  accepted?: boolean;
  // This is being used to solved sequencial effects like: Draw and then discard a card
  // it's also used when an ability has many effect and targets different cards
  resolveEffectsIndividually?: boolean;
  // Flag to help the UI to better sort result of auto resolve effects.
  detrimental?: boolean;
  // This is being used to solved dependendant effects like: banish a character and then draw a card
  dependentEffects?: boolean;
  isPrivate?: boolean;
}

export type TargetFilter =
  | {
      filter: "location";
      value: "source";
    }
  | { filter: "was-challenged" }
  | { filter: "can"; value: "challenge" | "sing" | "sing_song" | "shift" }
  | {
      filter: "challenge";
      value: "attacker" | "defender";
    }
  | {
      filter: "sing";
      value: "singer" | "song";
    }
  | { filter: "source"; value: "self" | "trigger" | "target" | "other" }
  | {
      // This is a dynamic filter, that is created and evaluated in runtime
      filter: "instanceId";
      value: string;
    }
  | {
      filter: "top-deck";
      value: "self" | "opponent";
    }
  | {
      filter: "owner";
      value: "self" | "opponent" | string;
    }
  | {
      filter: "name-a-card";
    }
  | {
      filter: "status";
      value: "ready" | "exerted" | "dry" | "damaged" | "at-location";
    }
  | {
      filter: "characteristics";
      value: Characteristics[];
      conjunction?: "and" | "or";
      negate?: boolean;
    }
  | {
      filter: "type";
      value: LorcanitoCard["type"] | Array<LorcanitoCard["type"]>;
    };

interface LorcanitoBaseCard {
  type: "character" | "item" | "action" | "location";
  implemented?: boolean;
  missingTestCase?: boolean;
  id: string;
  name: string;
  url: string;
  alternativeUrl?: string;
  text?: string;
  flavour?: string;
  language: string;
  set: "TFC" | "ROF" | "ITI" | "URR" | "SSK" | "006";
  cost: number;
  color: CardColor;
  number: number;
  illustrator: string;
  // TODO: I think we can remove this
  keywords?: Record<string, unknown>;
  inkwell?: boolean;
  characteristics: Array<Characteristics>;
  // TODO: Remove this, I added it because non implemented cards have empty abilities
  abilities?: Ability[] | { name?: string }[];
  rarity: CardRarity;
  // Adding this for simplicity
  strength?: number;
  lore?: number;
  willpower?: number;
  title?: string;
  moveCost?: number;
  movementDiscounts?: {
    filters: TargetFilter[];
    amount: number;
  }[];
}

export interface LorcanitoLocationCard extends LorcanitoBaseCard {
  type: "location";
  title: string;
  lore?: number;
  moveCost: number;
  willpower: number;
  strength?: never;
}

export interface LorcanitoCharacterCard extends LorcanitoBaseCard {
  type: "character";
  title: string;
  lore: number;
  strength: number;
  cost: number;
  willpower: number;
  additionalNames?: string[];
}

export interface LorcanitoActionCard extends LorcanitoBaseCard {
  type: "action";
  title?: never;
  text: string;
}

export interface LorcanitoItemCard extends LorcanitoBaseCard {
  type: "item";
  title?: never;
  text: string;
  abilities: Ability[];
}

export type CardColor =
  | "amber"
  | "amethyst"
  | "emerald"
  | "ruby"
  | "sapphire"
  | "steel";

type CardRarity = "common" | "uncommon" | "rare" | "super_rare" | "legendary";

export type LorcanitoCard =
  | LorcanitoLocationCard
  | LorcanitoCharacterCard
  | LorcanitoActionCard
  | LorcanitoItemCard;

export type Characteristics =
  | "location"
  | "song"
  | "madrigal"
  | "racer"
  | "robot"
  | "action"
  | "hyena"
  | "item"
  | "villain"
  | "knight"
  | "dragon"
  | "tigger"
  | "seven dwarfs"
  | "pirate"
  | "detective"
  | "sorcerer"
  | "queen"
  | "puppy"
  | "titan"
  | "alien"
  | "king"
  | "mentor"
  | "inventor"
  | "fairy"
  | "captain"
  | "hero"
  | "prince"
  | "storyborn"
  | "floodborn"
  | "dreamborn"
  | "broom"
  | "ally"
  | "princess"
  | "musketeer"
  | "deity";
