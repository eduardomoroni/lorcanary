/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { lastCannon } from "@lorcanito/lorcana-engine/cards/002/items/items";
import { arthurTrainedSwordsman } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Last Cannon", () => {
  it("**ARM YOURSELF** 1 ⬡, Banish this item − Chosen character gains **Challenger** +3 this turn. _(They get +3 ※ while challenging.)_", () => {
    const testStore = new TestStore({
      play: [lastCannon, arthurTrainedSwordsman],
      inkwell: 1,
    });

    const cardUnderTest = testStore.getByZoneAndId("play", lastCannon.id);
    const target = testStore.getByZoneAndId("play", arthurTrainedSwordsman.id);

    expect(target.hasChallenger).toBeFalsy();

    cardUnderTest.activate();
    testStore.resolveTopOfStack({ targets: [target] });

    expect(target.hasChallenger).toBeTruthy();
    expect(cardUnderTest.zone).toEqual("discard");
  });
});
