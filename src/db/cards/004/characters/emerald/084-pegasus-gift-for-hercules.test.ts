/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { pegasusGiftForHercules } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Pegasus - Gift for Hercules", () => {
  it.skip("**Evasive** _(Only characters with Evasive can challenge this character.)_", () => {
    const testStore = new TestStore({
      play: [pegasusGiftForHercules],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      pegasusGiftForHercules.id,
    );
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
