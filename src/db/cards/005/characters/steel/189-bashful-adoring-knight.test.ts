/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { bashfulAdoringKnight } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Bashful - Adoring Knight", () => {
  it.skip("**IMPRESS THE PRINCESS** While you have a character named Snow White in play, this character gains **Bodyguard**. _(An opposing character who challenges one of your character must chose one with Bodyguard if able.)_", () => {
    const testStore = new TestStore({
      inkwell: bashfulAdoringKnight.cost,
      play: [bashfulAdoringKnight],
    });

    const cardUnderTest = testStore.getCard(bashfulAdoringKnight);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
