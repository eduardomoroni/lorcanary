/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hadesWrathfulRuler } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Hades - Wrathful Ruler", () => {
  it.skip("**CALLING THE TITANS** ↷ – Ready your Titan characters.", () => {
    const testStore = new TestStore({
      inkwell: hadesWrathfulRuler.cost,
      play: [hadesWrathfulRuler],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      hadesWrathfulRuler.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
