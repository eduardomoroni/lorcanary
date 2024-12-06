/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { heartOfTeFiti } from "@lorcanito/lorcana-engine/cards/003/items/items";

describe("Heart of Te Fiti", () => {
  it.skip("**CREATE LIFE** ↷, 2 ⬡ – Put the top card of your deck into your inkwell facedown and exerted.", () => {
    const testStore = new TestStore({
      inkwell: heartOfTeFiti.cost,
      play: [heartOfTeFiti],
    });

    const cardUnderTest = testStore.getCard(heartOfTeFiti);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
