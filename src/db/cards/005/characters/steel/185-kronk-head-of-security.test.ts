/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { kronkHeadOfSecurity } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Kronk - Head of Security", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: kronkHeadOfSecurity.cost,
      play: [kronkHeadOfSecurity],
    });

    const cardUnderTest = testStore.getCard(kronkHeadOfSecurity);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
