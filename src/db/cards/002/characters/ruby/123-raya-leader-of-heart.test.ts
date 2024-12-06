/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rayaLeaderOfHeart } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Raya - Leader of Heart", () => {
  it.todo(
    "**CHAMPION OF KUMANDRA** Whenever this character challenges a damaged character, she takes no damage from the challenge.",
  );

  it("Shift", () => {
    const testStore = new TestStore({
      play: [rayaLeaderOfHeart],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      rayaLeaderOfHeart.id,
    );

    expect(cardUnderTest.hasShift).toEqual(true);
  });
});
