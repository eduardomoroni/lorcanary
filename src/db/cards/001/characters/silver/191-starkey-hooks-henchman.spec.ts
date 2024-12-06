/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  captainColonelsLieutenant,
  johnSilverAlienPirate,
  starkeyHooksHenchman,
} from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Starkey - Hook's Henchman", () => {
  describe("**AYE AYE, CAPTAIN** While you have a Captain character in play, this character gets +1 ◆.", () => {
    test("No Captain in play", () => {
      const testStore = new TestStore({
        play: [starkeyHooksHenchman],
      });
      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        starkeyHooksHenchman.id,
      );

      expect(cardUnderTest.lore).toEqual(starkeyHooksHenchman.lore);
    });

    test("With Captain in play", () => {
      const testStore = new TestStore({
        play: [starkeyHooksHenchman, johnSilverAlienPirate],
      });
      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        starkeyHooksHenchman.id,
      );

      expect(cardUnderTest.lore).toEqual(starkeyHooksHenchman.lore + 1);
    });

    test("With Captain in play", () => {
      const testStore = new TestStore({
        play: [starkeyHooksHenchman, captainColonelsLieutenant],
      });
      const cardUnderTest = testStore.getByZoneAndId(
        "play",
        starkeyHooksHenchman.id,
      );

      expect(cardUnderTest.lore).toEqual(starkeyHooksHenchman.lore + 1);
    });
  });
});
