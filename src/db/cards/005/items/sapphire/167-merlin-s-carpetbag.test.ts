/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { merlinsCarpetbag } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Merlin's Carpetbag", () => {
  it.skip("**Hockety Pockety**↷, 1 ⬡ – Return an item card from your discard to your hand.", () => {
    const testStore = new TestStore({
      inkwell: merlinsCarpetbag.cost,
      play: [merlinsCarpetbag],
    });

    const cardUnderTest = testStore.getCard(merlinsCarpetbag);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
