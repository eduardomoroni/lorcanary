/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { amberChromiconItem } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Amber Chromicon - Item", () => {
  it.skip("**AMBER LIGHT** ↷ – Remove up to 1 damage from each of your characters.", () => {
    const testStore = new TestStore({
      inkwell: amberChromiconItem.cost,
      play: [amberChromiconItem],
    });

    const cardUnderTest = testStore.getCard(amberChromiconItem);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
