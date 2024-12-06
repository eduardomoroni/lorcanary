/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { peteBornToCheat } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Pete - Born to Cheat", () => {
  it.skip("**I CLOBBER YOU!** Whenever this character quests while he has 5 ※ or more, return chosen character with 2 ※ or less to their player's hand.", () => {
    const testStore = new TestStore({
      inkwell: peteBornToCheat.cost,
      play: [peteBornToCheat],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", peteBornToCheat.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
