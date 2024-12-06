/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { ratiganRagingRat } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Ratigan - Raging Rat", () => {
  describe("**NOTHING CAN STAND IN MY WAY** While this character has damage, he gets +2 ※.", () => {
    it("should get +2 ※ while having damage", () => {
      const testStore = new TestStore({
        play: [ratiganRagingRat],
      });

      const cardUnderTest = testStore.getCard(ratiganRagingRat);

      expect(cardUnderTest.strength).toBe(ratiganRagingRat.strength);

      cardUnderTest.updateCardDamage(1, "add");

      expect(cardUnderTest.strength).toBe(ratiganRagingRat.strength + 2);

      cardUnderTest.updateCardDamage(1, "remove");

      expect(cardUnderTest.strength).toBe(ratiganRagingRat.strength);
    });
  });
});
