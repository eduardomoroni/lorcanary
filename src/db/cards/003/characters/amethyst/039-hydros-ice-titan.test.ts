/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { hydrosIceTitan } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Hydros - Ice Titan", () => {
  it.skip("**BLIZZARD** ↷ − Exert chosen character.", () => {
    const testStore = new TestStore({
      inkwell: hydrosIceTitan.cost,
      play: [hydrosIceTitan],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", hydrosIceTitan.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
