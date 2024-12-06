/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { distract } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("Distract", () => {
  it.skip("Chosen character gets -2 ※ this turn. Draw a card.", () => {
    const testStore = new TestStore({
      inkwell: distract.cost,
      hand: [distract],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", distract.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
