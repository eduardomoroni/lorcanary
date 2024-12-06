/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { iceBlock } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Ice Block", () => {
  it.skip("**CHILLY LABOR** ↷ − Chosen character gets -1 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: iceBlock.cost,
      play: [iceBlock],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", iceBlock.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
