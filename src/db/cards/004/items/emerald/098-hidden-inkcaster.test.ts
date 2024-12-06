/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hiddenInkcaster } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Hidden Inkcaster", () => {
  it.skip("**FRESH INK** When you play this item, draw a card.**UNEXPECTED TREASURE** All cards in your hand count as having ⏣.", () => {
    const testStore = new TestStore({
      inkwell: hiddenInkcaster.cost,
      play: [hiddenInkcaster],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", hiddenInkcaster.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
