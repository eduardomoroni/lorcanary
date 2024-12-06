/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { heartOfAtlantis } from "@lorcanito/lorcana-engine/cards/003/items/items";

describe("Heart of Atlantis", () => {
  it.skip("**LIFE GIVER** ↷ – You pay 2 ⬡ less for the next character you play this turn.", () => {
    const testStore = new TestStore({
      inkwell: heartOfAtlantis.cost,
      play: [heartOfAtlantis],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", heartOfAtlantis.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
