/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { obscurosphere } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Obscurosphere", () => {
  it.skip("**EXTRACT OF EMERALD** 2 ⬡, Banish this item – Your characters gain **Ward** until the start of your next turn. _(Opponents can't choose them except to challenge.)_", () => {
    const testStore = new TestStore({
      inkwell: obscurosphere.cost,
      play: [obscurosphere],
    });

    const cardUnderTest = testStore.getCard(obscurosphere);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
