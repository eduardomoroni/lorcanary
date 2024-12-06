/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hueySavvyNephew } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Huey - Savvy Nephew", () => {
  it.skip("**Support** _(Whenever this character quests, you may add their ※ to another chosen character's ※ this turn.)_**THREE NEPHEWS** Whenever this character quests, if you have characters named Dewey and Louie in play, you may draw 3 cards.", () => {
    const testStore = new TestStore({
      play: [hueySavvyNephew],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", hueySavvyNephew.id);
    expect(cardUnderTest.hasSupport).toBe(true);
  });
});
