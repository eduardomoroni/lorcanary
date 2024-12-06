/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { snowannaRainbeauCoolCompetitor } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Snowanna Rainbeau - Cool Competitor", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: snowannaRainbeauCoolCompetitor.cost,
      play: [snowannaRainbeauCoolCompetitor],
    });

    const cardUnderTest = testStore.getCard(snowannaRainbeauCoolCompetitor);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
