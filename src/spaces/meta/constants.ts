export type COLORS =
  | "amber"
  | "amethyst"
  | "emerald"
  | "ruby"
  | "sapphire"
  | "steel";

export const COLOR_COMBINATIONS = [
  "amber/amethyst",
  "amber/emerald",
  "amber/ruby",
  "amber/sapphire",
  "amber/steel",
  "amethyst/emerald",
  "amethyst/ruby",
  "amethyst/sapphire",
  "amethyst/steel",
  "emerald/ruby",
  "emerald/sapphire",
  "emerald/steel",
  "ruby/sapphire",
  "ruby/steel",
  "sapphire/steel",
];

export const COLOR_COMBINATIONS_TUPLE: Array<[COLORS, COLORS]> = [
  ["amber", "amethyst"],
  ["amber", "emerald"],
  ["amber", "ruby"],
  ["amber", "sapphire"],
  ["amber", "steel"],
  ["amethyst", "emerald"],
  ["amethyst", "ruby"],
  ["amethyst", "sapphire"],
  ["amethyst", "steel"],
  ["ruby", "emerald"],
  ["sapphire", "emerald"],
  ["steel", "emerald"],
  ["ruby", "sapphire"],
  ["ruby", "steel"],
  ["sapphire", "steel"],
];
