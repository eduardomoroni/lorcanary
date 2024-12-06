/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  quickPatch,
  strikeAGoodMatch,
} from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Strike a Good Match", () => {
  it("Draw 2 cards, then choose and discard a card.", () => {
    const testStore = new TestStore({
      inkwell: strikeAGoodMatch.cost,
      hand: [strikeAGoodMatch],
      deck: [quickPatch, quickPatch],
      discard: [],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", strikeAGoodMatch.id);

    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({});

    expect(testStore.getZonesCardCount().discard).toBe(2);
    expect(testStore.getZonesCardCount().hand).toBe(1);
    expect(testStore.getZonesCardCount().deck).toBe(0);
  });
});
