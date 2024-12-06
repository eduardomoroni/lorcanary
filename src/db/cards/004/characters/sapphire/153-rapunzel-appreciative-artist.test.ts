/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { rapunzelAppreciativeArtist } from "@lorcanito/lorcana-engine/cards/004/characters/characters";

describe("Rapunzel - Appreciative Artist", () => {
  it.skip("**PERCEPTIVE PARTNER** While you have a character named Pascal in play, this character gains **Ward.** _(Opponents can't chose them except to challenge.)_", () => {
    const testStore = new TestStore({
      inkwell: rapunzelAppreciativeArtist.cost,
      play: [rapunzelAppreciativeArtist],
    });

    const cardUnderTest = testStore.getByZoneAndId(
      "play",
      rapunzelAppreciativeArtist.id,
    );

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
