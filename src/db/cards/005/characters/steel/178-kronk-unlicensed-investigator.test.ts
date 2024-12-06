/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { kronkUnlicensedInvestigator } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Kronk - Unlicensed Investigator", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: kronkUnlicensedInvestigator.cost,
      play: [kronkUnlicensedInvestigator],
    });

    const cardUnderTest = testStore.getCard(kronkUnlicensedInvestigator);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
