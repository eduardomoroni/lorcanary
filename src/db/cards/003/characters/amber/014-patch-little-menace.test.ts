/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { patchLittleMenace } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Patch - Little Menace", () => {
  it.skip("**BARK** ↷ – Chosen character gets -2 ※ until the start of your next turn.", () => {
    const testStore = new TestStore({
      inkwell: patchLittleMenace.cost,
      play: [patchLittleMenace],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      patchLittleMenace.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
