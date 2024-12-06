/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { itCallsMe } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("It Calls Me", () => {
  it.skip("(A character with cost 1 or more can ↷ to sing this song for free.)Draw a card. Shuffle up to 3 cards from your opponent’s discard into your opponent’s deck.", () => {
    const testStore = new TestStore({
      inkwell: itCallsMe.cost,
      hand: [itCallsMe],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", itCallsMe.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
