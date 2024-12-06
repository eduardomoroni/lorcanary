/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { ulfMime } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Ulf - Mime", () => {
  it.skip("**SILENT PERFORMANCE** This character can't ↷ to sing songs.", () => {
    const testStore = new TestStore({
      inkwell: ulfMime.cost,
      play: [ulfMime],
    });

    const cardUnderTest = testStore.getCard(ulfMime);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
