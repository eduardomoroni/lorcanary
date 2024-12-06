/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";

import { basilsMagnifyingGlass } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("Basil's Magnifying Glass", () => {
  it.skip("**FIND WHAT’S HIDDEN** ↷, 2 ⬡ - Look at the top 3 cards of your deck. You may reveal an item card and put it into your hand. Put the rest on the bottom of your deck in any order.", () => {
    const testStore = new TestStore({
      inkwell: basilsMagnifyingGlass.cost,
      play: [basilsMagnifyingGlass],
    });

    const cardUnderTest = testStore.getCard(basilsMagnifyingGlass);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
