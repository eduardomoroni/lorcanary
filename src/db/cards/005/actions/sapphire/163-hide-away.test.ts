/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hideAway } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("Hide Away", () => {
  it.skip("Put chosen item or location into its player’s inkwell facedown and exerted.", () => {
    const testStore = new TestStore({
      inkwell: hideAway.cost,
      hand: [hideAway],
    });

    const cardUnderTest = testStore.getCard(hideAway);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
