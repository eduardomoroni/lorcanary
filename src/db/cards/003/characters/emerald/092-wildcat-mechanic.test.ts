/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { wildcatMechanic } from "@lorcanito/lorcana-engine/cards/003/characters/characters";
import { pawpsicle } from "@lorcanito/lorcana-engine/cards/002/items/items";

describe("Wildcat - Mechanic", () => {
  it("**DISASSEMBLE** ↷ – Banish chosen item.", () => {
    const testStore = new TestStore({
      play: [wildcatMechanic, pawpsicle],
    });

    const cardUnderTest = testStore.getCard(wildcatMechanic);
    const target = testStore.getCard(pawpsicle);

    cardUnderTest.activate();
    testStore.resolveTopOfStack({ targets: [target] });

    expect(target.zone).toEqual("discard");
  });
});
