/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { tryEverything } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Try Everything", () => {
  it.skip("_(A character with cost 4 or more can ↷ to sing this song for free.)_", () => {
    const testStore = new TestStore({
      inkwell: tryEverything.cost,
      hand: [tryEverything],
    });

    const cardUnderTest = testStore.getCard(tryEverything);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });

  it.skip("Remove up to 3 damage from chosen character and ready them. They can’t quest or challenge for the rest of this turn.", () => {
    const testStore = new TestStore({
      inkwell: tryEverything.cost,
      hand: [tryEverything],
    });

    const cardUnderTest = testStore.getCard(tryEverything);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
