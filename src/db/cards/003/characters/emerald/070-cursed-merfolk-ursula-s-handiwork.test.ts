/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { cursedMerfolkUrsulasHandiwork } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Cursed Merfolk - Ursula's Handiwork", () => {
  it.skip("**POOR SOULS** Whenever this character is challenged, each opponent chooses and discards a card.", () => {
    const testStore = new TestStore({
      inkwell: cursedMerfolkUrsulasHandiwork.cost,
      play: [cursedMerfolkUrsulasHandiwork],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      cursedMerfolkUrsulasHandiwork.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
