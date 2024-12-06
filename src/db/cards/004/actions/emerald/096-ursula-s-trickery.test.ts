/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { ursulasTrickery } from "@lorcanito/lorcana-engine/cards/004/actions/actions";

describe("Ursula's Trickery", () => {
  it.skip("Each opponent may choose and discard a card. For each opponent who doesn't, you draw a card.", () => {
    const testStore = new TestStore({
      inkwell: ursulasTrickery.cost,
      hand: [ursulasTrickery],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", ursulasTrickery.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
