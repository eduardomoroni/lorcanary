/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { jasmineDesertWarrior } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Jasmine - Desert Warrior", () => {
  it.skip("**SMART MANEUVER** When you play this character and each time she is challenged, each opponent chooses and discards a card.", () => {
    const testStore = new TestStore({
      inkwell: jasmineDesertWarrior.cost,
      hand: [jasmineDesertWarrior],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      jasmineDesertWarrior.id,
    );
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
