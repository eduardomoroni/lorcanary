/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { belleAccomplishedMystic } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Belle - Accomplished Mystic", () => {
  it.skip("**ENHANCED HEALING** When you play this character, move up to 3 damage counters from chosen character to chosen opposing character.", () => {
    const testStore = new TestStore({
      play: [belleAccomplishedMystic],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      belleAccomplishedMystic.id,
    );
    expect(cardUnderTest.hasShift).toBe(true);
  });
});
