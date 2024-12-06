/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { imperialBow } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Imperial Bow", () => {
  it.skip("**WITHIN RANGE** ↷, 1 ⬡ − Chosen Hero character gains **Challenger** +2 and **Evasive** this turn. _(They get +2 ※ while challenging. They can challenge characters with Evasive.)_", () => {
    const testStore = new TestStore({
      inkwell: imperialBow.cost,
      play: [imperialBow],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", imperialBow.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
