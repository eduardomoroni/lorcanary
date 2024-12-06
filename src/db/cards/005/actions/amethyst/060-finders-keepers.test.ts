/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { findersKeepers } from "@lorcanito/lorcana-engine/cards/005/actions/actions";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";
import { goonsMaleficent } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Finders Keepers", () => {
  it("Draw 3 cards.", () => {
    const testEngine = new TestEngine({
      inkwell: findersKeepers.cost,
      hand: [findersKeepers],
      deck: [goonsMaleficent, goonsMaleficent, goonsMaleficent],
    });

    const cardUnderTest = testEngine.getCardModel(findersKeepers);
    cardUnderTest.playFromHand();
    expect(testEngine.getZonesCardCount().hand).toBe(3);
  });
});
