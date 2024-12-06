/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import {
  wreckitRalphAdmiralUnderpants,
  maidMarianLadyOfTheLists,
} from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Wreck-It Ralph - Admiral Underpants", () => {
  it("**I’VE GOT THE COOLEST FRIEND** When you play this character, return a character card from your discard to your hand. If that card is a Princess character card, gain 2 lore.", () => {
    const testStore = new TestStore({
      inkwell: wreckitRalphAdmiralUnderpants.cost,
      hand: [wreckitRalphAdmiralUnderpants],
      discard: [maidMarianLadyOfTheLists],
      lore: 0,
    });
    const target = testStore.getByZoneAndId(
      "discard",
      maidMarianLadyOfTheLists.id,
    );
    const cardUnderTest = testStore.getCard(wreckitRalphAdmiralUnderpants);
    cardUnderTest.playFromHand();

    expect(target.zone).toBe("discard");
    testStore.resolveTopOfStack({ targets: [target] });
    expect(target.zone).toBe("hand");
    expect(testStore.store.tableStore.getTable("player_one").lore).toEqual(2);
  });
});
