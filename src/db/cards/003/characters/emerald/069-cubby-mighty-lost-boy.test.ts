/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { cubbyMightyLostBoy } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Cubby - Mighty Lost Boy", () => {
  it.skip("**THE BEAR** Whenever this character moves to a location, he gets +3 ※ this turn.", () => {
    const testStore = new TestStore({
      inkwell: cubbyMightyLostBoy.cost,
      play: [cubbyMightyLostBoy],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      cubbyMightyLostBoy.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
