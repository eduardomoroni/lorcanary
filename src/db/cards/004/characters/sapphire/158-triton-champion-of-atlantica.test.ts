/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { tritonChampionOfAtlantica } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Triton - Champion of Atlantica", () => {
  it.skip("**Shift** 6 _You may pay 6 ⬡ to play this on top of one of your characters named Triton.)_**IMPOSING PRESENCE** Opposing characters get -1 ※ for each location you have in play.", () => {
    const testStore = new TestStore({
      play: [tritonChampionOfAtlantica],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      tritonChampionOfAtlantica.id,
    );
    expect(cardUnderTest.hasShift).toBe(true);
  });
});
