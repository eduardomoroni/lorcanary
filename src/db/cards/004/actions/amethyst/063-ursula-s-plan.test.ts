/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { ursulasPlan } from "@lorcanito/lorcana-engine/cards/004/actions/actions";

describe("Ursula's Plan", () => {
  it.skip("Each opponent chooses and exerts one of their characters. Those characters can't ready at the start of their next turn.", () => {
    const testStore = new TestStore({
      inkwell: ursulasPlan.cost,
      hand: [ursulasPlan],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", ursulasPlan.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
