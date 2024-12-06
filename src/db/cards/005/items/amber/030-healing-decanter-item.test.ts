/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { healingDecanterItem } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Healing Decanter - Item", () => {
  it.skip("**RENEWING ESSENCE** ↷ – Remove up to 2 damage from chosen character.", () => {
    const testStore = new TestStore({
      inkwell: healingDecanterItem.cost,
      play: [healingDecanterItem],
    });

    const cardUnderTest = testStore.getCard(healingDecanterItem);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
