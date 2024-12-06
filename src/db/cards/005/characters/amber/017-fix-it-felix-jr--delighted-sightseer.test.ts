/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { fixitFelixJrDelightedSightseer } from "@lorcanito/lorcana-engine/cards/005/characters/characters";
import { rapunzelsTowerSecludedPrison } from "@lorcanito/lorcana-engine/cards/005/locations/locations";
import { TestEngine } from "@lorcanito/lorcana-engine/rules/testEngine";

describe("Fix‐It Felix, Jr. - Delighted Sightseer", () => {
  it("**OH, MY LAND!** When you play this character, if you have a location in play, draw a card.", () => {
    const testStore = new TestStore({
      inkwell: fixitFelixJrDelightedSightseer.cost,
      hand: [fixitFelixJrDelightedSightseer],
      play: [rapunzelsTowerSecludedPrison],
      deck: 2,
    });

    const cardUnderTest = testStore.getCard(fixitFelixJrDelightedSightseer);
    cardUnderTest.playFromHand();
    testStore.resolveTopOfStack({});

    expect(testStore.getZonesCardCount().hand).toEqual(1);
  });
});

describe("Regression", () => {
  it("Doest draw a card if there is no location in play", async () => {
    const testStore = new TestEngine(
      {
        inkwell: fixitFelixJrDelightedSightseer.cost,
        hand: [fixitFelixJrDelightedSightseer],
        deck: 2,
      },
      {
        play: [rapunzelsTowerSecludedPrison],
      },
    );

    await testStore.playCard(fixitFelixJrDelightedSightseer);

    expect(testStore.stackLayers).toHaveLength(0);
    expect(testStore.getZonesCardCount().hand).toEqual(0);
    expect(testStore.getZonesCardCount().deck).toEqual(2);
  });
});
