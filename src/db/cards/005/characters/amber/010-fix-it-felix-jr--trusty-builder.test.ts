/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fixitFelixJrTrustyBuilder } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Fix‐It Felix, Jr. - Trusty Builder", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: fixitFelixJrTrustyBuilder.cost,
      play: [fixitFelixJrTrustyBuilder],
    });

    const cardUnderTest = testStore.getCard(fixitFelixJrTrustyBuilder);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
