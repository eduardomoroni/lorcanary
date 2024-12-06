/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mickeyMouseEnthusiasticDancer } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Mickey Mouse - Enthusiastic Dancer", () => {
  it.skip("**PERFECT PARTNERS** While you have a character named Minnie Mouse in play, this character gets +2 ※.", () => {
    const testStore = new TestStore({
      inkwell: mickeyMouseEnthusiasticDancer.cost,
      play: [mickeyMouseEnthusiasticDancer],
    });

    const cardUnderTest = testStore.getCard(mickeyMouseEnthusiasticDancer);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
