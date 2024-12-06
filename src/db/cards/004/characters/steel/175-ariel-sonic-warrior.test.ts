/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { arielSonicWarrior } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Ariel - Sonic Warrior", () => {
  it.skip("**Shift** 4 _(You may pay 4 ⬡ to play this on top of one of your characters named Ariel.)_", () => {
    const testStore = new TestStore({
      play: [arielSonicWarrior],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      arielSonicWarrior.id,
    );
    expect(cardUnderTest.hasShift).toBe(true);
  });

  it.skip("**AMPLIFIED VOICE** Whenever you play a song, you may pay ⬡ to deal 3 daamge to chosen character.", () => {
    const testStore = new TestStore({
      inkwell: arielSonicWarrior.cost,
      play: [arielSonicWarrior],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      arielSonicWarrior.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
