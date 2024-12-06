/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { visionSlab } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("Vision Slab", () => {
  it.skip("**DANGER REVEALED** At the start of your turn, if an opposing character has damage, gain 1 lore. **TRAPPED!** Damage counters can't be removed.", () => {
    const testStore = new TestStore({
      inkwell: visionSlab.cost,
      play: [visionSlab],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", visionSlab.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
