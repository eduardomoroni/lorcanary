/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rayaGuardianOfTheDragonGem } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Raya - Guardian of the Dragon Gem", () => {
  it.skip("**WE MUST JOIN FORCES** When you play this character, ready chosen character of yours at a location. They can’t quest for the rest of this turn.", () => {
    const testStore = new TestStore({
      inkwell: rayaGuardianOfTheDragonGem.cost,
      hand: [rayaGuardianOfTheDragonGem],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      rayaGuardianOfTheDragonGem.id,
    );
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
