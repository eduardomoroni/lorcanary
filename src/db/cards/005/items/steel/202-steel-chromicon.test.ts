/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { steelChromicon } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Steel Chromicon", () => {
  it.skip("**STEEL LIGHT** ↷ – Deal 1 damage to chosen character.", () => {
    const testStore = new TestStore({
      inkwell: steelChromicon.cost,
      play: [steelChromicon],
    });

    const cardUnderTest = testStore.getCard(steelChromicon);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
