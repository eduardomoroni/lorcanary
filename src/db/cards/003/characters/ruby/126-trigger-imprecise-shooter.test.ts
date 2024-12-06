/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { triggerImpreciseShooter } from "@lorcanito/lorcana-engine/cards/003/characters/characters";

describe("Trigger - Imprecise Shooter", () => {
  it.skip("**MY OL' BETSY** Your characters named Nutsy gain +1 ◆.", () => {
    const testStore = new TestStore({
      inkwell: triggerImpreciseShooter.cost,
      play: [triggerImpreciseShooter],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      triggerImpreciseShooter.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
