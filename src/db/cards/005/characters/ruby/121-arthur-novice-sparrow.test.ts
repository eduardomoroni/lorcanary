/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { arthurNoviceSparrow } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Arthur - Novice Sparrow", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: arthurNoviceSparrow.cost,
      play: [arthurNoviceSparrow],
    });

    const cardUnderTest = testStore.getCard(arthurNoviceSparrow);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
