/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { duckForCover } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Duck for Cover!", () => {
  it.skip("Chosen character gains **Resist** +1 and **Evasive** this turn. _(Damage dealt to them is reduced by 1. They can challenge characters with Evasive.)_", () => {
    const testStore = new TestStore({
      inkwell: duckForCover.cost,
      hand: [duckForCover],
    });

    const cardUnderTest = testStore.getCard(duckForCover);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
