/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { transformedChefCastleStove } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Transformed Chef - Castle Stove", () => {
  it.skip("**SMOOTH SMALL DISHES** When you play this character, remove up to 2 damage from chosen character.", () => {
    const testStore = new TestStore({
      inkwell: transformedChefCastleStove.cost,
      hand: [transformedChefCastleStove],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      transformedChefCastleStove.id,
    );
    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
