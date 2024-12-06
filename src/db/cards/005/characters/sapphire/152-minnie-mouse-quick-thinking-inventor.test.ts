/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { minnieMouseQuickthinkingInventor } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Minnie Mouse - Quick-Thinking Inventor", () => {
  it.skip("**CAKE CATAPULT** When you play this character, chosen character gets -2 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: minnieMouseQuickthinkingInventor.cost,
      hand: [minnieMouseQuickthinkingInventor],
    });

    const cardUnderTest = testStore.getCard(minnieMouseQuickthinkingInventor);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
