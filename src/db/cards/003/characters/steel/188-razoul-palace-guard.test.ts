/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { razoulPalaceGuard } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Razoul - Palace Guard", () => {
  it.skip("**LOOKY HERE** While this character has no damage, he gets +2 ※.", () => {
    const testStore = new TestStore({
      inkwell: razoulPalaceGuard.cost,
      play: [razoulPalaceGuard],
    });

    const cardUnderTest = testStore.getCard(razoulPalaceGuard);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
