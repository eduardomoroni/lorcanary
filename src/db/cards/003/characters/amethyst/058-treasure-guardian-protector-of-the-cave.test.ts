/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { treasureGuardianProtectorOfTheCave } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Treasure Guardian - Protector of the Cave", () => {
  it.skip("**WHO DISTURBS MY SLUMBER?** This character can't challenge or quest unless it is at a location.", () => {
    const testStore = new TestStore({
      inkwell: treasureGuardianProtectorOfTheCave.cost,
      play: [treasureGuardianProtectorOfTheCave],
    });

    const cardUnderTest = testStore.getCard(treasureGuardianProtectorOfTheCave);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
