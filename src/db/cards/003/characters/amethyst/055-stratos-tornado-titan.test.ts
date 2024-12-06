/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { stratosTornadoTitan } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Stratos - Tornado Titan", () => {
  it.skip("**Evasive** _(Only characters with Evasive can challenge this character.)_**CYCLONE** ↷ – Gain lore equal to the number of Titan characters you have in play.", () => {
    const testStore = new TestStore({
      play: [stratosTornadoTitan],
    });

    const cardUnderTest = testStore.getCard(stratosTornadoTitan);
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
