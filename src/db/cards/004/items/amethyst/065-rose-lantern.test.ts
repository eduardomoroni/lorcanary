/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { roseLantern } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Rose Lantern", () => {
  it.skip("MYSTERICAL PETALS  ↷, 2 ⬡ − Move 1 damage counter from chosen character to chosen opposing character.", () => {
    const testStore = new TestStore({
      inkwell: roseLantern.cost,
      play: [roseLantern],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", roseLantern.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
