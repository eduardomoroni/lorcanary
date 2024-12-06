/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  plutoDeterminedDefender,
  plutoFriendlyPooch,
} from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe.skip("Pluto - Friendly Pooch", () => {
  it("**GOOD DOG** ↷ – You pay 1 ⬡ less for the next character you play this turn.", () => {
    const testStore = new TestStore({
      inkwell: plutoDeterminedDefender.cost - 1,
      hand: [plutoDeterminedDefender],
      play: [plutoFriendlyPooch],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      plutoFriendlyPooch.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
