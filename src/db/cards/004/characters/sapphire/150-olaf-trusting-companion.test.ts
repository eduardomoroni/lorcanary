/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { olafTrustingCompanion } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Olaf - Trusting Companion", () => {
  it.skip("**Support** _(Whenever this character quests, you may add their ※ to another chosen character's ※ this turn.)_", () => {
    const testStore = new TestStore({
      play: [olafTrustingCompanion],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      olafTrustingCompanion.id,
    );
    expect(cardUnderTest.hasSupport).toBe(true);
  });
});
