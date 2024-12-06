/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { dontLetTheFrostbiteBite } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Don't Let the Frostbite Bite", () => {
  it.skip("_(A character with cost 7 or more can  ↷ to sing this song for free.)_", () => {
    const testStore = new TestStore({
      inkwell: dontLetTheFrostbiteBite.cost,
      hand: [dontLetTheFrostbiteBite],
    });

    const cardUnderTest = testStore.getCard(dontLetTheFrostbiteBite);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("Ready all your characters. They can’t quest for the rest of this turn.", () => {
    const testStore = new TestStore({
      inkwell: dontLetTheFrostbiteBite.cost,
      hand: [dontLetTheFrostbiteBite],
    });

    const cardUnderTest = testStore.getCard(dontLetTheFrostbiteBite);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
