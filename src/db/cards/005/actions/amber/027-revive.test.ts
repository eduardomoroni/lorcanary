/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { revive } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Revive", () => {
  it.skip("Play a character card with cost 5 or less from your discard for free.", () => {
    const testStore = new TestStore({
      inkwell: revive.cost,
      hand: [revive],
    });

    const cardUnderTest = testStore.getCard(revive);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
