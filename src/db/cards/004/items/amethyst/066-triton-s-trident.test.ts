/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { tritonsTrident } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Triton's Trident", () => {
  it.skip("**SYMBOL OF POWER** Banish this item — Chosen character gets +1 ※ this turn for each card in your hand.", () => {
    const testStore = new TestStore({
      inkwell: tritonsTrident.cost,
      play: [tritonsTrident],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", tritonsTrident.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
