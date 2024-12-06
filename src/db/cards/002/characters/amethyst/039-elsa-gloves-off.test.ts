/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { elsaGlovesOff } from "@lorcanito/lorcana-engine/cards/002/characters/characters";

describe("Elsa - Gloves Off", () => {
  it.skip("**Challenger** +3 _(While challenging, this character gets +3 ※)_", () => {
    const testStore = new TestStore({
      inkwell: elsaGlovesOff.cost,

      play: [elsaGlovesOff],
    });

    const cardUnderTest = testStore.getByZoneAndId("hand", elsaGlovesOff.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
