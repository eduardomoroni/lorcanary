/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { tickTockEverPresentPursuer } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Tick-Tock - Ever-Present Pursuer", () => {
  it("**Evasive** _(Only characters with Evasive can challenge this character.)_", () => {
    const testStore = new TestStore({
      play: [tickTockEverPresentPursuer],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      tickTockEverPresentPursuer.id,
    );
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
