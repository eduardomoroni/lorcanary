/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { poorUnfortunateSouls } from "@lorcanito/lorcana-engine/cards/004/actions/actions";

describe("Poor Unfortunate Souls", () => {
  it.skip("_(A character with cost 2 or more can ↷ to sing this song for free.)_Return a character, item or location with cost 2 or less to their player’s hand.", () => {
    const testStore = new TestStore({
      inkwell: poorUnfortunateSouls.cost,
      hand: [poorUnfortunateSouls],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      poorUnfortunateSouls.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
