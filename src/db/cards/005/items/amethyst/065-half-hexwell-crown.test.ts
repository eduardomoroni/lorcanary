/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { halfHexwellCrown } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Half Hexwell Crown", () => {
  it.skip("**AN UNEXPECTED FIND**, ↷, 2 ⬡ — Draw a card.", () => {
    const testStore = new TestStore({
      inkwell: halfHexwellCrown.cost,
      play: [halfHexwellCrown],
    });

    const cardUnderTest = testStore.getCard(halfHexwellCrown);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("**A PERILOUS POWER** ↷, 2 ⬡, Discard a card – Exert chosen character.", () => {
    const testStore = new TestStore({
      inkwell: halfHexwellCrown.cost,
      play: [halfHexwellCrown],
    });

    const cardUnderTest = testStore.getCard(halfHexwellCrown);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
