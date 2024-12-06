/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { tritonDiscerningKing } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Triton - Discerning King", () => {
  it.skip("**CONSIGN TO THE DEPTHS** ↷, Banish one of your items − Gain 3 lore.", () => {
    const testStore = new TestStore({
      inkwell: tritonDiscerningKing.cost,
      play: [tritonDiscerningKing],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      tritonDiscerningKing.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
