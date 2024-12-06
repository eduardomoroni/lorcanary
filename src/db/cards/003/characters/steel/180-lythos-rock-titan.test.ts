/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { lythosRockTitan } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Lythos - Rock Titan", () => {
  it.skip("**Resist** +2 _(Damage dealt to this character is reduced by 2.)_**STONE SKIN** ↷ − Chosen character gains **Resist** +2 this turn.", () => {
    const testStore = new TestStore({
      play: [lythosRockTitan],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", lythosRockTitan.id);
    expect(cardUnderTest.hasResist).toBe(true);
  });
});
