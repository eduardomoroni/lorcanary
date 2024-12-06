/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { miracleCandle } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Miracle Candle", () => {
  it.skip("**ABUELA'S GIFT** Banish this item − If you have 3 or more characters in play, gain 2 lore and remove up to 2 damage from chosen location.", () => {
    const testStore = new TestStore({
      inkwell: miracleCandle.cost,
      play: [miracleCandle],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", miracleCandle.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
