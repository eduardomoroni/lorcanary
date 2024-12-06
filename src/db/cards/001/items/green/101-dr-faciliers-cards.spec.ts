/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { drFacilierCards } from "@lorcanito/lorcana-engine/cards/001/items/items";
import { hesGotASword } from "@lorcanito/lorcana-engine/cards/001/actions/actions";
import { reflection } from "@lorcanito/lorcana-engine/cards/001/songs/songs";

describe("Dr. Facilier's Cards", () => {
  it("The Cards Will Tell - You pay 1 ⬡ less for the next action you play this turn.", () => {
    const testStore = new TestStore({
      inkwell: 1, // reflection costs 0 and hesGotASword costs 1
      hand: [reflection, hesGotASword],
      play: [drFacilierCards],
    });

    const reducedCost = testStore.getByZoneAndId("hand", reflection.id);
    const normalCost = testStore.getByZoneAndId("hand", hesGotASword.id);

    const cardUnderTest = testStore.getByZoneAndId("play", drFacilierCards.id);
    cardUnderTest.activate();

    reducedCost.playFromHand();

    expect(testStore.store.tableStore.getTable().inkAvailable()).toEqual(1);
    expect(reducedCost.zone).toEqual("discard");

    normalCost.playFromHand();

    expect(testStore.store.tableStore.getTable().inkAvailable()).toEqual(0);
    expect(reducedCost.zone).toEqual("discard");
  });
});
