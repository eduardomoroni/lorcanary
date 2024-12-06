/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fidgetRatigansHenchman } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Fidget - Ratigan’s Henchman", () => {
  it("", () => {
    const testStore = new TestStore({
      play: [fidgetRatigansHenchman],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      fidgetRatigansHenchman.id,
    );

    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
