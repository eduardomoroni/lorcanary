/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { robinHoodSneakySleuth } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Robin Hood - Sneaky Sleuth", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: robinHoodSneakySleuth.cost,
      play: [robinHoodSneakySleuth],
    });

    const cardUnderTest = testStore.getCard(robinHoodSneakySleuth);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("**CLEVER PLAN** This character gets +1 ◆ for each opposing damaged character in play._ **", () => {
    const testStore = new TestStore({
      inkwell: robinHoodSneakySleuth.cost,
      play: [robinHoodSneakySleuth],
    });

    const cardUnderTest = testStore.getCard(robinHoodSneakySleuth);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
