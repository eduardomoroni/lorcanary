/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { theBayouMysteriousSwamp } from "@lorcanito/lorcana-engine/cards/003/locations/locations";

describe("The Bayou - Mysterious Swamp", () => {
  it.skip("**SHOW ME THE WAY** Whenever a character quests while here, you may draw a card, then choose and discard a card.", () => {
    const testStore = new TestStore({
      inkwell: theBayouMysteriousSwamp.cost,
      play: [theBayouMysteriousSwamp],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      theBayouMysteriousSwamp.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
