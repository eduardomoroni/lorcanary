/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { kingOfHeartsMonarchOfWonderland } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("King of Hearts - Monarch of Wonderland", () => {
  it.skip("**PLEASING THE QUEEN** ↷ – Chosen exerted character can’t ready at the start of their next turn.", () => {
    const testStore = new TestStore({
      inkwell: kingOfHeartsMonarchOfWonderland.cost,
      play: [kingOfHeartsMonarchOfWonderland],
    });

    const cardUnderTest = testStore.getCard(kingOfHeartsMonarchOfWonderland);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
