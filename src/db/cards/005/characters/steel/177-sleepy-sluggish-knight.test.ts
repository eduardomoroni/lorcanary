/**
 * @jest-environment node
 */

import { describe, expect, it } from "@jest/globals";
import { TestStore } from "@lorcanito/lorcana-engine/rules/testStore";
import { sleepySluggishKnight } from "@lorcanito/lorcana-engine/cards/005/characters/characters";

describe("Sleepy - Sluggish Knight", () => {
  it.skip("", () => {
    const testStore = new TestStore({
      inkwell: sleepySluggishKnight.cost,
      play: [sleepySluggishKnight],
    });

    const cardUnderTest = testStore.getCard(sleepySluggishKnight);

    cardUnderTest.playFromHand();
    testStore.resolveOptionalAbility();
    testStore.resolveTopOfStack({});
  });
});
