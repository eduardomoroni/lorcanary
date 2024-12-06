/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { theSwordReleased } from "@lorcanito/lorcana-engine/cards/005/items/items";

describe("The Sword Released", () => {
  it.skip("**POWER APPOINTED** At the start of your turn, if you have a character in play with more ※ than each opposing character in play, each opponent loses 1 lore and you gain lore equal to the lore lost.", () => {
    const testStore = new TestStore({
      inkwell: theSwordReleased.cost,
      play: [theSwordReleased],
    });

    const cardUnderTest = testStore.getCard(theSwordReleased);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
