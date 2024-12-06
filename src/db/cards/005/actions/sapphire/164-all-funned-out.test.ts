/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { allFunnedOut } from "@lorcanito/lorcana-engine/cards/005/actions/actions";

describe("All Funned Out", () => {
  it.skip("Put chosen character of yours into your inkwell facedown and exerted.", () => {
    const testStore = new TestStore({
      inkwell: allFunnedOut.cost,
      hand: [allFunnedOut],
    });

    const cardUnderTest = testStore.getCard(allFunnedOut);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
