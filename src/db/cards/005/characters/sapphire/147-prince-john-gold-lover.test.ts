/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { princeJohnGoldLover } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Prince John - Gold Lover", () => {
  it.skip("**BEAUTIFUL, LOVELY TAXES** ↷ – Play an item from your hand or discard with cost 5 or less for free, exerted.", () => {
    const testStore = new TestStore({
      inkwell: princeJohnGoldLover.cost,
      play: [princeJohnGoldLover],
    });

    const cardUnderTest = testStore.getCard(princeJohnGoldLover);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
