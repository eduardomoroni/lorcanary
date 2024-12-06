/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mickeyMouseTrumpeter } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Mickey Mouse - Trumpeter", () => {
  it.skip("**BUGLE CALL** ↷, 2 ⬡ - Play a character for free.", () => {
    const testStore = new TestStore({
      inkwell: mickeyMouseTrumpeter.cost,
      play: [mickeyMouseTrumpeter],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      mickeyMouseTrumpeter.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
