/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { mapOfTreasurePlanet } from "@lorcanito/lorcana-engine/cards/003/items/items";

describe("Map of Treasure Planet", () => {
  it.skip("**KEY TO THE PORTAL** ↷ – You pay 1 ⬡ less for the next location you play this turn.**SHOW THE WAY** You pay 1 ⬡ less to move your characters to a location.", () => {
    const testStore = new TestStore({
      inkwell: mapOfTreasurePlanet.cost,
      play: [mapOfTreasurePlanet],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      mapOfTreasurePlanet.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
