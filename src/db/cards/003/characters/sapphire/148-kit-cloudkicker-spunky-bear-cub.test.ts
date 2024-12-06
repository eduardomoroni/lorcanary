/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { kitCloudkickerSpunkyBearCub } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Kit Cloudkicker - Spunky Bear Cub", () => {
  it.skip("**Ward** (Opponents can't choose this character except to challenge.)", () => {
    const testStore = new TestStore({
      play: [kitCloudkickerSpunkyBearCub],
    });

    const cardUnderTest = testStore.getCard(kitCloudkickerSpunkyBearCub);
    expect(cardUnderTest.hasWard).toBe(true);
  });
});
