/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { daisyDuckMusketeerSpy } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Daisy Duck - Musketeer Spy", () => {
  it.skip("**INFILTRATION** When you play this character, each opponent chooses and discards a card.", () => {
    const testStore = new TestStore({
      inkwell: daisyDuckMusketeerSpy.cost,
      hand: [daisyDuckMusketeerSpy],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      daisyDuckMusketeerSpy.id,
    );
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
