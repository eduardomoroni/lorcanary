/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { theBareNecessities } from "@lorcanito/lorcana-engine/cards/003/actions/actions";

describe("The Bare Necessities", () => {
  it.skip("_(A character with cost 2 or more can Exert.png to sing this song for free.)_Chosen opponent reveals their hand and discards a non-character card of your choice.", () => {
    const testStore = new TestStore({
      inkwell: theBareNecessities.cost,
      hand: [theBareNecessities],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "hand",
      theBareNecessities.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
