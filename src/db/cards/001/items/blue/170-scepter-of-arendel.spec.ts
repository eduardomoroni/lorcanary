/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { scepterOfArendelle } from "@lorcanito/lorcana-engine/cards/001/items/items";

import { moanaOfMotunui } from "@lorcanito/lorcana-engine/cards/001/characters/characters";

describe("Scepter Of Arendelle", () => {
  it("Command - Chosen character gains **Support** this turn.", () => {
    const testStore = new TestStore({
      play: [scepterOfArendelle, moanaOfMotunui],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      scepterOfArendelle.id,
    );
    const target = testStore.getByZoneAndId("play", moanaOfMotunui.id);

    cardUnderTest.activate();

    testStore.resolveTopOfStack({ targetId: target.instanceId });

    expect(target.hasSupport).toEqual(true);
  });
});
