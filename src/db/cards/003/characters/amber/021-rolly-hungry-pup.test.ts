/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rollyHungryPup } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Rolly - Hungry Pup", () => {
  it.skip("**Support** _(Whenever this character quests, you may add their ※ to another chosen character's ※ this turn.)_", () => {
    const testStore = new TestStore({
      play: [rollyHungryPup],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", rollyHungryPup.id);
    expect(cardUnderTest.hasSupport).toBe(true);
  });
});
