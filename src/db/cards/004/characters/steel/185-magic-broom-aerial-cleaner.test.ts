/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { magicBroomAerialCleaner } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Magic Broom - Aerial Cleaner", () => {
  it.skip("**WINGED FOR A DAY** During your turn, this character gains **Evasive.** _(They can challenge characters with Evasive.)_", () => {
    const testStore = new TestStore({
      inkwell: magicBroomAerialCleaner.cost,
      play: [magicBroomAerialCleaner],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      magicBroomAerialCleaner.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
