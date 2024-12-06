/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { sumerianTalisman } from "@lorcanito/lorcana-engine/cards/003/items/items";

describe("Sumerian Talisman", () => {
  it.skip("**SOURCE OF MAGIC** During your turn, whenever one of your characters is banished in a challenge, you may draw a card.", () => {
    const testStore = new TestStore({
      inkwell: sumerianTalisman.cost,
      play: [sumerianTalisman],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", sumerianTalisman.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
