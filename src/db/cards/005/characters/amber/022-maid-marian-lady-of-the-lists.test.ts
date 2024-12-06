/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { maidMarianLadyOfTheLists } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Maid Marian - Lady of the Lists", () => {
  it.skip("IF THE LADY WANTS IT", () => {
    const testStore = new TestStore({
      inkwell: maidMarianLadyOfTheLists.cost,
      play: [maidMarianLadyOfTheLists],
    });

    const cardUnderTest = testStore.getCard(maidMarianLadyOfTheLists);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
