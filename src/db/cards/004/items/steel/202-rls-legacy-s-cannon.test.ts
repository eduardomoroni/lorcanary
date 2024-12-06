/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rlsLegacysCannon } from "@lorcanito/lorcana-engine/cards/004/items/items";

describe("RLS Legacy's Cannon", () => {
  it.skip("**BA-BOOM!** ↷, 2 ⬡, Discard a card - Deal 2 damage to chosen character or location.", () => {
    const testStore = new TestStore({
      inkwell: rlsLegacysCannon.cost,
      play: [rlsLegacysCannon],
    });

    const cardUnderTest = testStore.getByZoneAndId("play", rlsLegacysCannon.id);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
