/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { minnieMouseCompassionateFriend } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Minnie Mouse - Compassionate Friend", () => {
  it.skip("**PATCH THEM UP** Whenever this character quests, you may remove up to 2 damage from chosen character.", () => {
    const testStore = new TestStore({
      inkwell: minnieMouseCompassionateFriend.cost,
      play: [minnieMouseCompassionateFriend],
    });

    const cardUnderTest = testStore.getCard(minnieMouseCompassionateFriend);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
