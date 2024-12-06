/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { pegasusCloudRacer } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Pegasus - Cloud Racer", () => {
  it.skip("**Shift** 3 _You may pay 3 ⬡ to play this on top of one of your characters named Pegasus.)_**Evasive** _(Only characters with Evasive can challenge this character.)_**HOP ON!** When you play this character, if you used **Shift** to play him, your characters gain **Evasive** until the start of your next turn.", () => {
    const testStore = new TestStore({
      play: [pegasusCloudRacer],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      pegasusCloudRacer.id,
    );
    expect(cardUnderTest.hasShift).toBe(true);
  });
});
