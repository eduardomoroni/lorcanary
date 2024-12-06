/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { luckyDime } from "@lorcanito/lorcana-engine/cards/003/items/items";
import { nalaFierceFriend } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Lucky Dime", () => {
  it("**NUMBER ONE** ↷, 2 ⬡ − Choose a character of yours and gain lore equal to their ◆.", () => {
    const testStore = new TestStore({
      inkwell: 2,
      play: [luckyDime, nalaFierceFriend],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", luckyDime.id);
    const target = testStore.getByZoneAndId("play", nalaFierceFriend.id);

    cardUnderTest.activate();
    testStore.resolveTopOfStack({ targets: [target] });

    expect(cardUnderTest.meta.exerted).toBe(true);
    expect(testStore.getPlayerLore()).toBe(target.lore);
  });
});
