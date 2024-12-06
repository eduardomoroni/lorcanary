/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { faZhouMulansFather } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Fa Zhou - Mulan's Father", () => {
  it.skip("**WAR WOUND** This character cannot challenge.**HEAD OF FAMILY** ↷ - Ready chosen character named Mulan. They can’t quest for the rest of the turn.", () => {
    const testStore = new TestStore({
      inkwell: faZhouMulansFather.cost,
      play: [faZhouMulansFather],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      faZhouMulansFather.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
