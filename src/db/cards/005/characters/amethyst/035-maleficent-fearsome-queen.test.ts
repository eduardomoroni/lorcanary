/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { maleficentFearsomeQueen } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Maleficent - Fearsome Queen", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: maleficentFearsomeQueen.cost,
      play: [maleficentFearsomeQueen],
    });

    const cardUnderTest = testStore.getCard(maleficentFearsomeQueen);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("**EVERYONE LISTEN** When you play this character, for each character named Maleficent you have in play, return chosen opposing character, item, or location of cost 3 or less to their player's hand.", () => {
    const testStore = new TestStore({
      inkwell: maleficentFearsomeQueen.cost,
      hand: [maleficentFearsomeQueen],
    });

    const cardUnderTest = testStore.getCard(maleficentFearsomeQueen);
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
