/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mirabelMadrigalProphecyFinder } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Mirabel Madrigal - Prophecy Finder", () => {
  it.skip("**Support** _(Whenever this character quests, you may add their ※ to another chosen character's ※ this turn.)_", () => {
    const testStore = new TestStore({
      play: [mirabelMadrigalProphecyFinder],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      mirabelMadrigalProphecyFinder.id,
    );
    expect(cardUnderTest.hasSupport).toBe(true);
  });
});
